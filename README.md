# Godot MCP Pro Server

An independent, open-source MCP (Model Context Protocol) server for Godot 4 game engine development, built with TypeScript and Node.js. Communicates with the Godot editor via WebSocket, providing 174 Godot development tools to AI assistants.

> **⚠️ LEGAL NOTICE & DISCLAIMER**: This project is an independent open-source software implementation. All code is original and independently developed. This project is not affiliated with, endorsed by, or derived from any commercial software, paid plugins, or proprietary products. All protocol formats used in this project are based on the public JSON-RPC 2.0 standard and the open MCP specification. For questions or concerns, please contact us via GitHub Issues.

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Tool Modes](#tool-modes)
- [Installation](#installation)
- [Configuration & Usage](#configuration--usage)
  - [MCP Mode (Recommended)](#mcp-mode-recommended)
  - [CLI Mode](#cli-mode)
  - [Godot Plugin Setup](#godot-plugin-setup)
- [Supported AI Clients](#supported-ai-clients)
- [Tool Categories](#tool-categories)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Development & Contributing](#development--contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## Features

- **174 Development Tools** — Covers project management, scene editing, node manipulation, script authoring, runtime debugging, 3D development, animation, physics, navigation, audio, shaders, UI themes, tilemaps, testing & analysis, Android deployment, and more
- **Four Operating Modes** — Full / 3D / Lite / Minimal to fit different AI client tool limits
- **WebSocket Communication** — Node.js acts as the server listening on ports; Godot editor connects as a client
- **JSON-RPC 2.0 Protocol** — Standardized request/response format with error handling
- **Heartbeat Mechanism** — 5-second ping interval, 30-second inactivity timeout with auto-reconnection
- **Multi-Port Support** — Ports 6505-6514, supports multiple concurrent AI sessions
- **Two Runtime Modes** — MCP stdio mode (for AI assistants) and CLI mode (for manual use)
- **TypeScript Implementation** — Full type definitions, easy to extend and maintain

---

## Architecture Overview

```
┌───────────────┐      stdio / MCP       ┌──────────────────┐
│  AI Assistant │ ◄─────────────────────►│  Node.js Server  │
│ (Claude/Cursor│                         │   (this project) │
│   Cline, etc.)│                         └────────┬─────────┘
└───────────────┘                                  │
                                                   │ WebSocket
                                                   │ (6505-6514)
                                                   ▼
                                          ┌──────────────────┐
                                          │   Godot Editor   │
                                          │  (with plugin)   │
                                          └──────────────────┘
```

**Communication Flow**:
1. The Node.js server starts and listens for WebSocket connections on ports 6505-6514
2. The Godot editor plugin actively connects to these ports on startup
3. The AI assistant calls tools via the MCP protocol
4. The Node.js server forwards tool calls to Godot via WebSocket
5. Godot executes the command and returns the result
6. The result is returned to the AI assistant via the MCP protocol

---

## Tool Modes

Choose a mode based on your AI client's tool count limit:

| Mode | Tools | Recommended For | Description |
|------|-------|-----------------|-------------|
| **Full** | 174 | Claude Code, Cline, VS Code Copilot, Cursor | All tools, maximum functionality |
| **3D** | 134 | Clients with ~100-150 tool limits | 3D development tools + core features |
| **Lite** | 83 | Windsurf, JetBrains Junie, Gemini CLI | Essential core tools |
| **Minimal** | 35 | OpenCode, local LLMs, limited context | Most essential base tools |

Switch modes via command-line arguments:
```bash
node build/index.js --full      # Full mode (default)
node build/index.js --3d        # 3D mode
node build/index.js --lite      # Lite mode
node build/index.js --minimal   # Minimal mode
node build/index.js --mode lite # Generic mode parameter
```

---

## Installation

### Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- Godot 4.x (with a compatible Godot editor plugin)

### Install Commands

```bash
# Clone the repository
git clone <your-repo-url>
cd Godot-MCP-Pro-Server

# Navigate to the server directory
cd server

# Install dependencies
npm install

# Build TypeScript
npm run build
```

After building, executable files are located in `server/build/`:
- `index.js` — Main MCP server entry point
- `cli.js` — Command-line tool entry point

---

## Configuration & Usage

### MCP Mode (Recommended)

Configure the server as an MCP tool provider for your AI client.

#### Claude Desktop / Claude Code

Add to `claude_desktop_config.json` (or `.mcp.json`):

```json
{
  "mcpServers": {
    "godot": {
      "command": "node",
      "args": ["/absolute/path/to/Godot-MCP-Pro-Server/server/build/index.js", "--lite"]
    }
  }
}
```

> **Tip**: Replace `--lite` with your preferred mode (`--full`, `--3d`, `--minimal`).
> **Note**: Path must be an absolute path.

#### Cursor

In Cursor Settings → MCP Servers, add:

```json
{
  "mcpServers": {
    "godot": {
      "command": "node",
      "args": ["/absolute/path/to/server/build/index.js", "--3d"]
    }
  }
}
```

#### Cline (VS Code)

In VS Code settings, search for "Cline: Mcp Servers" and add:

```json
{
  "godot": {
    "command": "node",
    "args": ["/absolute/path/to/server/build/index.js", "--full"]
  }
}
```

#### Windsurf / JetBrains Junie

`--lite` mode is recommended for a balanced tool count.

---

### CLI Mode

You can also manually call tools from the command line, useful for debugging or script integration.

#### Basic Usage

```bash
cd server

# Show help
node build/cli.js --help

# Call tools (group_command format)
node build/cli.js project info
node build/cli.js get_editor_errors
node build/cli.js node add --type CharacterBody3D --name Player
node build/cli.js scene open --path res://scenes/Main.tscn
node build/cli.js script read --path res://scripts/Player.gd
```

#### Tool Name Formats

Two formats are supported:
1. **Group + Command**: `node cli.js <group> <command> [options]`
   - Example: `node cli.js node add --type Sprite2D`
2. **Full Tool Name**: `node cli.js <tool_name> [options]`
   - Example: `node cli.js add_node --type Sprite2D`

#### Parameter Passing

```bash
# With parameters
node build/cli.js simulate_key --keycode KEY_SPACE --pressed true
node build/cli.js set_property --node_path Player --property position --value "Vector2(100,200)"
node build/cli.js get_node_properties --node_path Player --properties '["position","rotation"]'
```

#### Available Tool Groups

52 tool groups in total: `add`, `analyze`, `apply`, `assert`, `assign`, `attach`, `bake`, `batch`, `capture`, `clear`, `click`, `compare`, `connect`, `create`, `cross`, `delete`, `deploy`, `detect`, `disconnect`, `duplicate`, `edit`, `execute`, `export`, `find`, `get`, `list`, `monitor`, `move`, `navigate`, `open`, `play`, `project`, `read`, `reload`, `remove`, `rename`, `replay`, `run`, `save`, `search`, `select`, `set`, `setup`, `simulate`, `start`, `stop`, `tilemap`, `uid`, `update`, `validate`, `wait`, `watch`

---

### Godot Plugin Setup

This server requires a compatible Godot editor plugin to work. Ensure you have a WebSocket MCP plugin installed in Godot; the plugin will automatically connect to ports 6505-6514 as a client.

**Setup Steps**:
1. Start your AI client first (MCP mode will auto-start this server)
2. Open the Godot editor
3. Enable the MCP plugin in Godot
4. The plugin will automatically attempt to connect to ports 6505-6514
5. Once connected, you can use Godot tools in your AI assistant

> **Note**: Ensure your Godot plugin version is compatible with this server. If using a third-party Godot MCP plugin, refer to its documentation for configuration.

---

## Supported AI Clients

Theoretically supports all MCP-compatible AI clients:

| Client | Recommended Mode | Notes |
|--------|-----------------|-------|
| Claude Code / Claude Desktop | Full / 3D | Official MCP support, best experience |
| Cursor | Full / 3D | Built-in MCP support |
| Cline (VS Code) | Full | VS Code extension with MCP |
| VS Code Copilot | 3D / Lite | Choose based on tool limits |
| Windsurf | Lite | MCP support |
| JetBrains Junie | Lite | JetBrains IDE support |
| Gemini CLI | Lite | MCP support |
| OpenCode | Minimal | Open-source IDE |
| Local LLMs | Minimal | For limited context environments |

---

## Tool Categories

### Core Development
- **Project** — Project info, filesystem, search, project settings, UID, Autoload
- **Scene** — Scene open/save/play, scene tree, scene dependencies
- **Node** — Node CRUD, property manipulation, parent-child relationships, move/duplicate
- **Script** — Script read/write, create, edit, attach, validate
- **Editor** — Editor errors, screenshots, output log, signals, editor scripts, camera, auto-dismiss
- **Input** — Keyboard/mouse/action simulation, input sequences
- **Runtime** — Runtime scene tree, node properties, game scripts, UI interaction, node finding, waiting

### Advanced Features
- **Animation** — Animation list, create, tracks, keyframes, info
- **Animation Tree** — Animation tree creation, structure, state machine, blend tree, parameters
- **3D Scene** — 3D node creation, transforms, lighting, camera, materials
- **Physics** — Physics bodies, collision, layers, raycasting, physics info
- **Navigation** — Navigation regions, agents, baking, layers, info
- **Particle** — Particle system creation and configuration
- **Audio** — Audio players, buses, effects, layouts
- **TileMap** — Tilemap cells, fill, info, used cells
- **Theme** — Theme creation, colors, constants, fonts, styles, control setup
- **Shader** — Shader creation, read/write, edit, material assignment
- **Resource** — Resource read/write, create, preview
- **Export** — Project export, presets, export info
- **Batch** — Batch find, property setting, node references, cross-scene operations
- **Analysis** — Scene complexity, signal flow, unused resources, circular dependencies, script references, project statistics
- **Profiling** — Performance monitors, editor performance
- **Testing** — Test scenarios, assertions, screenshot comparison, stress tests, test reports
- **Input Map** — Input action list, settings
- **Android** — Android deployment, devices, packaging

---

## FAQ

### Q: Godot won't connect after the server starts?
A: Check the following:
1. Confirm the Node.js server is running (listening on ports 6505-6514)
2. Confirm the Godot plugin is enabled
3. Check if a firewall is blocking local port connections
4. Check the Godot output log for connection error messages

### Q: Tool calls aren't responding?
A: 
1. Confirm the Godot client is connected (check server logs)
2. Verify the tool name is correct (case-sensitive)
3. Check your AI client's MCP logs
4. Ensure parameter format is correct

### Q: What's the difference between the modes?
A: Modes only affect the number of tools exposed to the AI assistant, not server functionality. Fewer tools means less AI context usage and potentially faster responses. Choose based on your AI client's tool limits.

### Q: Can I connect multiple AI sessions simultaneously?
A: Yes. The server listens on 10 ports (6505-6514), each accepting one Godot connection. Each AI session should use a separate server instance (different ports).

### Q: Does this support Godot 3?
A: This project is designed for Godot 4.x. Godot 3 compatibility is not guaranteed.

### Q: Can I run this on a remote machine?
A: Yes, but be aware of security risks. The WebSocket server listens on all network interfaces by default. It's recommended to use only locally or within trusted networks. For remote access, configure a firewall or VPN.

---

## Troubleshooting

### Error: "No Godot connection available"
- **Cause**: Godot client is not connected to the server
- **Solution**:
  1. Confirm the MCP plugin is enabled in Godot
  2. Confirm the Godot plugin is trying to connect to the same ports the server is listening on
  3. Restart the Godot editor

### Error: Port already in use
- **Cause**: Ports 6505-6514 are already used by another process
- **Solution**: Close the process using the ports, or modify the port configuration in the source code

### TypeScript Build Failures
- Run `npm install` to ensure all dependencies are installed
- Verify TypeScript version compatibility (`npm list typescript`)
- Try deleting `build/` and `node_modules/` and reinstalling

### MCP Connection Failures
- Check that the Node.js path is correct
- Verify the server path is an absolute path
- Check your AI client's MCP logs for detailed errors
- Manually run `node build/index.js` to test if it starts normally

---

## Development & Contributing

### Project Structure

```
Godot-MCP-Pro-Server/
├── server/
│   ├── src/
│   │   ├── index.ts              # MCP server main entry
│   │   ├── cli.ts                # CLI entry point
│   │   ├── websocket-server.ts   # WebSocket server implementation
│   │   ├── protocol/
│   │   │   ├── mcp-types.ts      # Type definitions
│   │   │   └── jsonrpc.ts        # JSON-RPC 2.0 utilities
│   │   ├── tools/
│   │   │   ├── core.ts           # Core tool definitions
│   │   │   ├── additional.ts     # Advanced tool definitions
│   │   │   └── index.ts          # Tool aggregation & mode config
│   │   └── utils/
│   │       ├── config.ts         # Configuration & argument parsing
│   │       └── logger.ts         # Logging utilities
│   ├── build/                    # Compiled output (generated)
│   ├── package.json
│   └── tsconfig.json
├── README.md
├── LICENSE
└── .gitignore
```

### Local Development

```bash
cd server

# Watch mode auto-compile
npm run dev

# Manual build
npm run build

# Test CLI
node build/cli.js --help
```

### Adding New Tools

1. Add the tool definition in `src/tools/core.ts` or `src/tools/additional.ts`
2. Confirm it's included in `ALL_TOOLS` in `src/tools/index.ts`
3. If it should be available in specific modes, add the tool name to the corresponding Set
4. Run `npm run build` to rebuild

---

## License

MIT License — see the [LICENSE](LICENSE) file for details.

---

## Disclaimer

### Project Nature Statement

This project is an **independent, open-source** MCP server implementation designed to provide AI-assisted development tools for Godot game engine developers.

### Intellectual Property Statement

1. **Independent Implementation**: All code in this project is independently developed and does not contain source code, binary code, or derivative code from any proprietary software.
2. **Standard Protocols**: The JSON-RPC 2.0 protocol and MCP (Model Context Protocol) used in this project are public standards or open specifications.
3. **General Functionality**: Tool designs are based on the Godot editor's public API and common game development workflows, which are functional descriptions not protected by copyright.
4. **Open-Source Dependencies**: This project uses only open-source libraries (TypeScript, ws, @modelcontextprotocol/sdk, etc.), all with their respective open-source licenses.

### No Warranty Statement

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Usage Risks

Users assume all risks associated with using this software. The project authors are not liable for any direct or indirect damages resulting from the use of this software.

### Trademark Statement

All product names, trademarks, and registered trademarks mentioned in this project are the property of their respective owners and are used for descriptive purposes only. This project is not affiliated with, endorsed by, or sponsored by these companies/products.

- Godot is a trademark of the Godot Engine community
- Claude is a trademark of Anthropic
- Cursor is a trademark of Anysphere
- VS Code is a trademark of Microsoft

### DMCA / Copyright Infringement

If you believe this project infringes on your copyright, please contact us via GitHub Issues and provide the following information:
1. Identification of the copyright owner
2. Specific location of the allegedly infringing content
3. Detailed description of the infringement
4. Your contact information

We will address the notice promptly upon receipt.

---

<p align="center">
  <em>Made with ❤️ for the Godot open-source community</em>
</p>
