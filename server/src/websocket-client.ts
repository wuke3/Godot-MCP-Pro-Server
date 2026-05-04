import WebSocket from "ws";
import { EventEmitter } from "events";
import { GodotResponse } from "./protocol/mcp-types";
import { createRequest, serializeResponse, parseResponse, isErrorResponse } from "./protocol/jsonrpc";

const BASE_PORT = 6505;
const MAX_PORT = 6514;
const RECONNECT_INTERVAL = 3000;

export class GodotWebSocketClient extends EventEmitter {
  private peers: Map<number, WebSocket> = new Map();
  private connected: Set<number> = new Set();
  private timers: Map<number, NodeJS.Timeout> = new Map();
  private pendingRequests: Map<string, {
    resolve: (value: GodotResponse) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }> = new Map();
  private requestId = 0;
  private running = false;

  start(): void {
    this.running = true;
    console.log(`[MCP Server] Connecting to Godot on ports ${BASE_PORT}-${MAX_PORT}...`);
    for (let port = BASE_PORT; port <= MAX_PORT; port++) {
      this.connected.add(port);
      this.tryConnect(port);
    }
  }

  stop(): void {
    this.running = false;
    for (const [, ws] of this.peers) {
      if (ws) ws.close(1000, "Server shutting down");
    }
    this.peers.clear();
    this.connected.clear();
    for (const timer of this.timers.values()) clearInterval(timer);
    this.timers.clear();
    for (const pending of this.pendingRequests.values()) {
      clearTimeout(pending.timeout);
      pending.reject(new Error("Connection closed"));
    }
    this.pendingRequests.clear();
    console.log("[MCP Server] WebSocket client stopped");
  }

  getConnectedPort(): number | null {
    for (const port of this.connected) {
      const ws = this.peers.get(port);
      if (ws && ws.readyState === WebSocket.OPEN) return port;
    }
    return null;
  }

  async sendCommand(method: string, params: Record<string, unknown> = {}): Promise<GodotResponse> {
    const port = this.getConnectedPort();
    if (port === null) return { error: { code: -32000, message: "No Godot connection available" } };
    const id = ++this.requestId;
    const request = createRequest(id, method, params);
    return new Promise((resolve, reject) => {
      const ws = this.peers.get(port);
      if (!ws || ws.readyState !== WebSocket.OPEN) { reject(new Error("WebSocket not connected")); return; }
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(String(id));
        reject(new Error(`Command timeout: ${method}`));
      }, 30000);
      this.pendingRequests.set(String(id), { resolve, reject, timeout });
      ws.send(serializeResponse(request));
    }).catch((error) => ({ error: { code: -32000, message: error.message } })) as Promise<GodotResponse>;
  }

  private tryConnect(port: number): void {
    try {
      const ws = new WebSocket(`ws://127.0.0.1:${port}`);
      ws.on("open", () => { this.peers.set(port, ws); this.connected.add(port); console.log(`[MCP Server] Connected to Godot on port ${port}`); this.emit("connected", port); });
      ws.on("message", (data: WebSocket.Data) => this.handleMessage(data.toString(), port));
      ws.on("close", () => { this.connected.delete(port); this.peers.delete(port); console.log(`[MCP Server] Disconnected from port ${port}`); this.emit("disconnected", port); if (this.running) this.scheduleReconnect(port); });
      ws.on("error", () => this.scheduleReconnect(port));
    } catch { this.scheduleReconnect(port); }
  }

  private scheduleReconnect(port: number): void {
    if (!this.running || this.timers.has(port)) return;
    const timer = setTimeout(() => { this.timers.delete(port); if (this.running) this.tryConnect(port); }, RECONNECT_INTERVAL);
    this.timers.set(port, timer);
  }

  private handleMessage(text: string, port: number): void {
    try {
      const response = parseResponse(text);
      if (!response) return;
      if (response.id !== undefined && response.id !== null) {
        const pending = this.pendingRequests.get(String(response.id));
        if (pending) {
          clearTimeout(pending.timeout);
          this.pendingRequests.delete(String(response.id));
          if (isErrorResponse(response)) pending.resolve({ error: { code: response.error?.code ?? -32000, message: response.error?.message ?? "Unknown error" } });
          else pending.resolve({ result: response.result });
          return;
        }
      }
      const msg = response as { method?: string };
      if (msg.method === "ping") {
        const ws = this.peers.get(port);
        if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ jsonrpc: "2.0", method: "pong", params: {} }));
      }
      this.emit("message", response, port);
    } catch (error) { console.error("[MCP Server] Error handling message:", error); }
  }
}

export const godotClient = new GodotWebSocketClient();
