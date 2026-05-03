#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { godotClient } from "./websocket-client.js";
import { getTools, getToolByName } from "./tools/index.js";
import { parseArgs } from "./utils/config.js";
import { logger } from "./utils/logger.js";
import { ServerMode } from "./protocol/mcp-types.js";

class GodotMCPServer {
  private server: Server;
  private mode: ServerMode;
  private tools: ReturnType<typeof getTools>;

  constructor(mode: ServerMode = "full") {
    this.mode = mode;
    this.tools = getTools(mode);

    this.server = new Server(
      {
        name: "godot-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    console.log(`[MCP Server] Godot MCP Server initialized (${Object.keys(this.tools).length} tools, mode: ${mode})`);
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools = Object.values(this.tools).map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      }));

      return { tools };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      logger.debug(`Executing tool: ${name}`, args);

      const tool = getToolByName(name);
      if (!tool) {
        return {
          content: [
            {
              type: "text" as const,
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
        const result = await godotClient.sendCommand(name, args || {});

        if (result.error) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify(result.error),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result.result || {}, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error(`Tool execution failed: ${name}`, error);
        return {
          content: [
            {
              type: "text" as const,
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

  async start(): Promise<void> {
    godotClient.start();

    godotClient.on("connected", (port: number) => {
      logger.info(`Connected to Godot on port ${port}`);
    });

    godotClient.on("disconnected", (port: number) => {
      logger.warn(`Disconnected from Godot on port ${port}`);
    });

    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    logger.info("[MCP Server] Server started and listening on stdio");
  }

  stop(): void {
    godotClient.stop();
    this.server.close();
    logger.info("[MCP Server] Server stopped");
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const { config } = parseArgs(args);

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
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
