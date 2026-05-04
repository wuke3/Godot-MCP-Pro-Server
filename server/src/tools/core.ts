import { ToolDefinition } from "../protocol/mcp-types";

export const projectTools: Record<string, ToolDefinition> = {
  get_project_info: { name: "get_project_info", description: "Get project metadata", inputSchema: { type: "object", properties: {} } },
  get_filesystem_tree: { name: "get_filesystem_tree", description: "Get recursive file tree", inputSchema: { type: "object", properties: { path: { type: "string" }, filter: { type: "string" }, max_depth: { type: "number" } } } },
  search_files: { name: "search_files", description: "Search files with fuzzy matching", inputSchema: { type: "object", properties: { query: { type: "string" }, path: { type: "string" }, file_type: { type: "string" }, max_results: { type: "number" } }, required: ["query"] } },
  get_project_settings: { name: "get_project_settings", description: "Read project.godot settings", inputSchema: { type: "object", properties: { section: { type: "string" }, key: { type: "string" } } } },
  set_project_setting: { name: "set_project_setting", description: "Set project setting", inputSchema: { type: "object", properties: { key: { type: "string" }, value: { type: "string" } }, required: ["key", "value"] } },
  uid_to_project_path: { name: "uid_to_project_path", description: "Convert UID to project path", inputSchema: { type: "object", properties: { uid: { type: "string" } }, required: ["uid"] } },
  project_path_to_uid: { name: "project_path_to_uid", description: "Convert project path to UID", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  add_autoload: { name: "add_autoload", description: "Register autoload singleton", inputSchema: { type: "object", properties: { name: { type: "string" }, path: { type: "string" } }, required: ["name", "path"] } },
  remove_autoload: { name: "remove_autoload", description: "Remove autoload singleton", inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] } },
};

