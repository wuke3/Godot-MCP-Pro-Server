import { ServerMode, ServerConfig } from "../protocol/mcp-types";

const DEFAULT_CONFIG: Required<ServerConfig> = {
  port: 6505,
  mode: "full",
  godotPort: 6505,
};

export function parseArgs(args: string[]): { config: ServerConfig; mode: "mcp" | "cli" } {
  let mode: "mcp" | "cli" = "mcp";
  const config: Partial<ServerConfig> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case "--mode":
      case "-m":
        if (i + 1 < args.length) {
          const modeValue = args[++i].toLowerCase();
          if (modeValue === "full" || modeValue === "lite" || modeValue === "minimal") {
            config.mode = modeValue as ServerMode;
          }
        }
        break;
      case "--lite":
        config.mode = "lite";
        break;
      case "--minimal":
        config.mode = "minimal";
        break;
      case "--port":
      case "-p":
        if (i + 1 < args.length) {
          config.godotPort = parseInt(args[++i], 10);
        }
        break;
      case "--cli":
        mode = "cli";
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
        break;
    }
  }

  return { 
    config: { ...DEFAULT_CONFIG, ...config }, 
    mode 
  };
}

function printHelp(): void {
  console.log(`
Godot MCP Server - Reverse engineered from godot-mcp-pro

Usage:
  node index.js [options]           Start MCP server
  node cli.js [command] [options]   CLI mode

MCP Server Options:
  --mode <mode>     Set tool mode: full, lite, minimal (default: full)
  --lite            Alias for --mode lite
  --minimal         Alias for --mode minimal
  --port <port>     Godot WebSocket port (default: 6505)
  --cli             Force CLI mode

CLI Mode Commands:
  project info           Get project information
  scene play             Play current scene
  node add <type>        Add a new node
  ...                    Full list of commands

Tool Modes:
  Full     - All 167 tools (for Claude Code, Cline, Cursor)
  Lite     - 80 essential tools (for Windsurf, JetBrains Junie)
  Minimal  - 35 core tools (for local LLMs, OpenCode)

Examples:
  node build/index.js --lite
  node build/cli.js project info
  node build/cli.js node add --type CharacterBody3D --name Player
`);
}
