# Tasks

## Phase 1: Project Setup
- [x] Task 1.1: Initialize Node.js/TypeScript project structure
  - Create server directory with package.json
  - Set up TypeScript configuration
  - Install dependencies (@modelcontextprotocol/sdk, ws, zod)
  
- [x] Task 1.2: Create build setup script
  - Create build/setup.js for dependency installation
  - Configure TypeScript build pipeline

## Phase 2: MCP Protocol Layer
- [x] Task 2.1: Implement JSON-RPC 2.0 handler
  - Create src/protocol/jsonrpc.ts
  - Handle request/response, error codes
  
- [x] Task 2.2: Define MCP protocol types
  - Create src/protocol/mcp-types.ts
  - Type definitions for MCP protocol

## Phase 3: WebSocket Communication
- [x] Task 3.1: Implement WebSocket client
  - Create src/websocket-client.ts
  - Multi-port connection (6505-6514)
  - Handle reconnection logic

## Phase 4: Core Tool Categories

### Project Tools (9)
- [x] Task 4.1: Implement project tools
  - get_project_info, get_filesystem_tree, search_files
  - get_project_settings, set_project_setting
  - uid_to_project_path, project_path_to_uid
  - add_autoload, remove_autoload

### Scene Tools (10)
- [x] Task 4.2: Implement scene tools
  - get_scene_tree, get_scene_file_content, create_scene
  - open_scene, delete_scene, add_scene_instance
  - play_scene, stop_scene, save_scene, get_scene_exports

### Node Tools (14)
- [x] Task 4.3: Implement node tools
  - add_node, delete_node, duplicate_node, move_node
  - update_property, get_node_properties, add_resource
  - set_anchor_preset, rename_node
  - connect_signal, disconnect_signal
  - get_node_groups, set_node_groups, find_nodes_in_group

### Script Tools (8)
- [x] Task 4.4: Implement script tools
  - list_scripts, read_script, create_script
  - edit_script, attach_script, get_open_scripts
  - validate_script, search_in_files

### Editor Tools (9)
- [x] Task 4.5: Implement editor tools
  - get_editor_errors, get_editor_screenshot, get_game_screenshot
  - execute_editor_script, clear_output, get_signals
  - reload_plugin, reload_project, get_output_log

### Input Tools (7)
- [x] Task 4.6: Implement input tools
  - simulate_key, simulate_mouse_click, simulate_mouse_move
  - simulate_action, simulate_sequence
  - get_input_actions, set_input_action

### Runtime Tools (19)
- [x] Task 4.7: Implement runtime tools
  - get_game_scene_tree, get_game_node_properties
  - set_game_node_property, execute_game_script
  - capture_frames, monitor_properties
  - start_recording, stop_recording, replay_recording
  - find_nodes_by_script, get_autoload, batch_get_properties
  - find_ui_elements, click_button_by_text, wait_for_node
  - find_nearby_nodes, navigate_to, move_to, watch_signals

## Phase 5: Additional Tool Categories

### Animation Tools (6)
- [x] Task 5.1: Implement animation tools
  - list_animations, create_animation, add_animation_track
  - set_animation_keyframe, get_animation_info, remove_animation

### TileMap Tools (6)
- [x] Task 5.2: Implement tilemap tools
  - tilemap_set_cell, tilemap_fill_rect, tilemap_get_cell
  - tilemap_clear, tilemap_get_info, tilemap_get_used_cells

### Theme & UI Tools (6)
- [x] Task 5.3: Implement theme tools
  - create_theme, set_theme_color, set_theme_constant
  - set_theme_font_size, set_theme_stylebox, get_theme_info

### Profiling Tools (2)
- [x] Task 5.4: Implement profiling tools
  - get_performance_monitors, get_editor_performance

### Batch & Refactoring Tools (8)
- [x] Task 5.5: Implement batch tools
  - find_nodes_by_type, find_signal_connections
  - batch_set_property, find_node_references
  - get_scene_dependencies, cross_scene_set_property
  - find_script_references, detect_circular_dependencies

### Shader Tools (6)
- [x] Task 5.6: Implement shader tools
  - create_shader, read_shader, edit_shader
  - assign_shader_material, set_shader_param, get_shader_params

### Export Tools (3)
- [x] Task 5.7: Implement export tools
  - list_export_presets, export_project, get_export_info

### Resource Tools (6)
- [x] Task 5.8: Implement resource tools
  - read_resource, edit_resource, create_resource
  - get_resource_preview, add_autoload, remove_autoload

### Physics Tools (6)
- [x] Task 5.9: Implement physics tools
  - setup_physics_body, setup_collision, set_physics_layers
  - get_physics_layers, get_collision_info, add_raycast

### 3D Scene Tools (6)
- [x] Task 5.10: Implement 3D scene tools
  - add_mesh_instance, setup_camera_3d, setup_lighting
  - setup_environment, add_gridmap, set_material_3d

### Particle Tools (5)
- [x] Task 5.11: Implement particle tools
  - create_particles, set_particle_material
  - set_particle_color_gradient, apply_particle_preset, get_particle_info

### Navigation Tools (5)
- [x] Task 5.12: Implement navigation tools
  - setup_navigation_region, setup_navigation_agent
  - bake_navigation_mesh, set_navigation_layers, get_navigation_info

### Audio Tools (6)
- [x] Task 5.13: Implement audio tools
  - add_audio_player, add_audio_bus, add_audio_bus_effect
  - set_audio_bus, get_audio_bus_layout, get_audio_info

### AnimationTree Tools (4)
- [x] Task 5.14: Implement animation tree tools
  - create_animation_tree, get_animation_tree_structure
  - set_tree_parameter, add_state_machine_state

### State Machine Tools (3)
- [x] Task 5.15: Implement state machine tools
  - remove_state_machine_state, add_state_machine_transition
  - remove_state_machine_transition

### Blend Tree Tools (1)
- [x] Task 5.16: Implement blend tree tools
  - set_blend_tree_node

### Analysis & Search Tools (4)
- [x] Task 5.17: Implement analysis tools
  - analyze_scene_complexity, analyze_signal_flow
  - find_unused_resources, get_project_statistics

### Testing & QA Tools (1)
- [x] Task 5.18: Implement testing tools
  - run_test_scenario

## Phase 6: Server Integration

- [x] Task 6.1: Create main MCP server entry point (index.ts)
  - Server initialization, tool registration
  - Mode support (Full, Lite, Minimal)

- [x] Task 6.2: Create CLI mode entry point (cli.ts)
  - Command parsing, direct execution
  - Help system

## Phase 7: Tool Registry & Mode Support

- [x] Task 7.1: Create tool registry
  - Tool definitions for all tools
  - Dynamic tool loading

- [x] Task 7.2: Implement mode filtering
  - Full mode: All tools
  - Lite mode: Essential tools
  - Minimal mode: Core tools

## Phase 8: Testing & Build

- [x] Task 8.1: Build TypeScript to JavaScript
  - Run tsc compilation
  - Verify output

- [x] Task 8.2: Create configuration files
  - settings.local.json example
  - .mcp.json configuration guide
