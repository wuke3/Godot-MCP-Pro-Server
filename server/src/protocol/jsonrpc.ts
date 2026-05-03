import { ErrorCode, JSONRPCError, JSONRPCRequest, JSONRPCResponse } from "./mcp-types";

export function createRequest(id: number | string | null, method: string, params?: Record<string, unknown>): JSONRPCRequest {
  return {
    jsonrpc: "2.0",
    id,
    method,
    params,
  };
}

export function createResponse(id: number | string | null, result: unknown): JSONRPCResponse {
  return {
    jsonrpc: "2.0",
    id,
    result,
  };
}

export function createErrorResponse(id: number | string | null, code: ErrorCode, message: string, data?: unknown): JSONRPCResponse {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message,
      ...(data !== undefined && { data }),
    },
  };
}

export function parseRequest(text: string): JSONRPCRequest | JSONRPCError | null {
  try {
    const parsed = JSON.parse(text);
    
    if (typeof parsed !== "object" || parsed === null) {
      return createParseError("Request must be a JSON object");
    }

    if (parsed.jsonrpc !== "2.0") {
      return createParseError("Invalid JSON-RPC version");
    }

    if (typeof parsed.method !== "string" || parsed.method === "") {
      return createParseError("Missing or invalid method");
    }

    return {
      jsonrpc: "2.0",
      id: parsed.id ?? null,
      method: parsed.method,
      params: parsed.params ?? {},
    };
  } catch (e) {
    return createParseError("Invalid JSON syntax");
  }
}

function createParseError(message: string): JSONRPCError {
  return {
    code: ErrorCode.ParseError,
    message,
  };
}

export function createToolErrorResponse(code: ErrorCode, message: string, availableMethods?: string[]): JSONRPCResponse {
  const data = availableMethods ? { available_methods: availableMethods } : undefined;
  return createErrorResponse(null, code, message, data);
}

export function serializeResponse(response: JSONRPCResponse): string {
  return JSON.stringify(response);
}

export function parseResponse(text: string): JSONRPCResponse | null {
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }
    return parsed as JSONRPCResponse;
  } catch {
    return null;
  }
}

export function isErrorResponse(response: JSONRPCResponse): boolean {
  return response.error !== undefined;
}
