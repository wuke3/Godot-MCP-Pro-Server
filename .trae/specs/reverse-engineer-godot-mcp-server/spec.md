# Reverse Engineer Godot MCP Server Spec

## Why

The godot-mcp-pro plugin provides 169 powerful MCP tools for AI-powered Godot 4 development, but the Node.js MCP server (server/) is paid content. The Godot plugin side (addons/godot_mcp/) is open source and fully visible. We need to reverse-engineer and implement the server side to enable full MCP protocol support for AI assistants like Claude Code.

## What Changes

- Create a complete Node.js MCP server implementation that connects to the Godot editor plugin via WebSocket (ports 6505-6514)
- Implement JSON-RPC 2.0 protocol handler
- Expose all 169 Godot MCP tools as MCP server tools
- Support MCP protocol modes: Full (167 tools), Lite (80 tools), Minimal (35 tools)
- Provide CLI mode for clients without MCP support
- Implement bidirectional communication with Godot plugin

## Impact

- Affected specs: MCP protocol, Godot 4 editor plugin integration
- Affected code: New server implementation in TypeScript/Node.js

## Architecture

```
AI Assistant ←—stdio/MCP—→ Node.js Server ←—WebSocket:6505-6514—→ Godot Editor Plugin
```

## MCP Server Responsibilities

1. **MCP Protocol Handling**
   - JSON-RPC 2.0 request/response handling
   - Tool list management and discovery
   - Schema generation for all 169 tools
   - Error code mapping (MCP standard codes)

2. **WebSocket Communication**
   - Connect to Godot plugin on ports 6505-6514
   - Handle multi-client connections (each AI session = one port)
   - Parse JSON-RPC commands from Godot responses
   - Forward AI commands to Godot plugin

3. **Tool Definitions**

### Project Tools (7)
- `get_project_info` - Project metadata, version, viewport, autoloads
- `get_filesystem_tree` - Recursive file tree with filtering
- `search_files` - Fuzzy/glob file search
- `get_project_settings` - Read project.godot settings
- `set_project_setting` - Set project settings via editor API
- `uid_to_project_path` - UID → res:// conversion
- `project_path_to_uid` - res:// → UID conversion

### Scene Tools (9)
- `get_scene_tree` - Live scene tree with hierarchy
- `get_scene_file_content` - Raw .tscn file content
- `create_scene` - Create new scene files
- `open_scene` - Open scene in editor
- `delete_scene` - Delete scene file
- `add_scene_instance` - Instance scene as child node
- `play_scene` - Run scene (main/current/custom)
- `stop_scene` - Stop running scene
- `save_scene` - Save current scene to disk

### Node Tools (14)
- `add_node` - Add node with type and properties
- `delete_node` - Delete node (with undo support)
- `duplicate_node` - Duplicate node and children
- `move_node` - Move/reparent node
- `update_property` - Set any property (auto type parsing)
- `get_node_properties` - Get all node properties
- `add_resource` - Add Shape/Material/etc to node
- `set_anchor_preset` - Set Control anchor preset
- `rename_node` - Rename a node in the scene
- `connect_signal` - Connect signal between nodes
- `disconnect_signal` - Disconnect signal connection
- `get_node_groups` - Get groups a node belongs to
- `set_node_groups` - Set node group membership
- `find_nodes_in_group` - Find all nodes in a group

### Script Tools (8)
- `list_scripts` - List all scripts with class info
- `read_script` - Read script content
- `create_script` - Create new script with template
- `edit_script` - Search/replace or full edit
- `attach_script` - Attach script to node
- `get_open_scripts` - List scripts open in editor
- `validate_script` - Validate GDScript syntax
- `search_in_files` - Search content in project files

### Editor Tools (9)
- `get_editor_errors` - Get errors and stack traces
- `get_editor_screenshot` - Capture editor viewport
- `get_game_screenshot` - Capture running game
- `execute_editor_script` - Run arbitrary GDScript in editor
- `clear_output` - Clear output panel
- `get_signals` - Get all signals of a node with connections
- `reload_plugin` - Reload the MCP plugin (auto-reconnect)
- `reload_project` - Rescan filesystem and reload scripts
- `get_output_log` - Get output panel content

### Input Tools (7)
- `simulate_key` - Simulate keyboard key press/release
- `simulate_mouse_click` - Simulate mouse click at position
- `simulate_mouse_move` - Simulate mouse movement
- `simulate_action` - Simulate Godot Input Action
- `simulate_sequence` - Sequence of input events with frame delays
- `get_input_actions` - List all input actions
- `set_input_action` - Create/modify input action

### Runtime Tools (19)
- `get_game_scene_tree` - Scene tree of running game
- `get_game_node_properties` - Node properties in running game
- `set_game_node_property` - Set node property in running game
- `execute_game_script` - Run GDScript in game context
- `capture_frames` - Multi-frame screenshot capture
- `monitor_properties` - Record property values over time
- `start_recording` - Start input recording
- `stop_recording` - Stop input recording
- `replay_recording` - Replay recorded input
- `find_nodes_by_script` - Find game nodes by script
- `get_autoload` - Get autoload node properties
- `batch_get_properties` - Batch get multiple node properties
- `find_ui_elements` - Find UI elements in game
- `click_button_by_text` - Click button by text content
- `wait_for_node` - Wait for node to appear
- `find_nearby_nodes` - Find nodes near position
- `navigate_to` - Navigate to target position
- `move_to` - Walk character to target