export const sceneTools: Record<string, ToolDefinition> = {
  get_scene_tree: { name: "get_scene_tree", description: "Get live scene tree", inputSchema: { type: "object", properties: { max_depth: { type: "number" } } } },
  get_scene_file_content: { name: "get_scene_file_content", description: "Read .tscn file content", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  create_scene: { name: "create_scene", description: "Create new scene file", inputSchema: { type: "object", properties: { path: { type: "string" }, root_type: { type: "string" }, root_name: { type: "string" } }, required: ["path"] } },
  open_scene: { name: "open_scene", description: "Open scene in editor", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  delete_scene: { name: "delete_scene", description: "Delete scene file", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  add_scene_instance: { name: "add_scene_instance", description: "Instance scene as child", inputSchema: { type: "object", properties: { scene_path: { type: "string" }, parent_path: { type: "string" }, name: { type: "string" } }, required: ["scene_path"] } },
  play_scene: { name: "play_scene", description: "Run scene", inputSchema: { type: "object", properties: { mode: { type: "string", enum: ["main", "current"] } } } },
  stop_scene: { name: "stop_scene", description: "Stop running scene", inputSchema: { type: "object", properties: {} } },
  save_scene: { name: "save_scene", description: "Save scene to disk", inputSchema: { type: "object", properties: { path: { type: "string" } } } },
  get_scene_exports: { name: "get_scene_exports", description: "Get scene exports", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
};

export const nodeTools: Record<string, ToolDefinition> = {
  add_node: { name: "add_node", description: "Add new node", inputSchema: { type: "object", properties: { type: { type: "string" }, parent_path: { type: "string" }, name: { type: "string" }, properties: { type: "object" } }, required: ["type"] } },
  delete_node: { name: "delete_node", description: "Delete node", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  duplicate_node: { name: "duplicate_node", description: "Duplicate node", inputSchema: { type: "object", properties: { node_path: { type: "string" }, name: { type: "string" } }, required: ["node_path"] } },
  move_node: { name: "move_node", description: "Move/reparent node", inputSchema: { type: "object", properties: { node_path: { type: "string" }, new_parent_path: { type: "string" } }, required: ["node_path", "new_parent_path"] } },
  update_property: { name: "update_property", description: "Set node property", inputSchema: { type: "object", properties: { node_path: { type: "string" }, property: { type: "string" }, value: {} }, required: ["node_path", "property", "value"] } },
  get_node_properties: { name: "get_node_properties", description: "Get node properties", inputSchema: { type: "object", properties: { node_path: { type: "string" }, category: { type: "string" } }, required: ["node_path"] } },
  add_resource: { name: "add_resource", description: "Add resource to node", inputSchema: { type: "object", properties: { node_path: { type: "string" }, property: { type: "string" }, resource_type: { type: "string" }, resource_properties: { type: "object" } }, required: ["node_path", "property", "resource_type"] } },
  set_anchor_preset: { name: "set_anchor_preset", description: "Set Control anchor", inputSchema: { type: "object", properties: { node_path: { type: "string" }, preset: { type: "string" }, keep_offsets: { type: "boolean" } }, required: ["node_path", "preset"] } },
  rename_node: { name: "rename_node", description: "Rename node", inputSchema: { type: "object", properties: { node_path: { type: "string" }, new_name: { type: "string" } }, required: ["node_path", "new_name"] } },
  connect_signal: { name: "connect_signal", description: "Connect signal", inputSchema: { type: "object", properties: { node_path: { type: "string" }, signal: { type: "string" }, target_path: { type: "string" }, method: { type: "string" } }, required: ["node_path", "signal", "target_path", "method"] } },
  disconnect_signal: { name: "disconnect_signal", description: "Disconnect signal", inputSchema: { type: "object", properties: { node_path: { type: "string" }, signal: { type: "string" }, target_path: { type: "string" }, method: { type: "string" } }, required: ["node_path", "signal", "target_path", "method"] } },
  get_node_groups: { name: "get_node_groups", description: "Get node groups", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  set_node_groups: { name: "set_node_groups", description: "Set node groups", inputSchema: { type: "object", properties: { node_path: { type: "string" }, add: { type: "array", items: { type: "string" } }, remove: { type: "array", items: { type: "string" } } }, required: ["node_path"] } },
  find_nodes_in_group: { name: "find_nodes_in_group", description: "Find nodes in group", inputSchema: { type: "object", properties: { group: { type: "string" } }, required: ["group"] } },
};

export const scriptTools: Record<string, ToolDefinition> = {
  list_scripts: { name: "list_scripts", description: "List all scripts", inputSchema: { type: "object", properties: { path: { type: "string" } } } },
  read_script: { name: "read_script", description: "Read script content", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } },
  create_script: { name: "create_script", description: "Create new script", inputSchema: { type: "object", properties: { path: { type: "string" }, class_name: { type: "string" }, extends: { type: "string" }, template: { type: "string" } }, required: ["path"] } },
  edit_script: { name: "edit_script", description: "Edit script", inputSchema: { type: "object", properties: { path: { type: "string" }, find: { type: "string" }, replace: { type: "string" }, content: { type: "string" } }, required: ["path"] } },
  attach_script: { name: "attach_script", description: "Attach script to node", inputSchema: { type: "object", properties: { node_path: { type: "string" }, script_path: { type: "string" } }, required: ["node_path", "script_path"] } },
  get_open_scripts: { name: "get_open_scripts", description: "List open scripts", inputSchema: { type: "object", properties: {} } },
  validate_script: { name: "validate_script", description: "Validate GDScript", inputSchema: { type: "object", properties: { path: { type: "string" }, content: { type: "string" } } } },
  search_in_files: { name: "search_in_files", description: "Search file contents", inputSchema: { type: "object", properties: { query: { type: "string" }, path: { type: "string" }, regex: { type: "boolean" }, file_type: { type: "string" }, max_results: { type: "number" } }, required: ["query"] } },
};

export const editorTools: Record<string, ToolDefinition> = {
  get_editor_errors: { name: "get_editor_errors", description: "Get editor errors", inputSchema: { type: "object", properties: {} } },
  get_editor_screenshot: { name: "get_editor_screenshot", description: "Capture editor viewport", inputSchema: { type: "object", properties: { path: { type: "string" } } } },
  get_game_screenshot: { name: "get_game_screenshot", description: "Capture game viewport", inputSchema: { type: "object", properties: { path: { type: "string" }, half_resolution: { type: "boolean" } } } },
  execute_editor_script: { name: "execute_editor_script", description: "Execute GDScript in editor", inputSchema: { type: "object", properties: { code: { type: "string" } }, required: ["code"] } },
  clear_output: { name: "clear_output", description: "Clear output panel", inputSchema: { type: "object", properties: {} } },
  get_signals: { name: "get_signals", description: "Get node signals", inputSchema: { type: "object", properties: { node_path: { type: "string" } }, required: ["node_path"] } },
  reload_plugin: { name: "reload_plugin", description: "Reload MCP plugin", inputSchema: { type: "object", properties: {} } },
  reload_project: { name: "reload_project", description: "Rescan filesystem", inputSchema: { type: "object", properties: {} } },
  get_output_log: { name: "get_output_log", description: "Get output log", inputSchema: { type: "object", properties: { clear: { type: "boolean" } } } },
};

export const inputTools: Record<string, ToolDefinition> = {
  simulate_key: { name: "simulate_key", description: "Simulate keyboard", inputSchema: { type: "object", properties: { keycode: { type: "string" }, pressed: { type: "boolean" }, shift: { type: "boolean" }, ctrl: { type: "boolean" }, alt: { type: "boolean" } }, required: ["keycode"] } },
  simulate_mouse_click: { name: "simulate_mouse_click", description: "Simulate mouse click", inputSchema: { type: "object", properties: { x: { type: "number" }, y: { type: "number" }, button: { type: "number" }, pressed: { type: "boolean" }, double_click: { type: "boolean" } }, required: ["x", "y"] } },
  simulate_mouse_move: { name: "simulate_mouse_move", description: "Simulate mouse move", inputSchema: { type: "object", properties: { x: { type: "number" }, y: { type: "number" }, relative_x: { type: "number" }, relative_y: { type: "number" }, button_mask: { type: "number" } }, required: ["x", "y"] } },
  simulate_action: { name: "simulate_action", description: "Simulate Input action", inputSchema: { type: "object", properties: { action: { type: "string" }, pressed: { type: "boolean" }, strength: { type: "number" } }, required: ["action"] } },
  simulate_sequence: { name: "simulate_sequence", description: "Sequence input events", inputSchema: { type: "object", properties: { sequence_events: { type: "array" }, frame_delay: { type: "number" } }, required: ["sequence_events"] } },
  get_input_actions: { name: "get_input_actions", description: "List input actions", inputSchema: { type: "object", properties: {} } },
  set_input_action: { name: "set_input_action", description: "Create/modify action", inputSchema: { type: "object", properties: { action: { type: "string" }, events: { type: "array" } }, required: ["action"] } },
};

export const runtimeTools: Record<string, ToolDefinition> = {
  get_game_scene_tree: { name: "get_game_scene_tree", description: "Get game scene tree", inputSchema: { type: "object", properties: { max_depth: { type: "number" }, script_filter: { type: "string" }, type_filter: { type: "string" }, named_only: { type: "boolean" } } } },
  get_game_node_properties: { name: "get_game_node_properties", description: "Get game node props", inputSchema: { type: "object", properties: { node_path: { type: "string" }, properties: { type: "array", items: { type: "string" } } }, required: ["node_path"] } },
  set_game_node_property: { name: "set_game_node_property", description: "Set game node prop", inputSchema: { type: "object", properties: { node_path: { type: "string" }, property: { type: "string" }, value: {} }, required: ["node_path", "property", "value"] } },
  execute_game_script: { name: "execute_game_script", description: "Execute GDScript in game", inputSchema: { type: "object", properties: { code: { type: "string" } }, required: ["code"] } },
  capture_frames: { name: "capture_frames", description: "Capture frames", inputSchema: { type: "object", properties: { count: { type: "number" }, frame_interval: { type: "number" }, half_resolution: { type: "boolean" }, node_data: { type: "object" } } } },
  monitor_properties: { name: "monitor_properties", description: "Monitor properties", inputSchema: { type: "object", properties: { node_path: { type: "string" }, properties: { type: "array", items: { type: "string" } }, frame_count: { type: "number" }, frame_interval: { type: "number" } }, required: ["node_path", "properties"] } },
  start_recording: { name: "start_recording", description: "Start recording", inputSchema: { type: "object", properties: {} } },
  stop_recording: { name: "stop_recording", description: "Stop recording", inputSchema: { type: "object", properties: {} } },
  replay_recording: { name: "replay_recording", description: "Replay recording", inputSchema: { type: "object", properties: { events: { type: "array" }, speed: { type: "number" } }, required: ["events"] } },
  find_nodes_by_script: { name: "find_nodes_by_script", description: "Find nodes by script", inputSchema: { type: "object", properties: { script: { type: "string" }, properties: { type: "array", items: { type: "string" } } }, required: ["script"] } },
  get_autoload: { name: "get_autoload", description: "Get autoload props", inputSchema: { type: "object", properties: { name: { type: "string" }, properties: { type: "array", items: { type: "string" } } }, required: ["name"] } },
  batch_get_properties: { name: "batch_get_properties", description: "Batch get props", inputSchema: { type: "object", properties: { nodes: { type: "array" } }, required: ["nodes"] } },
  find_ui_elements: { name: "find_ui_elements", description: "Find UI elements", inputSchema: { type: "object", properties: { type_filter: { type: "string" } } } },
  click_button_by_text: { name: "click_button_by_text", description: "Click button by text", inputSchema: { type: "object", properties: { text: { type: "string" }, partial: { type: "boolean" } }, required: ["text"] } },
  wait_for_node: { name: "wait_for_node", description: "Wait for node", inputSchema: { type: "object", properties: { node_path: { type: "string" }, timeout: { type: "number" }, poll_frames: { type: "number" } }, required: ["node_path"] } },
  find_nearby_nodes: { name: "find_nearby_nodes", description: "Find nearby nodes", inputSchema: { type: "object", properties: { position: { type: "object" }, radius: { type: "number" }, type_filter: { type: "string" }, group_filter: { type: "string" }, max_results: { type: "number" } }, required: ["position"] } },
  navigate_to: { name: "navigate_to", description: "Navigate to target", inputSchema: { type: "object", properties: { target: { type: "object" }, player_path: { type: "string" }, camera_path: { type: "string" }, move_speed: { type: "number" } }, required: ["target"] } },
  move_to: { name: "move_to", description: "Walk to target", inputSchema: { type: "object", properties: { target: { type: "object" }, player_path: { type: "string" }, camera_path: { type: "string" }, arrival_radius: { type: "number" }, timeout: { type: "number" }, run: { type: "boolean" }, look_at_target: { type: "boolean" } }, required: ["target"] } },
  watch_signals: { name: "watch_signals", description: "Watch signals", inputSchema: { type: "object", properties: { node_paths: { type: "array", items: { type: "string" } }, signal_filter: { type: "array", items: { type: "string" } }, duration_ms: { type: "number" } }, required: ["node_paths"] } },
};
