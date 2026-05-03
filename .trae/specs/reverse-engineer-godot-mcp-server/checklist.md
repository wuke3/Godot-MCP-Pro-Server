# Checklist

## Phase 1: Project Setup

- [x] package.json created with correct dependencies
- [x] tsconfig.json configured for TypeScript compilation
- [x] build/setup.js script functional
- [x] TypeScript compiles without errors

## Phase 2: MCP Protocol Layer

- [x] JSON-RPC 2.0 handler correctly parses requests/responses
- [x] Error codes (-32700, -32600, -32601, -32602, -32603, -32000, -32001) implemented
- [x] MCP protocol types properly defined

## Phase 3: WebSocket Communication

- [x] WebSocket client connects to Godot on ports 6505-6514
- [x] Multi-client connection handling works
- [x] Reconnection logic functional
- [x] Messages correctly serialized/deserialized

## Phase 4: Core Tool Categories

### Project Tools
- [x] get_project_info returns project metadata
- [x] get_filesystem_tree returns recursive directory structure
- [x] search_files performs fuzzy/glob matching
- [x] get_project_settings reads from project.godot
- [x] set_project_setting writes to project settings
- [x] uid_to_project_path converts UIDs correctly
- [x] project_path_to_uid converts paths correctly
- [x] add_autoload registers singleton
- [x] remove_autoload unregisters singleton

### Scene Tools
- [x] get_scene_tree returns live scene hierarchy
- [x] get_scene_file_content reads .tscn files
- [x] create_scene creates new scenes
- [x] open_scene opens scene in editor
- [x] delete_scene removes scene files
- [x] add_scene_instance instances scenes as children
- [x] play_scene runs scenes (main/current/custom)
- [x] stop_scene stops running scene
- [x] save_scene saves scenes to disk
- [x] get_scene_exports retrieves exported properties

### Node Tools
- [x] add_node creates nodes with type and properties
- [x] delete_node removes nodes with undo support
- [x] duplicate_node duplicates nodes recursively
- [x] move_node reparents nodes
- [x] update_property sets node properties
- [x] get_node_properties retrieves properties
- [x] add_resource adds resources to nodes
- [x] set_anchor_preset sets Control anchors
- [x] rename_node renames nodes
- [x] connect_signal connects signals
- [x] disconnect_signal disconnects signals
- [x] get_node_groups retrieves groups
- [x] set_node_groups sets groups
- [x] find_nodes_in_group finds nodes in group

### Script Tools
- [x] list_scripts lists all scripts
- [x] read_script reads script content
- [x] create_script creates scripts with templates
- [x] edit_script edits scripts (search/replace)
- [x] attach_script attaches scripts to nodes
- [x] get_open_scripts lists open scripts
- [x] validate_script validates GDScript syntax
- [x] search_in_files searches file contents

### Editor Tools
- [x] get_editor_errors retrieves errors
- [x] get_editor_screenshot captures editor viewport
- [x] get_game_screenshot captures game viewport
- [x] execute_editor_script runs GDScript in editor
- [x] clear_output clears output panel
- [x] get_signals lists node signals
- [x] reload_plugin reloads MCP plugin
- [x] reload_project rescans filesystem
- [x] get_output_log retrieves output content

### Input Tools
- [x] simulate_key simulates keyboard input
- [x] simulate_mouse_click simulates mouse clicks
- [x] simulate_mouse_move simulates mouse movement
- [x] simulate_action simulates Input actions
- [x] simulate_sequence sequences input events
- [x] get_input_actions lists input actions
- [x] set_input_action creates/modifies actions

### Runtime Tools
- [x] get_game_scene_tree returns running game tree
- [x] get_game_node_properties retrieves game node props
- [x] set_game_node_property sets game node props
- [x] execute_game_script runs GDScript in game
- [x] capture_frames captures multiple frames
- [x] monitor_properties records property values
- [x] start_recording starts input recording
- [x] stop_recording stops input recording
- [x] replay_recording replays recorded input
- [x] find_nodes_by_script finds nodes by script
- [x] get_autoload retrieves autoload properties
- [x] batch_get_properties batch retrieves props
- [x] find_ui_elements finds UI elements
- [x] click_button_by_text clicks buttons by text
- [x] wait_for_node waits for nodes
- [x] find_nearby_nodes finds nodes near position
- [x] navigate_to navigates to target
- [x] move_to walks character to target
- [x] watch_signals watches for signal emissions

## Phase 5: Additional Tool Categories

