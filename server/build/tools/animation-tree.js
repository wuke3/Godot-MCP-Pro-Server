"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationTreeTools = void 0;
exports.animationTreeTools = {
    create_animation_tree: {
        name: "create_animation_tree",
        description: "Create an AnimationTree node",
        inputSchema: {
            type: "object",
            properties: {
                parent_path: { type: "string", description: "Parent node path", default: "." },
                name: { type: "string", description: "Node name" },
                tree_root_type: {
                    type: "string",
                    description: "Root node type",
                    enum: ["new", "state_machine", "blend_tree", "direct"],
                },
                anim_player_path: { type: "string", description: "AnimationPlayer path" },
            },
        },
    },
    get_animation_tree_structure: {
        name: "get_animation_tree_structure",
        description: "Get the AnimationTree structure",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationTree node path" },
            },
            required: ["node_path"],
        },
    },
    set_tree_parameter: {
        name: "set_tree_parameter",
        description: "Set an AnimationTree parameter",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationTree node path" },
                parameter: { type: "string", description: "Parameter path" },
                value: { description: "Parameter value" },
            },
            required: ["node_path", "parameter", "value"],
        },
    },
    add_state_machine_state: {
        name: "add_state_machine_state",
        description: "Add a state to an AnimationStateMachine",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationTree node path" },
                state_name: { type: "string", description: "State name" },
                animation: { type: "string", description: "Animation to play in this state" },
                position: {
                    type: "object",
                    description: "Position in editor (optional)",
                    properties: {
                        x: { type: "number" },
                        y: { type: "number" },
                    },
                },
            },
            required: ["node_path", "state_name"],
        },
    },
};
//# sourceMappingURL=animation-tree.js.map