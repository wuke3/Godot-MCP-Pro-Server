"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ParseError"] = -32700] = "ParseError";
    ErrorCode[ErrorCode["InvalidRequest"] = -32600] = "InvalidRequest";
    ErrorCode[ErrorCode["MethodNotFound"] = -32601] = "MethodNotFound";
    ErrorCode[ErrorCode["InvalidParams"] = -32602] = "InvalidParams";
    ErrorCode[ErrorCode["InternalError"] = -32603] = "InternalError";
    ErrorCode[ErrorCode["GodotError"] = -32000] = "GodotError";
    ErrorCode[ErrorCode["ResourceNotFound"] = -32001] = "ResourceNotFound";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=mcp-types.js.map