### Animation Tools (6)
- `list_animations` - List all animations in AnimationPlayer
- `create_animation` - Create new animation
- `add_animation_track` - Add track (value/position/rotation/method/bezier)
- `set_animation_keyframe` - Insert keyframe into track
- `get_animation_info` - Detailed animation info with all tracks/keys
- `remove_animation` - Remove an animation

### TileMap Tools (6)
- `tilemap_set_cell` - Set a single tile cell
- `tilemap_fill_rect` - Fill rectangular region with tiles
- `tilemap_get_cell` - Get tile data at cell
- `tilemap_clear` - Clear all cells
- `tilemap_get_info` - TileMapLayer info and tile set sources
- `tilemap_get_used_cells` - List of used cells

### Theme & UI Tools (6)
- `create_theme` - Create Theme resource file
- `set_theme_color` - Set theme color override
- `set_theme_constant` - Set theme constant override
- `set_theme_font_size` - Set theme font size override
- `set_theme_stylebox` - Set StyleBoxFlat override
- `get_theme_info` - Get theme overrides info

### Profiling Tools (2)
- `get_performance_monitors` - All performance monitors
- `get_editor_performance` - Quick performance summary

### Batch & Refactoring Tools (8)
- `find_nodes_by_type` - Find all nodes of a type
- `find_signal_connections` - Find all signal connections in scene
- `batch_set_property` - Set property on all nodes of a type
- `find_node_references` - Search project files for pattern
- `get_scene_dependencies` - Get resource dependencies
- `cross_scene_set_property` - Set property across all scenes
- `find_script_references` - Find where script/resource is used
- `detect_circular_dependencies` - Find circular scene dependencies

### Shader Tools (6)
- `create_shader` - Create shader with template
- `read_shader` - Read shader file
- `edit_shader` - Edit shader (replace/search-replace)
- `assign_shader_material` - Assign ShaderMaterial to node
- `set_shader_param` - Set shader parameter
- `get_shader_params` - Get all shader parameters

### Export Tools (3)
- `list_export_presets` - List export presets
- `export_project` - Get export command for preset
- `get_export_info` - Export-related project info

### Resource Tools (6)
- `read_resource` - Read .tres resource properties
- `edit_resource` - Edit resource properties
- `create_resource` - Create new .tres resource
- `get_resource_preview` - Get resource thumbnail
- `add_autoload` - Register autoload singleton
- `remove_autoload` - Remove autoload singleton

### Physics Tools (6)
- `setup_physics_body` - Configure physics body properties
- `setup_collision` - Add collision shapes to nodes
- `set_physics_layers` - Set collision layer/mask
- `get_physics_layers` - Get collision layer/mask info
- `get_collision_info` - Get collision shape details
- `add_raycast` - Add RayCast2D/3D node

### 3D Scene Tools (6)
- `add_mesh_instance` - Add MeshInstance3D with primitive mesh
- `setup_camera_3d` - Configure Camera3D properties
- `setup_lighting` - Add/configure light nodes
- `setup_environment` - Configure WorldEnvironment
- `add_gridmap` - Set up GridMap node
- `set_material_3d` - Set StandardMaterial3D properties

### Particle Tools (5)
- `create_particles` - Create GPUParticles2D/3D
- `set_particle_material` - Configure ParticleProcessMaterial
- `set_particle_color_gradient` - Set color gradient for particles
- `apply_particle_preset` - Apply preset (fire, smoke, sparks, etc.)
- `get_particle_info` - Get particle system details

### Navigation Tools (6)
- `setup_navigation_region` - Configure NavigationRegion
- `setup_navigation_agent` - Configure NavigationAgent
- `bake_navigation_mesh` - Bake navigation mesh
- `set_navigation_layers` - Set navigation layers
- `get_navigation_info` - Get navigation setup info

### Audio Tools (6)
- `add_audio_player` - Add AudioStreamPlayer node
- `add_audio_bus` - Add audio bus
- `add_audio_bus_effect` - Add effect to audio bus
- `set_audio_bus` - Configure audio bus properties
- `get_audio_bus_layout` - Get audio bus layout info
- `get_audio_info` - Get audio-related node info

### AnimationTree Tools (4)
- `create_animation_tree` - Create AnimationTree
- `get_animation_tree_structure` - Get tree structure
- `set_tree_parameter` - Set AnimationTree parameter
- `add_state_machine_state` - Add state to state machine

### State Machine Tools (3)
- `remove_state_machine_state` - Remove state from state machine
- `add_state_machine_transition` - Add transition between states
- `remove_state_machine_transition` - Remove state transition

### Blend Tree Tools (1)
- `set_blend_tree_node` - Configure blend tree nodes

### Analysis & Search Tools (4)
- `analyze_scene_complexity` - Analyze scene performance
- `analyze_signal_flow` - Map signal connections
- `find_unused_resources` - Find unreferenced resources
- `get_project_statistics` - Get project-wide statistics

