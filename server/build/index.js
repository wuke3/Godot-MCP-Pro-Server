#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const websocket_client_js_1 = require("./websocket-client.js");
const index_js_2 = require("./tools/index.js");
const config_js_1 = require("./utils/config.js");
const logger_js_1 = require("./utils/logger.js");
class GodotMCPServer {
    server;
    mode;
    tools;
    constructor(mode = "full") {
        this.mode = mode;
        this.tools = (0, index_js_2.getTools)(mode);
        this.server = new index_js_1.Server({
            name: "godot-mcp-server",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
        console.log(`[MCP Server] Godot MCP Server initialized (${Object.keys(this.tools).length} tools, mode: ${mode})`);
    }
    setupHandlers() {
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
            const tools = Object.values(this.tools).map((tool) => ({
                name: tool.name,
                description: tool.description,
                inputSchema: tool.inputSchema,
            }));
            return { tools };
        });
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            logger_js_1.logger.debug(`Executing tool: ${name}`, args);
            const tool = (0, index_js_2.getToolByName)(name);
            if (!tool) {
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                error: {
                                    code: -32601,
                                    message: `Tool not found: ${name}`,
                                    available_tools: Object.keys(this.tools),
                                },
                            }),
                        },
                    ],
                    isError: true,
                };
            }
            try {
                const result = await websocket_client_js_1.godotClient.sendCommand(name, args || {});
                if (result.error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(result.error),
                            },
                        ],
                        isError: true,
                    };
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(result.result || {}, null, 2),
                        },
                    ],
                };
            }
            catch (error) {
                logger_js_1.logger.error(`Tool execution failed: ${name}`, error);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                error: {
                                    code: -32603,
                                    message: `Internal error: ${error instanceof Error ? error.message : String(error)}`,
                                },
                            }),
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    async start() {
        websocket_client_js_1.godotClient.start();
        websocket_client_js_1.godotClient.on("connected", (port) => {
            logger_js_1.logger.info(`Connected to Godot on port ${port}`);
        });
        websocket_client_js_1.godotClient.on("disconnected", (port) => {
            logger_js_1.logger.warn(`Disconnected from Godot on port ${port}`);
        });
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        logger_js_1.logger.info("[MCP Server] Server started and listening on stdio");
    }
    stop() {
        websocket_client_js_1.godotClient.stop();
        this.server.close();
        logger_js_1.logger.info("[MCP Server] Server stopped");
    }
}
async function main() {
    const args = process.argv.slice(2);
    const { config } = (0, config_js_1.parseArgs)(args);
    const server = new GodotMCPServer(config.mode);
    process.on("SIGINT", () => {
        server.stop();
        process.exit(0);
    });
    process.on("SIGTERM", () => {
        server.stop();
        process.exit(0);
    });
    try {
        await server.start();
    }
    catch (error) {
        logger_js_1.logger.error("Failed to start server:", error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map