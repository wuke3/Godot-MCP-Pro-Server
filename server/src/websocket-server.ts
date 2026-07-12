import { WebSocketServer, WebSocket, RawData } from "ws";
import { EventEmitter } from "events";
import { GodotResponse } from "./protocol/mcp-types";
import { createRequest, parseResponse, isErrorResponse } from "./protocol/jsonrpc";

const BASE_PORT = 6505;
const MAX_PORT = 6514;
const HEARTBEAT_INTERVAL = 10000;
const INACTIVITY_TIMEOUT = 30000;

export class GodotWebSocketServer extends EventEmitter {
  private servers: Map<number, WebSocketServer> = new Map();
  private peers: Map<number, WebSocket> = new Map();
  private pendingRequests: Map<string, {
    resolve: (value: GodotResponse) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }> = new Map();
  private requestId = 0;
  private running = false;
  private heartbeatTimers: Map<number, NodeJS.Timeout> = new Map();
  private lastActivity: Map<number, number> = new Map();

  start(): void {
    this.running = true;
    console.log(`[MCP Server] Starting WebSocket servers on ports ${BASE_PORT}-${MAX_PORT}...`);
    for (let port = BASE_PORT; port <= MAX_PORT; port++) {
      this.startServer(port);
    }
  }

  stop(): void {
    this.running = false;
    for (const [port, server] of this.servers) {
      server.close();
    }
    this.servers.clear();
    for (const [, ws] of this.peers) {
      if (ws) ws.close(1000, "Server shutting down");
    }
    this.peers.clear();
    for (const timer of this.heartbeatTimers.values()) clearInterval(timer);
    this.heartbeatTimers.clear();
    this.lastActivity.clear();
    for (const pending of this.pendingRequests.values()) {
      clearTimeout(pending.timeout);
      pending.reject(new Error("Connection closed"));
    }
    this.pendingRequests.clear();
    console.log("[MCP Server] WebSocket servers stopped");
  }

  getConnectedPort(): number | null {
    for (const [port, ws] of this.peers) {
      if (ws && ws.readyState === WebSocket.OPEN) return port;
    }
    return null;
  }

  getConnectedPorts(): number[] {
    const ports: number[] = [];
    for (const [port, ws] of this.peers) {
      if (ws && ws.readyState === WebSocket.OPEN) ports.push(port);
    }
    return ports;
  }

  getClientCount(): number {
    return this.getConnectedPorts().length;
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
      ws.send(JSON.stringify(request));
    }).catch((error) => ({ error: { code: -32000, message: error.message } })) as Promise<GodotResponse>;
  }

  private startServer(port: number): void {
    try {
      const server = new WebSocketServer({ port });
      this.servers.set(port, server);

      server.on("listening", () => {
        console.log(`[MCP Server] WebSocket server listening on port ${port}`);
      });

      server.on("connection", (ws: WebSocket) => {
        console.log(`[MCP Server] Godot client connected on port ${port}`);
        this.peers.set(port, ws);
        this.lastActivity.set(port, Date.now());
        this.startHeartbeat(port);
        this.emit("connected", port);

        ws.on("message", (data: RawData) => {
          this.lastActivity.set(port, Date.now());
          this.handleMessage(data.toString(), port);
        });

        ws.on("close", () => {
          console.log(`[MCP Server] Godot client disconnected from port ${port}`);
          this.peers.delete(port);
          this.stopHeartbeat(port);
          this.lastActivity.delete(port);
          this.emit("disconnected", port);
        });

        ws.on("error", (error) => {
          console.error(`[MCP Server] WebSocket error on port ${port}:`, error.message);
        });
      });

      server.on("error", (error) => {
        console.error(`[MCP Server] Server error on port ${port}:`, error.message);
      });
    } catch (error) {
      console.error(`[MCP Server] Failed to start server on port ${port}:`, error);
    }
  }

  private startHeartbeat(port: number): void {
    const timer = setInterval(() => {
      const ws = this.peers.get(port);
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        this.stopHeartbeat(port);
        return;
      }
      const lastActivity = this.lastActivity.get(port) || 0;
      if (Date.now() - lastActivity > INACTIVITY_TIMEOUT) {
        console.warn(`[MCP Server] Port ${port} silent for too long — closing`);
        ws.close(4000, "Heartbeat timeout");
        return;
      }
      ws.send(JSON.stringify({ jsonrpc: "2.0", method: "ping", params: {} }));
    }, HEARTBEAT_INTERVAL);
    this.heartbeatTimers.set(port, timer);
  }

  private stopHeartbeat(port: number): void {
    const timer = this.heartbeatTimers.get(port);
    if (timer) {
      clearInterval(timer);
      this.heartbeatTimers.delete(port);
    }
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
      } else if (msg.method === "pong") {
        // Heartbeat pong received, activity already updated
      }
      this.emit("message", response, port);
    } catch (error) {
      console.error("[MCP Server] Error handling message:", error);
    }
  }
}

export const godotServer = new GodotWebSocketServer();
