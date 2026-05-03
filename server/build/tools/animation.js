"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationTools = void 0;
exports.animationTools = {
    list_animations: {
        name: "list_animations",
        description: "List all animations in an AnimationPlayer",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationPlayer node path" },
            },
            required: ["node_path"],
        },
    },
    create_animation: {
        name: "create_animation",
        description: "Create a new animation",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationPlayer node path" },
                name: { type: "string", description: "Animation name" },
                length: { type: "number", description: "Animation length in seconds", default: 1.0 },
            },
            required: ["node_path", "name"],
        },
    },
    add_animation_track: {
        name: "add_animation_track",
        description: "Add a track to an animation",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationPlayer node path" },
                animation: { type: "string", description: "Animation name" },
                track_type: {
                    type: "string",
                    description: "Track type",
                    enum: ["value", "position", "rotation", "scale", "method", "bezier"],
                },
                target_path: { type: "string", description: "Target node path for the track" },
                property: { type: "string", description: "Property path for value tracks" },
            },
            required: ["node_path", "animation", "track_type"],
        },
    },
    set_animation_keyframe: {
        name: "set_animation_keyframe",
        description: "Insert a keyframe into an animation track",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationPlayer node path" },
                animation: { type: "string", description: "Animation name" },
                track_index: { type: "number", description: "Track index" },
                time: { type: "number", description: "Keyframe time in seconds" },
                value: { description: "Keyframe value" },
                transition: { type: "string", description: "Transition type", default: "linear" },
            },
            required: ["node_path", "animation", "track_index", "time", "value"],
        },
    },
    get_animation_info: {
        name: "get_animation_info",
        description: "Get detailed animation information with all tracks and keyframes",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationPlayer node path" },
                animation: { type: "string", description: "Animation name" },
            },
            required: ["node_path", "animation"],
        },
    },
    remove_animation: {
        name: "remove_animation",
        description: "Remove an animation from an AnimationPlayer",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "AnimationPlayer node path" },
                name: { type: "string", description: "Animation name" },
            },
            required: ["node_path", "name"],
        },
    },
};
//# sourceMappingURL=animation.js.map