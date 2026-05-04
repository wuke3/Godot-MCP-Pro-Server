import { ErrorCode, JSONRPCError, JSONRPCRequest, JSONRPCResponse } from "./mcp-types";

export function createRequest(id: number | string | null, method: string, params?: Record<string, unknown>): JSONRPCRequest {
  return { jsonrpc: "2.0", id, method, params };
}

export function createResponse(id: number | string | null, result: unknown): JSONRPCResponse {
  return { jsonrpc: "2.0", id, result };
}

export function createErrorResponse(id: number | string | null, code: ErrorCode, message: string, data?: unknown): JSONRPCResponse {
  const error: JSONRPCError = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: "2.0", id, error };
}

export function parseRequest(text: string): JSONRPCRequest | JSONRPCError | null {
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null || parsed.jsonrpc !== "2.0") {
      return { code: ErrorCode.ParseError, message: "Invalid JSON-RPC request" };
    }
    if (typeof parsed.method !== "string" || parsed.method === "") {
      return { code: ErrorCode.InvalidRequest, message: "Missing or invalid method" };
    }
    return { jsonrpc: "2.0", id: parsed.id ?? null, method: parsed.method, params: parsed.params ?? {} };
  } catch {
    return { code: ErrorCode.ParseError, message: "Invalid JSON syntax" };
  }
}

export function serializeResponse(response: JSONRPCResponse): string {
  return JSON.stringify(response);
}

export function parseResponse(text: string): JSONRPCResponse | null {
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === "object" && parsed !== null) return parsed as JSONRPCResponse;
    return null;
  } catch {
    return null;
  }
}

export function isErrorResponse(response: JSONRPCResponse): boolean {
  return response.error !== undefined;
}
