import { ErrorCode, JSONRPCError, JSONRPCRequest, JSONRPCResponse } from "./mcp-types";
export declare function createRequest(id: number | string | null, method: string, params?: Record<string, unknown>): JSONRPCRequest;
export declare function createResponse(id: number | string | null, result: unknown): JSONRPCResponse;
export declare function createErrorResponse(id: number | string | null, code: ErrorCode, message: string, data?: unknown): JSONRPCResponse;
export declare function parseRequest(text: string): JSONRPCRequest | JSONRPCError | null;
export declare function createToolErrorResponse(code: ErrorCode, message: string, availableMethods?: string[]): JSONRPCResponse;
export declare function serializeResponse(response: JSONRPCResponse): string;
export declare function parseResponse(text: string): JSONRPCResponse | null;
export declare function isErrorResponse(response: JSONRPCResponse): boolean;
//# sourceMappingURL=jsonrpc.d.ts.map