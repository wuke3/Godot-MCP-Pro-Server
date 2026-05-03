"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTools = exports.analysisTools = exports.blendTreeTools = exports.stateMachineTools = exports.animationTreeTools = exports.audioTools = exports.navigationTools = exports.particleTools = exports.scene3dTools = exports.physicsTools = exports.resourceTools = exports.exportTools = exports.shaderTools = exports.batchTools = exports.profilingTools = exports.themeTools = exports.tilemapTools = exports.animationTools = exports.runtimeTools = exports.inputTools = exports.editorTools = exports.scriptTools = exports.nodeTools = exports.sceneTools = exports.projectTools = exports.ALL_TOOLS = void 0;
exports.getTools = getTools;
exports.getToolCount = getToolCount;
exports.getToolByName = getToolByName;
const project_1 = require("./project");
Object.defineProperty(exports, "projectTools", { enumerable: true, get: function () { return project_1.projectTools; } });
const scene_1 = require("./scene");
Object.defineProperty(exports, "sceneTools", { enumerable: true, get: function () { return scene_1.sceneTools; } });
const node_1 = require("./node");
Object.defineProperty(exports, "nodeTools", { enumerable: true, get: function () { return node_1.nodeTools; } });
const script_1 = require("./script");
Object.defineProperty(exports, "scriptTools", { enumerable: true, get: function () { return script_1.scriptTools; } });
const editor_1 = require("./editor");
Object.defineProperty(exports, "editorTools", { enumerable: true, get: function () { return editor_1.editorTools; } });
const input_1 = require("./input");
Object.defineProperty(exports, "inputTools", { enumerable: true, get: function () { return input_1.inputTools; } });
const runtime_1 = require("./runtime");
Object.defineProperty(exports, "runtimeTools", { enumerable: true, get: function () { return runtime_1.runtimeTools; } });
const animation_1 = require("./animation");
Object.defineProperty(exports, "animationTools", { enumerable: true, get: function () { return animation_1.animationTools; } });
const tilemap_1 = require("./tilemap");
Object.defineProperty(exports, "tilemapTools", { enumerable: true, get: function () { return tilemap_1.tilemapTools; } });
const theme_1 = require("./theme");
Object.defineProperty(exports, "themeTools", { enumerable: true, get: function () { return theme_1.themeTools; } });
const profiling_1 = require("./profiling");
Object.defineProperty(exports, "profilingTools", { enumerable: true, get: function () { return profiling_1.profilingTools; } });
const batch_1 = require("./batch");
Object.defineProperty(exports, "batchTools", { enumerable: true, get: function () { return batch_1.batchTools; } });
const shader_1 = require("./shader");
Object.defineProperty(exports, "shaderTools", { enumerable: true, get: function () { return shader_1.shaderTools; } });
const export_1 = require("./export");
Object.defineProperty(exports, "exportTools", { enumerable: true, get: function () { return export_1.exportTools; } });
const resource_1 = require("./resource");
Object.defineProperty(exports, "resourceTools", { enumerable: true, get: function () { return resource_1.resourceTools; } });
const physics_1 = require("./physics");
Object.defineProperty(exports, "physicsTools", { enumerable: true, get: function () { return physics_1.physicsTools; } });
const scene3d_1 = require("./scene3d");
Object.defineProperty(exports, "scene3dTools", { enumerable: true, get: function () { return scene3d_1.scene3dTools; } });
const particle_1 = require("./particle");
Object.defineProperty(exports, "particleTools", { enumerable: true, get: function () { return particle_1.particleTools; } });
const navigation_1 = require("./navigation");
Object.defineProperty(exports, "navigationTools", { enumerable: true, get: function () { return navigation_1.navigationTools; } });
const audio_1 = require("./audio");
Object.defineProperty(exports, "audioTools", { enumerable: true, get: function () { return audio_1.audioTools; } });
const animation_tree_1 = require("./animation-tree");
Object.defineProperty(exports, "animationTreeTools", { enumerable: true, get: function () { return animation_tree_1.animationTreeTools; } });
const state_machine_1 = require("./state-machine");
Object.defineProperty(exports, "stateMachineTools", { enumerable: true, get: function () { return state_machine_1.stateMachineTools; } });
const blend_tree_1 = require("./blend-tree");
Object.defineProperty(exports, "blendTreeTools", { enumerable: true, get: function () { return blend_tree_1.blendTreeTools; } });
const analysis_1 = require("./analysis");
Object.defineProperty(exports, "analysisTools", { enumerable: true, get: function () { return analysis_1.analysisTools; } });
const test_1 = require("./test");
Object.defineProperty(exports, "testTools", { enumerable: true, get: function () { return test_1.testTools; } });
const ALL_TOOLS = {
    ...project_1.projectTools,
    ...scene_1.sceneTools,
    ...node_1.nodeTools,
    ...script_1.scriptTools,
    ...editor_1.editorTools,
    ...input_1.inputTools,
    ...runtime_1.runtimeTools,
    ...animation_1.animationTools,
    ...tilemap_1.tilemapTools,
    ...theme_1.themeTools,
    ...profiling_1.profilingTools,
    ...batch_1.batchTools,
    ...shader_1.shaderTools,
    ...export_1.exportTools,
    ...resource_1.resourceTools,
    ...physics_1.physicsTools,
    ...scene3d_1.scene3dTools,
    ...particle_1.particleTools,
    ...navigation_1.navigationTools,
    ...audio_1.audioTools,
    ...animation_tree_1.animationTreeTools,
    ...state_machine_1.stateMachineTools,
    ...blend_tree_1.blendTreeTools,
    ...analysis_1.analysisTools,
    ...test_1.testTools,
};
exports.ALL_TOOLS = ALL_TOOLS;
const LITE_MODE_TOOLS = new Set([
    ...Object.keys(project_1.projectTools),
    ...Object.keys(scene_1.sceneTools),
    ...Object.keys(node_1.nodeTools),
    ...Object.keys(script_1.scriptTools),
    ...Object.keys(editor_1.editorTools),
    ...Object.keys(input_1.inputTools),
    ...Object.keys(runtime_1.runtimeTools),
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
function getTools(mode = "full") {
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
function filterTools(toolNames) {
    const filtered = {};
    for (const name of toolNames) {
        if (ALL_TOOLS[name]) {
            filtered[name] = ALL_TOOLS[name];
        }
    }
    return filtered;
}
function getToolCount(mode = "full") {
    return Object.keys(getTools(mode)).length;
}
function getToolByName(name) {
    return ALL_TOOLS[name];
}
//# sourceMappingURL=index.js.map