# Godot MCP Server Configuration

## MCP Mode (.mcp.json)

Add to your `.mcp.json` file in your home directory or project root:

```json
{
  "mcpServers": {
    "godot-mcp-pro": {
      "command": "node",
      "args": ["/path/to/server/build/index.js"],
      "env": {
        "GODOT_MCP_PORT": "6505"
      }
    }
  }
}
```

### With Lite Mode

```json
{
  "mcpServers": {
    "godot-mcp-pro": {
      "command": "node",
      "args": ["/path/to/server/build/index.js", "--lite"],
      "env": {
        "GODOT_MCP_PORT": "6505"
      }
    }
  }
}
```

### With Minimal Mode

```json
{
  "mcpServers": {
    "godot-mcp-pro": {
      "command": "node",
      "args": ["/path/to/server/build/index.js", "--minimal"],
      "env": {
        "GODOT_MCP_PORT": "6505"
      }
    }
  }
}
```

## Godot Editor Plugin Setup

1. Copy the `addons/godot_mcp/` folder from the godot-mcp-pro repository into your Godot project's `addons/` directory

2. Enable the plugin:
   - Open **Project → Project Settings → Plugins**
   - Find **Godot MCP Pro** and set **Status** to **Enable**

3. The plugin will automatically:
   - Start WebSocket server on ports 6505-6514
   - Inject MCP autoloads for runtime inspection
   - Display status in the bottom panel

## Connection Architecture

```
AI Assistant (Claude Code / Cline / etc.)
         ↓
    MCP Protocol
         ↓
   Node.js Server (this project)
         ↓
    WebSocket (ws://127.0.0.1:6505)
         ↓
Godot Editor (with godot-mcp plugin enabled)
```

## Tool Modes

| Mode     | Tools | Best For                              |
|----------|-------|---------------------------------------|
| Full     | 167   | Claude Code, Cline, VS Code Copilot   |
| Lite     | 80    | Windsurf, JetBrains Junie             |
| Minimal  | 35    | Local LLMs, OpenCode                  |

## CLI Mode

For clients without MCP support or direct terminal access:

```bash
# Install dependencies and build
cd server
npm install
npm run build

# Project info
node build/cli.js project info

# Play scene
node build/cli.js scene play

# Add node
node build/cli.js node add --type CharacterBody3D --name Player

# Simulate input
node build/cli.js input simulate_key --keycode KEY_ENTER --pressed true
```
