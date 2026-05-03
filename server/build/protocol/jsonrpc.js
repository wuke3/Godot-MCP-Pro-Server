"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = createRequest;
exports.createResponse = createResponse;
exports.createErrorResponse = createErrorResponse;
exports.parseRequest = parseRequest;
exports.createToolErrorResponse = createToolErrorResponse;
exports.serializeResponse = serializeResponse;
exports.parseResponse = parseResponse;
exports.isErrorResponse = isErrorResponse;
const mcp_types_1 = require("./mcp-types");
function createRequest(id, method, params) {
    return {
        jsonrpc: "2.0",
        id,
        method,
        params,
    };
}
function createResponse(id, result) {
    return {
        jsonrpc: "2.0",
        id,
        result,
    };
}
function createErrorResponse(id, code, message, data) {
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
function parseRequest(text) {
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
    }
    catch (e) {
        return createParseError("Invalid JSON syntax");
    }
}
function createParseError(message) {
    return {
        code: mcp_types_1.ErrorCode.ParseError,
        message,
    };
}
function createToolErrorResponse(code, message, availableMethods) {
    const data = availableMethods ? { available_methods: availableMethods } : undefined;
    return createErrorResponse(null, code, message, data);
}
function serializeResponse(response) {
    return JSON.stringify(response);
}
function parseResponse(text) {
    try {
        const parsed = JSON.parse(text);
        if (typeof parsed !== "object" || parsed === null) {
            return null;
        }
        return parsed;
    }
    catch {
        return null;
    }
}
function isErrorResponse(response) {
    return response.error !== undefined;
}
//# sourceMappingURL=jsonrpc.js.map