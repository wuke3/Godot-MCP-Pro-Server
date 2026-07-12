#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { godotServer } from "./websocket-server.js";
import { getTools, getToolByName } from "./tools/index.js";
import { parseArgs } from "./utils/config.js";
import { logger } from "./utils/logger.js";
import { ServerMode } from "./protocol/mcp-types.js";

export class GodotMCPServer {
  private server: Server;
  private mode: ServerMode;
  private tools: ReturnType<typeof getTools>;

  constructor(mode: ServerMode = "full") {
    this.mode = mode;
    this.tools = getTools(mode);
    this.server = new Server(
      { name: "godot-mcp-server", version: "1.0.0" },
      { capabilities: { tools: {} } }
    );
    this.setupHandlers();
    console.log(`[MCP Server] Godot MCP Server initialized (${Object.keys(this.tools).length} tools, mode: ${mode})`);
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: Object.values(this.tools).map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      }))
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      logger.debug(`Executing tool: ${name}`, args);
      const tool = getToolByName(name);
      if (!tool) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ error: { code: -32601, message: `Tool not found: ${name}` } }) }], isError: true };
      }
      try {
        const result = await godotServer.sendCommand(name, args || {});
        if (result.error) return { content: [{ type: "text" as const, text: JSON.stringify(result.error) }], isError: true };
        return { content: [{ type: "text" as const, text: JSON.stringify(result.result || {}, null, 2) }] };
      } catch (error) {
        logger.error(`Tool execution failed: ${name}`, error);
        return { content: [{ type: "text" as const, text: JSON.stringify({ error: { code: -32603, message: `Internal error: ${error instanceof Error ? error.message : String(error)}` } }) }], isError: true };
      }
    });
  }

  async start(): Promise<void> {
    godotServer.start();
    godotServer.on("connected", (port: number) => logger.info(`Godot client connected on port ${port}`));
    godotServer.on("disconnected", (port: number) => logger.warn(`Godot client disconnected from port ${port}`));
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    logger.info("[MCP Server] Server started and listening on stdio");
  }

  stop(): void {
    godotServer.stop();
    this.server.close();
    logger.info("[MCP Server] Server stopped");
  }

  getTools(): Record<string, unknown> {
    return this.tools;
  }

  getMode(): ServerMode {
    return this.mode;
  }
}

async function main(): Promise<void> {
  const { config } = parseArgs(process.argv.slice(2));
  const server = new GodotMCPServer(config.mode);
  process.on("SIGINT", () => { server.stop(); process.exit(0); });
  process.on("SIGTERM", () => { server.stop(); process.exit(0); });
  try {
    await server.start();
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
