"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sceneTools = void 0;
exports.sceneTools = {
    get_scene_tree: {
        name: "get_scene_tree",
        description: "Get live scene tree with hierarchy",
        inputSchema: {
            type: "object",
            properties: {
                max_depth: { type: "number", description: "Maximum tree depth (-1 for unlimited)" },
            },
        },
    },
    get_scene_file_content: {
        name: "get_scene_file_content",
        description: "Read raw .tscn file content",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Scene file path" },
            },
            required: ["path"],
        },
    },
    create_scene: {
        name: "create_scene",
        description: "Create a new scene file",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Save path for new scene" },
                root_type: { type: "string", description: "Root node type", default: "Node2D" },
                root_name: { type: "string", description: "Root node name" },
            },
            required: ["path"],
        },
    },
    open_scene: {
        name: "open_scene",
        description: "Open a scene in the editor",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Scene file path" },
            },
            required: ["path"],
        },
    },
    delete_scene: {
        name: "delete_scene",
        description: "Delete a scene file",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Scene file path to delete" },
            },
            required: ["path"],
        },
    },
    add_scene_instance: {
        name: "add_scene_instance",
        description: "Instance a scene as a child node",
        inputSchema: {
            type: "object",
            properties: {
                scene_path: { type: "string", description: "Path to scene to instance" },
                parent_path: { type: "string", description: "Parent node path", default: "." },
                name: { type: "string", description: "Instance name" },
            },
            required: ["scene_path"],
        },
    },
    play_scene: {
        name: "play_scene",
        description: "Run a scene (main, current, or custom path)",
        inputSchema: {
            type: "object",
            properties: {
                mode: {
                    type: "string",
                    description: "Play mode: main, current, or custom path",
                    enum: ["main", "current"],
                },
            },
        },
    },
    stop_scene: {
        name: "stop_scene",
        description: "Stop the currently running scene",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    save_scene: {
        name: "save_scene",
        description: "Save the current scene to disk",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Optional save path (uses current if not specified)" },
            },
        },
    },
    get_scene_exports: {
        name: "get_scene_exports",
        description: "Get exported properties from a scene",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Scene file path" },
            },
            required: ["path"],
        },
    },
};
//# sourceMappingURL=scene.js.map