### Animation Tools
- [x] list_animations lists animations
- [x] create_animation creates animations
- [x] add_animation_track adds animation tracks
- [x] set_animation_keyframe sets keyframes
- [x] get_animation_info retrieves animation details
- [x] remove_animation removes animations

### TileMap Tools
- [x] tilemap_set_cell sets tile cells
- [x] tilemap_fill_rect fills regions
- [x] tilemap_get_cell gets cell data
- [x] tilemap_clear clears tiles
- [x] tilemap_get_info retrieves TileMap info
- [x] tilemap_get_used_cells lists used cells

### Theme & UI Tools
- [x] create_theme creates themes
- [x] set_theme_color sets color overrides
- [x] set_theme_constant sets constants
- [x] set_theme_font_size sets font sizes
- [x] set_theme_stylebox sets styleboxes
- [x] get_theme_info retrieves theme info

### Profiling Tools
- [x] get_performance_monitors returns performance data
- [x] get_editor_performance returns editor perf summary

### Batch & Refactoring Tools
- [x] find_nodes_by_type finds nodes by type
- [x] find_signal_connections finds signal connections
- [x] batch_set_property sets property batch
- [x] find_node_references finds references
- [x] get_scene_dependencies gets dependencies
- [x] cross_scene_set_property sets cross-scene props
- [x] find_script_references finds script refs
- [x] detect_circular_dependencies detects cycles

### Shader Tools
- [x] create_shader creates shaders
- [x] read_shader reads shaders
- [x] edit_shader edits shaders
- [x] assign_shader_material assigns materials
- [x] set_shader_param sets shader params
- [x] get_shader_params gets shader params

### Export Tools
- [x] list_export_presets lists presets
- [x] export_project exports project
- [x] get_export_info gets export info

### Resource Tools
- [x] read_resource reads .tres resources
- [x] edit_resource edits resource properties
- [x] create_resource creates new resources
- [x] get_resource_preview gets thumbnails
- [x] add_autoload registers autoloads
- [x] remove_autoload removes autoloads

### Physics Tools
- [x] setup_physics_body configures physics bodies
- [x] setup_collision adds collision shapes
- [x] set_physics_layers sets collision layers
- [x] get_physics_layers gets layer info
- [x] get_collision_info gets collision details
- [x] add_raycast adds raycast nodes

### 3D Scene Tools
- [x] add_mesh_instance adds meshes
- [x] setup_camera_3d configures cameras
- [x] setup_lighting configures lights
- [x] setup_environment configures environment
- [x] add_gridmap sets up gridmaps
- [x] set_material_3d sets materials

### Particle Tools
- [x] create_particles creates particle systems
- [x] set_particle_material configures materials
- [x] set_particle_color_gradient sets gradients
- [x] apply_particle_preset applies presets
- [x] get_particle_info gets particle info

### Navigation Tools
- [x] setup_navigation_region configures nav regions
- [x] setup_navigation_agent configures agents
- [x] bake_navigation_mesh bakes nav meshes
- [x] set_navigation_layers sets layers
- [x] get_navigation_info gets nav info

### Audio Tools
- [x] add_audio_player adds audio players
- [x] add_audio_bus adds audio buses
- [x] add_audio_bus_effect adds effects
- [x] set_audio_bus configures buses
- [x] get_audio_bus_layout gets layout
- [x] get_audio_info gets audio info

### AnimationTree Tools
- [x] create_animation_tree creates trees
- [x] get_animation_tree_structure gets structure
- [x] set_tree_parameter sets parameters
- [x] add_state_machine_state adds states

### State Machine Tools
- [x] remove_state_machine_state removes states
- [x] add_state_machine_transition adds transitions
- [x] remove_state_machine_transition removes transitions

### Blend Tree Tools
- [x] set_blend_tree_node configures blend nodes

### Analysis & Search Tools
- [x] analyze_scene_complexity analyzes scenes
- [x] analyze_signal_flow maps signal flow
- [x] find_unused_resources finds unused assets
- [x] get_project_statistics gets project stats

### Testing & QA Tools
- [x] run_test_scenario runs test scenarios

## Phase 6: Server Integration

- [x] MCP server initializes correctly
- [x] Tool registration completes
- [x] CLI mode parses commands
- [x] Help system works

## Phase 7: Mode Support

- [x] Full mode registers all 167 tools
- [x] Lite mode registers 80 tools
- [x] Minimal mode registers 35 tools
- [x] Mode filtering works correctly

## Phase 8: Build & Configuration

- [x] TypeScript compiles to JavaScript
- [x] Built files work correctly
- [x] Configuration examples provided
