export interface JSONRPCRequest {
  jsonrpc: "2.0";
  id?: number | string | null;
  method: string;
  params?: Record<string, unknown>;
}

export interface JSONRPCResponse {
  jsonrpc: "2.0";
  id?: number | string | null;
  result?: unknown;
  error?: JSONRPCError;
}

export interface JSONRPCError {
  code: number;
  message: string;
  data?: unknown;
}

export enum ErrorCode {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  GodotError = -32000,
  ResourceNotFound = -32001,
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface MCPToolCall {
  name: string;
  arguments?: Record<string, unknown>;
}

export interface GodotResponse {
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties?: Record<string, ToolProperty>;
    required?: string[];
  };
}

export interface ToolProperty {
  type?: string;
  description?: string;
  default?: unknown;
  enum?: string[];
  items?: Record<string, unknown>;
  properties?: Record<string, ToolProperty>;
  additionalProperties?: boolean | Record<string, unknown>;
  [key: string]: unknown;
}

export type ServerMode = "full" | "lite" | "minimal";

export interface ServerConfig {
  port?: number;
  mode?: ServerMode;
  godotPort?: number;
}
