# Godot MCP Server

An independent implementation of an MCP (Model Context Protocol) server for Godot 4 development, built with TypeScript and Node.js.

## Features

- WebSocket-based communication with Godot editor
- Comprehensive toolset for project, scene, node, script, and runtime management
- Three operation modes: Full, Lite, and Minimal
- CLI interface for direct command execution
- JSON-RPC 2.0 protocol implementation

## Architecture

```
AI Assistant ← stdio/MCP ←→ Node.js Server ← WebSocket (6505-6514) ←→ Godot Editor Plugin
```

## Installation

```bash
cd server
npm install
npm run build
```

## MCP Mode Configuration

Add to your `.mcp.json`:
```json
{
  "mcpServers": {
    "godot-mcp": {
      "command": "node",
      "args": ["/path/to/server/build/index.js", "--lite"]
    }
  }
}
```

## CLI Mode Usage

```bash
cd server
node build/cli.js project info
node build/cli.js scene play
node build/cli.js node add --type CharacterBody3D --name Player
```

## License

MIT License - See LICENSE file for details.

## Disclaimer

This is an independent, clean-room implementation. All functionality is designed based on public knowledge and generic expectations for MCP-Godot integration, and is not derived from any paid or proprietary software. The project uses standard open-source libraries and MCP SDK.
