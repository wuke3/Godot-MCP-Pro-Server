import { ToolDefinition } from "../protocol/mcp-types";

export const animationTools: Record<string, ToolDefinition> = {
  list_animations: { name: "list_animations", description: "List animations", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  create_animation: { name: "create_animation", description: "Create animation", inputSchema: { type: "object", properties: { node_path: { type: "string" }, name: { type: "string" }, length: { type: "number" } }, required: ["node_path", "name"] } },
  add_animation_track: { name: "add_animation_track", description: "Add track", inputSchema: { type: "object", properties: { node_path: { type: "string" }, animation: { type: "string" }, track_type: { type: "string" }, target_path: { type: "string" }, property: { type: "string" } }, required: ["node_path", "animation", "track_type"] } },
  set_animation_keyframe: { name: "set_animation_keyframe", description: "Set keyframe", inputSchema: { type: "object", properties: { node_path: { type: "string" }, animation: { type: "string" }, track_index: { type: "number" }, time: { type: "number" }, value: {} }, required: ["node_path", "animation", "track_index", "time", "value"] } },
  get_animation_info: { name: "get_animation_info", description: "Get animation info", inputSchema: { type: "object", properties: { node_path: { type: "string" }, animation: { type: "string" } }, required: ["node_path", "animation"] } },
  remove_animation: { name: "remove_animation", description: "Remove animation", inputSchema: { type: "object", properties: { node_path: { type: "string" }, name: { type: "string" } }, required: ["node_path", "name"] } },
};

export const tilemapTools: Record<string, ToolDefinition> = {
  tilemap_set_cell: { name: "tilemap_set_cell", description: "Set tile cell", inputSchema: { type: "object", properties: { node_path: { type: "string" }, x: { type: "number" }, y: { type: "number" }, tile_id: { type: "number" } }, required: ["node_path", "x", "y"] } },
  tilemap_fill_rect: { name: "tilemap_fill_rect", description: "Fill rect", inputSchema: { type: "object", properties: { node_path: { type: "string" }, x1: { type: "number" }, y1: { type: "number" }, x2: { type: "number" }, y2: { type: "number" }, tile_id: { type: "number" } }, required: ["node_path", "x1", "y1", "x2", "y2", "tile_id"] } },
  tilemap_get_cell: { name: "tilemap_get_cell", description: "Get cell", inputSchema: { type: "object", properties: { node_path: { type: "string" }, x: { type: "number" }, y: { type: "number" } }, required: ["node_path", "x", "y"] } },
  tilemap_clear: { name: "tilemap_clear", description: "Clear tiles", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  tilemap_get_info: { name: "tilemap_get_info", description: "Get TileMap info", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  tilemap_get_used_cells: { name: "tilemap_get_used_cells", description: "Get used cells", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
};

export const themeTools: Record<string, ToolDefinition> = {
  create_theme: { name: "create_theme", description: "Create theme", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  set_theme_color: { name: "set_theme_color", description: "Set color", inputSchema: { type: "object", properties: { node_path: { type: "string" }, color_type: { type: "string" }, color: { type: "object" } }, required: ["node_path", "color_type", "color"] } },
  set_theme_constant: { name: "set_theme_constant", description: "Set constant", inputSchema: { type: "object", properties: { node_path: { type: "string" }, constant_name: { type: "string" }, value: { type: "number" } }, required: ["node_path", "constant_name", "value"] } },
  set_theme_font_size: { name: "set_theme_font_size", description: "Set font size", inputSchema: { type: "object", properties: { node_path: { type: "string" }, font_type: { type: "string" }, size_name: { type: "string" }, size: { type: "number" } }, required: ["node_path", "font_type", "size_name", "size"] } },
  set_theme_stylebox: { name: "set_theme_stylebox", description: "Set stylebox", inputSchema: { type: "object", properties: { node_path: { type: "string" }, stylebox_type: { type: "string" }, bg_color: { type: "string" }, border_color: { type: "string" } }, required: ["node_path", "stylebox_type"] } },
  get_theme_info: { name: "get_theme_info", description: "Get theme info", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
};

export const profilingTools: Record<string, ToolDefinition> = {
  get_performance_monitors: { name: "get_performance_monitors", description: "Get performance", inputSchema: { type: "object", properties: {} } },
  get_editor_performance: { name: "get_editor_performance", description: "Get editor perf", inputSchema: { type: "object", properties: {} } },
};

export const batchTools: Record<string, ToolDefinition> = {
  find_nodes_by_type: { name: "find_nodes_by_type", description: "Find by type", inputSchema: { type: "object", properties: { type: { type: "string" } }, required: ["type"] } },
  find_signal_connections: { name: "find_signal_connections", description: "Find signals", inputSchema: { type: "object", properties: { node_path: { type: "string" } } } },
  batch_set_property: { name: "batch_set_property", description: "Batch set prop", inputSchema: { type: "object", properties: { type: { type: "string" }, property: { type: "string" }, value: {}, recursive: { type: "boolean" } }, required: ["type", "property", "value"] } },
  find_node_references: { name: "find_node_references", description: "Find references", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  get_scene_dependencies: { name: "get_scene_dependencies", description: "Get dependencies", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  cross_scene_set_property: { name: "cross_scene_set_property", description: "Cross-scene set", inputSchema: { type: "object", properties: { resource_path: { type: "string" }, property: { type: "string" }, value: {} }, required: ["resource_path", "property", "value"] } },
  find_script_references: { name: "find_script_references", description: "Find script refs", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  detect_circular_dependencies: { name: "detect_circular_dependencies", description: "Detect cycles", inputSchema: { type: "object", properties: {} } },
};

export const shaderTools: Record<string, ToolDefinition> = {
  create_shader: { name: "create_shader", description: "Create shader", inputSchema: { type: "object", properties: { path: { type: "string" }, shader_type: { type: "string" }, code: { type: "string" } }, required: ["path"] } },
  read_shader: { name: "read_shader", description: "Read shader", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  edit_shader: { name: "edit_shader", description: "Edit shader", inputSchema: { type: "object", properties: { path: { type: "string" }, find: { type: "string" }, replace: { type: "string" }, content: { type: "string" } }, required: ["path"] } },
  assign_shader_material: { name: "assign_shader_material", description: "Assign material", inputSchema: { type: "object", properties: { node_path: { type: "string" }, shader_path: { type: "string" } }, required: ["node_path", "shader_path"] } },
  set_shader_param: { name: "set_shader_param", description: "Set shader param", inputSchema: { type: "object", properties: { node_path: { type: "string" }, param: { type: "string" }, value: {} }, required: ["node_path", "param", "value"] } },
  get_shader_params: { name: "get_shader_params", description: "Get shader params", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
};

export const exportTools: Record<string, ToolDefinition> = {
  list_export_presets: { name: "list_export_presets", description: "List presets", inputSchema: { type: "object", properties: {} } },
  export_project: { name: "export_project", description: "Export project", inputSchema: { type: "object", properties: { preset: { type: "number" }, path: { type: "string" } }, required: ["preset"] } },
  get_export_info: { name: "get_export_info", description: "Get export info", inputSchema: { type: "object", properties: {} } },
};

export const resourceTools: Record<string, ToolDefinition> = {
  read_resource: { name: "read_resource", description: "Read resource", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  edit_resource: { name: "edit_resource", description: "Edit resource", inputSchema: { type: "object", properties: { path: { type: "string" }, properties: { type: "object" } }, required: ["path", "properties"] } },
  create_resource: { name: "create_resource", description: "Create resource", inputSchema: { type: "object", properties: { path: { type: "string" }, type: { type: "string" }, properties: { type: "object" } }, required: ["path", "type"] } },
  get_resource_preview: { name: "get_resource_preview", description: "Get preview", inputSchema: { type: "object", properties: { path: { type: "string" }, size: { type: "number" } }, required: ["path"] } },
  add_autoload: { name: "add_autoload", description: "Add autoload", inputSchema: { type: "object", properties: { name: { type: "string" }, path: { type: "string" } }, required: ["name", "path"] } },
  remove_autoload: { name: "remove_autoload", description: "Remove autoload", inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] } },
};

export const physicsTools: Record<string, ToolDefinition> = {
  setup_physics_body: { name: "setup_physics_body", description: "Setup physics", inputSchema: { type: "object", properties: { node_path: { type: "string" }, body_mode: { type: "string" }, mass: { type: "number" }, gravity_scale: { type: "number" } }, required: ["node_path"] } },
  setup_collision: { name: "setup_collision", description: "Setup collision", inputSchema: { type: "object", properties: { node_path: { type: "string" }, shape_type: { type: "string" }, size: { type: "object" } }, required: ["node_path", "shape_type"] } },
  set_physics_layers: { name: "set_physics_layers", description: "Set layers", inputSchema: { type: "object", properties: { node_path: { type: "string" }, layer: { type: "number" }, mask: { type: "number" } }, required: ["node_path"] } },
  get_physics_layers: { name: "get_physics_layers", description: "Get layers", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  get_collision_info: { name: "get_collision_info", description: "Get collision", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  add_raycast: { name: "add_raycast", description: "Add raycast", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, type: { type: "string" }, target_position: { type: "object" } }, required: ["type"] } },
};

export const scene3dTools: Record<string, ToolDefinition> = {
  add_mesh_instance: { name: "add_mesh_instance", description: "Add mesh", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, mesh_type: { type: "string" }, size: { type: "object" }, position: { type: "object" } } } },
  setup_camera_3d: { name: "setup_camera_3d", description: "Setup camera", inputSchema: { type: "object", properties: { node_path: { type: "string" }, fov: { type: "number" }, size: { type: "number" }, near: { type: "number" }, far: { type: "number" }, current: { type: "boolean" }, projection: { type: "string" } }, required: ["node_path"] } },
  setup_lighting: { name: "setup_lighting", description: "Setup lighting", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, light_type: { type: "string" }, color: { type: "string" }, energy: { type: "number" } }, required: ["light_type"] } },
  setup_environment: { name: "setup_environment", description: "Setup env", inputSchema: { type: "object", properties: { node_path: { type: "string" }, background_mode: { type: "string" }, background_color: { type: "string" } }, required: ["node_path"] } },
  add_gridmap: { name: "add_gridmap", description: "Add gridmap", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, cell_size: { type: "object" }, mesh_library_path: { type: "string" } } } },
  set_material_3d: { name: "set_material_3d", description: "Set material", inputSchema: { type: "object", properties: { node_path: { type: "string" }, albedo_color: { type: "string" }, metallic: { type: "number" }, roughness: { type: "number" } }, required: ["node_path"] } },
};

export const particleTools: Record<string, ToolDefinition> = {
  create_particles: { name: "create_particles", description: "Create particles", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, type: { type: "string" }, amount: { type: "number" } } } },
  set_particle_material: { name: "set_particle_material", description: "Set material", inputSchema: { type: "object", properties: { node_path: { type: "string" }, particle_color: { type: "string" }, velocity_min: { type: "number" }, velocity_max: { type: "number" }, direction: { type: "object" }, spread: { type: "number" }, gravity: { type: "object" } }, required: ["node_path"] } },
  set_particle_color_gradient: { name: "set_particle_color_gradient", description: "Set gradient", inputSchema: { type: "object", properties: { node_path: { type: "string" }, gradient: { type: "array" } }, required: ["node_path", "gradient"] } },
  apply_particle_preset: { name: "apply_particle_preset", description: "Apply preset", inputSchema: { type: "object", properties: { node_path: { type: "string" }, preset: { type: "string" } }, required: ["node_path", "preset"] } },
  get_particle_info: { name: "get_particle_info", description: "Get info", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
};

export const navigationTools: Record<string, ToolDefinition> = {
  setup_navigation_region: { name: "setup_navigation_region", description: "Setup nav region", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, navigation_layers: { type: "number" } } } },
  setup_navigation_agent: { name: "setup_navigation_agent", description: "Setup nav agent", inputSchema: { type: "object", properties: { node_path: { type: "string" }, pathfinding_algorithm: { type: "string" }, max_speed: { type: "number" } }, required: ["node_path"] } },
  bake_navigation_mesh: { name: "bake_navigation_mesh", description: "Bake nav mesh", inputSchema: { type: "object", properties: { node_path: { type: "string" }, cell_size: { type: "number" }, agent_radius: { type: "number" } }, required: ["node_path"] } },
  set_navigation_layers: { name: "set_navigation_layers", description: "Set nav layers", inputSchema: { type: "object", properties: { node_path: { type: "string" }, layers: { type: "number" } }, required: ["node_path"] } },
  get_navigation_info: { name: "get_navigation_info", description: "Get nav info", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
};

export const audioTools: Record<string, ToolDefinition> = {
  add_audio_player: { name: "add_audio_player", description: "Add audio player", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, type: { type: "string" }, stream_path: { type: "string" }, volume_db: { type: "number" }, bus: { type: "string" } } } },
  add_audio_bus: { name: "add_audio_bus", description: "Add audio bus", inputSchema: { type: "object", properties: { name: { type: "string" }, volume_db: { type: "number" } }, required: ["name"] } },
  add_audio_bus_effect: { name: "add_audio_bus_effect", description: "Add bus effect", inputSchema: { type: "object", properties: { bus_index: { type: "number" }, effect_type: { type: "string" }, enabled: { type: "boolean" }, properties: { type: "object" } }, required: ["bus_index", "effect_type"] } },
  set_audio_bus: { name: "set_audio_bus", description: "Set bus", inputSchema: { type: "object", properties: { bus_index: { type: "number" }, volume_db: { type: "number" }, mute: { type: "boolean" } }, required: ["bus_index"] } },
  get_audio_bus_layout: { name: "get_audio_bus_layout", description: "Get bus layout", inputSchema: { type: "object", properties: {} } },
  get_audio_info: { name: "get_audio_info", description: "Get audio info", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
};

export const animationTreeTools: Record<string, ToolDefinition> = {
  create_animation_tree: { name: "create_animation_tree", description: "Create AnimationTree", inputSchema: { type: "object", properties: { parent_path: { type: "string" }, name: { type: "string" }, tree_root_type: { type: "string" }, anim_player_path: { type: "string" } } } },
  get_animation_tree_structure: { name: "get_animation_tree_structure", description: "Get tree structure", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  set_tree_parameter: { name: "set_tree_parameter", description: "Set param", inputSchema: { type: "object", properties: { node_path: { type: "string" }, parameter: { type: "string" }, value: {} }, required: ["node_path", "parameter", "value"] } },
  add_state_machine_state: { name: "add_state_machine_state", description: "Add state", inputSchema: { type: "object", properties: { node_path: { type: "string" }, state_name: { type: "string" }, animation: { type: "string" }, position: { type: "object" } }, required: ["node_path", "state_name"] } },
};

export const stateMachineTools: Record<string, ToolDefinition> = {
  remove_state_machine_state: { name: "remove_state_machine_state", description: "Remove state", inputSchema: { type: "object", properties: { node_path: { type: "string" }, state_name: { type: "string" } }, required: ["node_path", "state_name"] } },
  add_state_machine_transition: { name: "add_state_machine_transition", description: "Add transition", inputSchema: { type: "object", properties: { node_path: { type: "string" }, from_state: { type: "string" }, to_state: { type: "string" }, advance_mode: { type: "string" } }, required: ["node_path", "from_state", "to_state"] } },
  remove_state_machine_transition: { name: "remove_state_machine_transition", description: "Remove transition", inputSchema: { type: "object", properties: { node_path: { type: "string" }, from_state: { type: "string" }, to_state: { type: "string" } }, required: ["node_path", "from_state", "to_state"] } },
};

export const blendTreeTools: Record<string, ToolDefinition> = {
  set_blend_tree_node: { name: "set_blend_tree_node", description: "Set blend node", inputSchema: { type: "object", properties: { node_path: { type: "string" }, node_name: { type: "string" }, node_type: { type: "string" }, position: { type: "object" }, properties: { type: "object" } }, required: ["node_path", "node_name", "node_type"] } },
};

export const analysisTools: Record<string, ToolDefinition> = {
  analyze_scene_complexity: { name: "analyze_scene_complexity", description: "Analyze scene", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  analyze_signal_flow: { name: "analyze_signal_flow", description: "Analyze signals", inputSchema: { type: "object", properties: { path: { type: "string" }, max_depth: { type: "number" } }, required: ["path"] } },
  find_unused_resources: { name: "find_unused_resources", description: "Find unused", inputSchema: { type: "object", properties: { path: { type: "string" } } } },
  get_project_statistics: { name: "get_project_statistics", description: "Get stats", inputSchema: { type: "object", properties: { path: { type: "string" } } } },
};

export const testTools: Record<string, ToolDefinition> = {
  run_test_scenario: { name: "run_test_scenario", description: "Run test", inputSchema: { type: "object", properties: { scenario_name: { type: "string" }, scenario_path: { type: "string" }, params: { type: "object" } }, required: ["scenario_name"] } },
};