### Testing & QA Tools (6)
- `run_test_scenario` - Run automated test scenario

## IPC Communication Protocol

### Command Flow
1. MCP server receives tool call from AI
2. Server sends JSON-RPC request via WebSocket to Godot
3. Godot plugin executes command via CommandRouter
4. Godot sends JSON-RPC response back via WebSocket
5. Server parses response and returns to AI

### Game Runtime Commands (File-based IPC)
For runtime inspection, the server writes commands to files:
- `user://mcp_game_request` - Command request
- `user://mcp_game_response` - Command response
- `user://mcp_input_commands` - Input simulation
- `user://mcp_screenshot_request` / `user://mcp_screenshot.png` - Screenshots

### Input Simulation
- Key events with keycode, modifiers
- Mouse click/motion at viewport coordinates
- Input actions (mapped via InputMap)
- Sequence commands with frame delays

## File Structure

```
server/
├── src/
│   ├── index.ts           # Main entry, MCP server setup
│   ├── cli.ts             # CLI mode entry point
│   ├── websocket-client.ts # WebSocket connection to Godot
│   ├── protocol/
│   │   ├── jsonrpc.ts     # JSON-RPC 2.0 handler
│   │   └── mcp-types.ts   # MCP protocol types
│   ├── tools/
│   │   ├── index.ts       # Tool registry
│   │   ├── project.ts     # Project tools
│   │   ├── scene.ts       # Scene tools
│   │   ├── node.ts        # Node tools
│   │   ├── script.ts      # Script tools
│   │   ├── editor.ts      # Editor tools
│   │   ├── input.ts       # Input simulation tools
│   │   ├── runtime.ts     # Runtime inspection tools
│   │   ├── animation.ts   # Animation tools
│   │   ├── tilemap.ts     # TileMap tools
│   │   ├── theme.ts       # Theme & UI tools
│   │   ├── profiling.ts   # Profiling tools
│   │   ├── batch.ts       # Batch operations
│   │   ├── shader.ts      # Shader tools
│   │   ├── export.ts      # Export tools
│   │   ├── resource.ts   # Resource tools
│   │   ├── physics.ts     # Physics tools
│   │   ├── scene3d.ts     # 3D scene tools
│   │   ├── particle.ts   # Particle tools
│   │   ├── navigation.ts  # Navigation tools
│   │   ├── audio.ts       # Audio tools
│   │   ├── animation-tree.ts # AnimationTree tools
│   │   ├── state-machine.ts # State machine tools
│   │   ├── blend-tree.ts  # Blend tree tools
│   │   ├── analysis.ts   # Analysis tools
│   │   └── test.ts        # Testing tools
│   └── utils/
│       ├── logger.ts      # Logging utilities
│       └── config.ts      # Configuration handling
├── package.json
├── tsconfig.json
└── build/
    └── index.js           # Compiled output
```

## Dependencies

- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `ws` - WebSocket server/client
- `typescript` - TypeScript compiler
- `zod` - Schema validation

## Error Codes

Standard MCP error codes:
- `-32700` - Parse error
- `-32600` - Invalid request
- `-32601` - Method not found
- `-32602` - Invalid params
- `-32603` - Internal error
- `-32000` - Custom Godot error
- `-32001` - Resource not found

## ADDED Requirements

### Requirement: MCP Server Initialization
The system SHALL initialize MCP server with WebSocket connections to Godot on ports 6505-6514.

#### Scenario: Server startup
- **WHEN** MCP server starts with valid Godot plugin connection
- **THEN** Server establishes WebSocket connections and registers all 169 tools

### Requirement: Tool Execution
The system SHALL execute tool calls by forwarding to Godot plugin via JSON-RPC over WebSocket.

#### Scenario: Successful tool call
- **WHEN** AI sends a valid tool call (e.g., `get_scene_tree`)
- **THEN** Server forwards to Godot, returns JSON-RPC response with result

#### Scenario: Tool not found
- **WHEN** AI sends unknown tool name
- **THEN** Server returns error with code -32601 and available methods list

### Requirement: Mode Support
The system SHALL support Full, Lite, and Minimal tool modes.

#### Scenario: Lite mode
- **WHEN** Server starts with `--lite` flag
- **THEN** Only 80 essential tools are registered

### Requirement: CLI Mode
The system SHALL provide CLI mode for clients without MCP support.

#### Scenario: Direct command execution
- **WHEN** User runs `node cli.js node add --type CharacterBody3D`
- **THEN** Server connects to Godot, executes command, returns result

### Requirement: Runtime Inspection
The system SHALL support runtime game inspection via file-based IPC.

#### Scenario: Get game scene tree
- **WHEN** AI calls `get_game_scene_tree`
- **THEN** Server writes request file, polls for response, returns game scene tree

### Requirement: Input Simulation
The system SHALL simulate input events in running game.

#### Scenario: Simulate key press
- **WHEN** AI calls `simulate_key` with keycode and pressed state
- **THEN** Server writes input command file, game receives and dispatches InputEvent
