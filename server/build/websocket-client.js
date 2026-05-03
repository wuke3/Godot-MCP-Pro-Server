"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.godotClient = exports.GodotWebSocketClient = void 0;
const ws_1 = __importDefault(require("ws"));
const events_1 = require("events");
const jsonrpc_1 = require("./protocol/jsonrpc");
const BASE_PORT = 6505;
const MAX_PORT = 6514;
const RECONNECT_INTERVAL = 3000;
class GodotWebSocketClient extends events_1.EventEmitter {
    peers = new Map();
    connected = new Set();
    timers = new Map();
    pendingRequests = new Map();
    requestId = 0;
    running = false;
    constructor() {
        super();
    }
    start() {
        this.running = true;
        console.log(`[MCP Server] Connecting to Godot on ports ${BASE_PORT}-${MAX_PORT}...`);
        for (let port = BASE_PORT; port <= MAX_PORT; port++) {
            this.connected.add(port);
            this.tryConnect(port);
        }
    }
    stop() {
        this.running = false;
        for (const [port, ws] of this.peers) {
            if (ws) {
                ws.close(1000, "Server shutting down");
            }
        }
        this.peers.clear();
        this.connected.clear();
        for (const timer of this.timers.values()) {
            clearInterval(timer);
        }
        this.timers.clear();
        for (const pending of this.pendingRequests.values()) {
            clearTimeout(pending.timeout);
            pending.reject(new Error("Connection closed"));
        }
        this.pendingRequests.clear();
        console.log("[MCP Server] WebSocket client stopped");
    }
    getConnectedPort() {
        for (const port of this.connected) {
            const ws = this.peers.get(port);
            if (ws && ws.readyState === ws_1.default.OPEN) {
                return port;
            }
        }
        return null;
    }
    async sendCommand(method, params = {}) {
        const port = this.getConnectedPort();
        if (port === null) {
            return { error: { code: -32000, message: "No Godot connection available" } };
        }
        const id = ++this.requestId;
        const request = (0, jsonrpc_1.createRequest)(id, method, params);
        const requestStr = (0, jsonrpc_1.serializeResponse)(request);
        return new Promise((resolve, reject) => {
            const ws = this.peers.get(port);
            if (!ws || ws.readyState !== ws_1.default.OPEN) {
                reject(new Error("WebSocket not connected"));
                return;
            }
            const timeout = setTimeout(() => {
                this.pendingRequests.delete(String(id));
                reject(new Error(`Command timeout: ${method}`));
            }, 30000);
            this.pendingRequests.set(String(id), { resolve, reject, timeout });
            ws.send(requestStr);
            const pending = this.pendingRequests.get(String(id));
            if (pending) {
                pending.timeout = timeout;
            }
        }).catch((error) => {
            return { error: { code: -32000, message: error.message } };
        });
    }
    tryConnect(port) {
        try {
            const ws = new ws_1.default(`ws://127.0.0.1:${port}`);
            ws.on("open", () => {
                this.peers.set(port, ws);
                this.connected.add(port);
                console.log(`[MCP Server] Connected to Godot on port ${port}`);
                this.emit("connected", port);
            });
            ws.on("message", (data) => {
                this.handleMessage(data.toString(), port);
            });
            ws.on("close", () => {
                this.connected.delete(port);
                this.peers.delete(port);
                console.log(`[MCP Server] Disconnected from port ${port}`);
                this.emit("disconnected", port);
                if (this.running) {
                    this.scheduleReconnect(port);
                }
            });
            ws.on("error", (error) => {
                console.log(`[MCP Server] WebSocket error on port ${port}: ${error.message}`);
                this.scheduleReconnect(port);
            });
        }
        catch (error) {
            this.scheduleReconnect(port);
        }
    }
    scheduleReconnect(port) {
        if (!this.running)
            return;
        if (this.timers.has(port)) {
            return;
        }
        const timer = setTimeout(() => {
            this.timers.delete(port);
            if (this.running) {
                this.tryConnect(port);
            }
        }, RECONNECT_INTERVAL);
        this.timers.set(port, timer);
    }
    handleMessage(text, port) {
        try {
            const response = (0, jsonrpc_1.parseResponse)(text);
            if (!response)
                return;
            if (response.id !== undefined && response.id !== null) {
                const pending = this.pendingRequests.get(String(response.id));
                if (pending) {
                    clearTimeout(pending.timeout);
                    this.pendingRequests.delete(String(response.id));
                    if ((0, jsonrpc_1.isErrorResponse)(response)) {
                        pending.resolve({
                            error: {
                                code: response.error?.code ?? -32000,
                                message: response.error?.message ?? "Unknown error"
                            }
                        });
                    }
                    else {
                        pending.resolve({ result: response.result });
                    }
                    return;
                }
            }
            if (response.method === "ping") {
                const ws = this.peers.get(port);
                if (ws && ws.readyState === ws_1.default.OPEN) {
                    ws.send(JSON.stringify({ jsonrpc: "2.0", method: "pong", params: {} }));
                }
            }
            this.emit("message", response, port);
        }
        catch (error) {
            console.error("[MCP Server] Error handling message:", error);
        }
    }
}
exports.GodotWebSocketClient = GodotWebSocketClient;
exports.godotClient = new GodotWebSocketClient();
//# sourceMappingURL=websocket-client.js.map