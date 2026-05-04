import { ToolDefinition, ServerMode } from "../protocol/mcp-types";
import { projectTools, sceneTools, nodeTools, scriptTools, editorTools, inputTools, runtimeTools } from "./core";
import { animationTools, tilemapTools, themeTools, profilingTools, batchTools, shaderTools, exportTools, resourceTools, physicsTools, scene3dTools, particleTools, navigationTools, audioTools, animationTreeTools, stateMachineTools, blendTreeTools, analysisTools, testTools } from "./additional";

const ALL_TOOLS: Record<string, ToolDefinition> = {
  ...projectTools, ...sceneTools, ...nodeTools, ...scriptTools,
  ...editorTools, ...inputTools, ...runtimeTools, ...animationTools,
  ...tilemapTools, ...themeTools, ...profilingTools, ...batchTools,
  ...shaderTools, ...exportTools, ...resourceTools, ...physicsTools,
  ...scene3dTools, ...particleTools, ...navigationTools, ...audioTools,
  ...animationTreeTools, ...stateMachineTools, ...blendTreeTools,
  ...analysisTools, ...testTools,
};

const LITE_TOOLS = new Set([
  ...Object.keys(projectTools), ...Object.keys(sceneTools), ...Object.keys(nodeTools),
  ...Object.keys(scriptTools), ...Object.keys(editorTools), ...Object.keys(inputTools),
  ...Object.keys(runtimeTools),
]);

const MINIMAL_TOOLS = new Set([
  "get_project_info", "get_scene_tree", "open_scene", "save_scene",
  "add_node", "delete_node", "rename_node", "update_property", "get_node_properties",
  "read_script", "create_script", "get_editor_errors", "execute_editor_script",
  "simulate_key", "simulate_mouse_click", "get_game_scene_tree", "get_game_node_properties",
]);

export function getTools(mode: ServerMode = "full"): Record<string, ToolDefinition> {
  switch (mode) {
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
