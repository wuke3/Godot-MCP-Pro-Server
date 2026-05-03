import { EventEmitter } from "events";
import { GodotResponse } from "./protocol/mcp-types";
export declare class GodotWebSocketClient extends EventEmitter {
    private peers;
    private connected;
    private timers;
    private pendingRequests;
    private requestId;
    private running;
    constructor();
    start(): void;
    stop(): void;
    getConnectedPort(): number | null;
    sendCommand(method: string, params?: Record<string, unknown>): Promise<GodotResponse>;
    private tryConnect;
    private scheduleReconnect;
    private handleMessage;
}
export declare const godotClient: GodotWebSocketClient;
//# sourceMappingURL=websocket-client.d.ts.map