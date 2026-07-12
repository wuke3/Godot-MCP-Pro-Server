import { ToolDefinition, ServerMode } from "../protocol/mcp-types";
import { projectTools, sceneTools, nodeTools, scriptTools, editorTools, inputTools, runtimeTools } from "./core";
import { animationTools, tilemapTools, themeTools, profilingTools, batchTools, shaderTools, exportTools, resourceTools, physicsTools, scene3dTools, particleTools, navigationTools, audioTools, animationTreeTools, stateMachineTools, blendTreeTools, analysisTools, testTools, inputMapTools, androidTools } from "./additional";

const ALL_TOOLS: Record<string, ToolDefinition> = {
  ...projectTools, ...sceneTools, ...nodeTools, ...scriptTools,
  ...editorTools, ...inputTools, ...inputMapTools, ...runtimeTools,
  ...animationTools, ...tilemapTools, ...themeTools, ...profilingTools,
  ...batchTools, ...shaderTools, ...exportTools, ...resourceTools,
  ...physicsTools, ...scene3dTools, ...particleTools, ...navigationTools,
  ...audioTools, ...animationTreeTools, ...stateMachineTools, ...blendTreeTools,
  ...analysisTools, ...testTools, ...androidTools,
};

const _3D_TOOLS = new Set([
  ...Object.keys(projectTools), ...Object.keys(sceneTools), ...Object.keys(nodeTools),
  ...Object.keys(scriptTools), ...Object.keys(editorTools), ...Object.keys(inputTools),
  ...Object.keys(inputMapTools), ...Object.keys(runtimeTools), ...Object.keys(physicsTools),
  ...Object.keys(scene3dTools), ...Object.keys(navigationTools), ...Object.keys(animationTools),
  ...Object.keys(animationTreeTools), ...Object.keys(stateMachineTools), ...Object.keys(blendTreeTools),
  ...Object.keys(particleTools), ...Object.keys(profilingTools), ...Object.keys(batchTools),
  ...Object.keys(analysisTools),
]);

const LITE_TOOLS = new Set([
  ...Object.keys(projectTools), ...Object.keys(sceneTools), ...Object.keys(nodeTools),
  ...Object.keys(scriptTools), ...Object.keys(editorTools), ...Object.keys(inputTools),
  ...Object.keys(inputMapTools), ...Object.keys(runtimeTools),
]);

const MINIMAL_TOOLS = new Set([
  "get_project_info", "get_scene_tree", "open_scene", "save_scene",
  "add_node", "delete_node", "rename_node", "update_property", "get_node_properties",
  "read_script", "create_script", "get_editor_errors", "execute_editor_script",
  "simulate_key", "simulate_mouse_click", "get_game_scene_tree", "get_game_node_properties",
  "play_scene", "stop_scene", "get_filesystem_tree", "search_files",
  "get_project_settings", "attach_script", "validate_script",
  "get_editor_selection", "select_nodes", "get_output_log",
  "simulate_action", "get_input_actions",
  "execute_game_script", "find_nodes_by_script", "get_autoload",
  "find_ui_elements", "click_button_by_text", "wait_for_node",
]);

export function getTools(mode: ServerMode = "full"): Record<string, ToolDefinition> {
  switch (mode) {
    case "3d": return filterTools(_3D_TOOLS);
    case "lite": return filterTools(LITE_TOOLS);
    case "minimal": return filterTools(MINIMAL_TOOLS);
    default: return ALL_TOOLS;
  }
}

function filterTools(names: Set<string>): Record<string, ToolDefinition> {
  const result: Record<string, ToolDefinition> = {};
  for (const name of names) {
    if (ALL_TOOLS[name]) result[name] = ALL_TOOLS[name];
  }
  return result;
}

export function getToolCount(mode: ServerMode = "full"): number {
  return Object.keys(getTools(mode)).length;
}

export function getToolByName(name: string): ToolDefinition | undefined {
  return ALL_TOOLS[name];
}

export { ALL_TOOLS };
