import { ServerMode, ServerConfig } from "../protocol/mcp-types";

const DEFAULT_CONFIG: Required<ServerConfig> = { port: 6505, mode: "full", godotPort: 6505 };

export function parseArgs(args: string[]): { config: ServerConfig; mode: "mcp" | "cli" } {
  let mode: "mcp" | "cli" = "mcp";
  const config: Partial<ServerConfig> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--mode": case "-m":
        if (i + 1 < args.length) { const v = args[++i].toLowerCase(); if (["full", "3d", "lite", "minimal"].includes(v)) config.mode = v as ServerMode; }
        break;
      case "--3d": config.mode = "3d"; break;
      case "--lite": config.mode = "lite"; break;
      case "--minimal": config.mode = "minimal"; break;
      case "--port": case "-p": if (i + 1 < args.length) config.godotPort = parseInt(args[++i], 10); break;
      case "--cli": mode = "cli"; break;
      case "--help": case "-h": printHelp(); process.exit(0); break;
    }
  }
  return { config: { ...DEFAULT_CONFIG, ...config }, mode };
}

function printHelp(): void {
  console.log(`
Godot MCP Server - Reverse engineered from godot-mcp-pro

Usage:
  node index.js [options]           Start MCP server
  node cli.js [command] [options]   CLI mode

Options:
  --mode <mode>     Set tool mode: full, 3d, lite, minimal (default: full)
  --3d              Alias for --mode 3d
  --lite            Alias for --mode lite
  --minimal         Alias for --mode minimal
  --port <port>     Godot WebSocket port (default: 6505)
  --cli             Force CLI mode
  --help, -h        Show this help

Tool Modes:
  Full     - All 175 tools (Claude Code, Cline, VS Code Copilot, Cursor)
  3D       - 103 tools with 3D focus (Antigravity and other 100-tool-limit clients)
  Lite     - 84 essential tools (Windsurf, JetBrains Junie, Gemini CLI)
  Minimal  - 35 core tools (OpenCode, local LLMs with small context)
`);
}
