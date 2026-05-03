import { ToolDefinition, ServerMode } from "../protocol/mcp-types";
import { projectTools } from "./project";
import { sceneTools } from "./scene";
import { nodeTools } from "./node";
import { scriptTools } from "./script";
import { editorTools } from "./editor";
import { inputTools } from "./input";
import { runtimeTools } from "./runtime";
import { animationTools } from "./animation";
import { tilemapTools } from "./tilemap";
import { themeTools } from "./theme";
import { profilingTools } from "./profiling";
import { batchTools } from "./batch";
import { shaderTools } from "./shader";
import { exportTools } from "./export";
import { resourceTools } from "./resource";
import { physicsTools } from "./physics";
import { scene3dTools } from "./scene3d";
import { particleTools } from "./particle";
import { navigationTools } from "./navigation";
import { audioTools } from "./audio";
import { animationTreeTools } from "./animation-tree";
import { stateMachineTools } from "./state-machine";
import { blendTreeTools } from "./blend-tree";
import { analysisTools } from "./analysis";
import { testTools } from "./test";

const ALL_TOOLS: Record<string, ToolDefinition> = {
  ...projectTools,
  ...sceneTools,
  ...nodeTools,
  ...scriptTools,
  ...editorTools,
  ...inputTools,
  ...runtimeTools,
  ...animationTools,
  ...tilemapTools,
  ...themeTools,
  ...profilingTools,
  ...batchTools,
  ...shaderTools,
  ...exportTools,
  ...resourceTools,
  ...physicsTools,
  ...scene3dTools,
  ...particleTools,
  ...navigationTools,
  ...audioTools,
  ...animationTreeTools,
  ...stateMachineTools,
  ...blendTreeTools,
  ...analysisTools,
  ...testTools,
};

const LITE_MODE_TOOLS = new Set([
  ...Object.keys(projectTools),
  ...Object.keys(sceneTools),
  ...Object.keys(nodeTools),
  ...Object.keys(scriptTools),
  ...Object.keys(editorTools),
  ...Object.keys(inputTools),
  ...Object.keys(runtimeTools),
]);

const MINIMAL_MODE_TOOLS = new Set([
  "get_project_info",
  "get_filesystem_tree",
  "get_scene_tree",
  "open_scene",
  "save_scene",
  "add_node",
  "delete_node",
  "duplicate_node",
  "rename_node",
  "update_property",
  "get_node_properties",
  "read_script",
  "create_script",
  "edit_script",
  "get_editor_errors",
  "execute_editor_script",
  "simulate_key",
  "simulate_mouse_click",
  "simulate_action",
  "get_game_scene_tree",
  "get_game_node_properties",
  "set_game_node_property",
  "get_input_actions",
  "search_in_files",
  "get_scene_file_content",
  "search_files",
  "get_project_settings",
  "get_scene_exports",
  "play_scene",
  "stop_scene",
  "get_open_scripts",
  "clear_output",
  "get_output_log",
  "get_signals",
  "reload_project",
  "find_nodes_in_group",
  "find_nodes_by_type",
  "move_node",
  "batch_set_property",
  "list_scripts",
  "validate_script",
  "attach_script",
  "add_scene_instance",
  "create_scene",
  "delete_scene",
  "list_animations",
  "create_animation",
  "get_animation_info",
  "get_performance_monitors",
  "set_game_node_property",
  "execute_game_script",
  "monitor_properties",
  "find_ui_elements",
]);

export function getTools(mode: ServerMode = "full"): Record<string, ToolDefinition> {
  switch (mode) {
    case "lite":
      return filterTools(LITE_MODE_TOOLS);
    case "minimal":
      return filterTools(MINIMAL_MODE_TOOLS);
    case "full":
    default:
      return ALL_TOOLS;
  }
}

function filterTools(toolNames: Set<string>): Record<string, ToolDefinition> {
  const filtered: Record<string, ToolDefinition> = {};
  for (const name of toolNames) {
    if (ALL_TOOLS[name]) {
      filtered[name] = ALL_TOOLS[name];
    }
  }
  return filtered;
}

export function getToolCount(mode: ServerMode = "full"): number {
  return Object.keys(getTools(mode)).length;
}

export function getToolByName(name: string): ToolDefinition | undefined {
  return ALL_TOOLS[name];
}

export {
  ALL_TOOLS,
  projectTools,
  sceneTools,
  nodeTools,
  scriptTools,
  editorTools,
  inputTools,
  runtimeTools,
  animationTools,
  tilemapTools,
  themeTools,
  profilingTools,
  batchTools,
  shaderTools,
  exportTools,
  resourceTools,
  physicsTools,
  scene3dTools,
  particleTools,
  navigationTools,
  audioTools,
  animationTreeTools,
  stateMachineTools,
  blendTreeTools,
  analysisTools,
  testTools,
};
