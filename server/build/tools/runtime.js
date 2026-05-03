"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeTools = void 0;
exports.runtimeTools = {
    get_game_scene_tree: {
        name: "get_game_scene_tree",
        description: "Get the scene tree of the running game",
        inputSchema: {
            type: "object",
            properties: {
                max_depth: { type: "number", description: "Maximum tree depth", default: -1 },
                script_filter: { type: "string", description: "Filter by script path" },
                type_filter: { type: "string", description: "Filter by node type" },
                named_only: { type: "boolean", description: "Only show named nodes" },
            },
        },
    },
    get_game_node_properties: {
        name: "get_game_node_properties",
        description: "Get properties of a node in the running game",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path in game tree" },
                properties: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific properties to retrieve"
                },
            },
            required: ["node_path"],
        },
    },
    set_game_node_property: {
        name: "set_game_node_property",
        description: "Set a property on a node in the running game",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path in game tree" },
                property: { type: "string", description: "Property name" },
                value: { description: "New property value" },
            },
            required: ["node_path", "property", "value"],
        },
    },
    execute_game_script: {
        name: "execute_game_script",
        description: "Execute GDScript in the running game context",
        inputSchema: {
            type: "object",
            properties: {
                code: { type: "string", description: "GDScript code to execute" },
            },
            required: ["code"],
        },
    },
    capture_frames: {
        name: "capture_frames",
        description: "Capture multiple frames from the running game",
        inputSchema: {
            type: "object",
            properties: {
                count: { type: "number", description: "Number of frames to capture", default: 5 },
                frame_interval: { type: "number", description: "Frames between captures", default: 10 },
                half_resolution: { type: "boolean", description: "Capture at half resolution", default: true },
                node_data: {
                    type: "object",
                    description: "Optional node property tracking",
                    properties: {
                        node_path: { type: "string" },
                        properties: { type: "array", items: { type: "string" } },
                    },
                },
            },
        },
    },
    monitor_properties: {
        name: "monitor_properties",
        description: "Record property values over time",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path" },
                properties: {
                    type: "array",
                    items: { type: "string" },
                    description: "Properties to monitor"
                },
                frame_count: { type: "number", description: "Number of samples", default: 60 },
                frame_interval: { type: "number", description: "Frames between samples", default: 1 },
            },
            required: ["node_path", "properties"],
        },
    },
    start_recording: {
        name: "start_recording",
        description: "Start recording input events",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    stop_recording: {
        name: "stop_recording",
        description: "Stop recording and return recorded events",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    replay_recording: {
        name: "replay_recording",
        description: "Replay previously recorded input events",
        inputSchema: {
            type: "object",
            properties: {
                events: {
                    type: "array",
                    description: "Array of recorded input events"
                },
                speed: { type: "number", description: "Playback speed multiplier", default: 1.0 },
            },
            required: ["events"],
        },
    },
    find_nodes_by_script: {
        name: "find_nodes_by_script",
        description: "Find all game nodes with a specific script",
        inputSchema: {
            type: "object",
            properties: {
                script: { type: "string", description: "Script path or class name" },
                properties: {
                    type: "array",
                    items: { type: "string" },
                    description: "Properties to retrieve from found nodes"
                },
            },
            required: ["script"],
        },
    },
    get_autoload: {
        name: "get_autoload",
        description: "Get properties of an autoload singleton",
        inputSchema: {
            type: "object",
            properties: {
                name: { type: "string", description: "Autoload name" },
                properties: { type: "array", items: { type: "string" } },
            },
            required: ["name"],
        },
    },
    batch_get_properties: {
        name: "batch_get_properties",
        description: "Get properties from multiple nodes at once",
        inputSchema: {
            type: "object",
            properties: {
                nodes: {
                    type: "array",
                    description: "Array of node specifications",
                    items: {
                        type: "object",
                        properties: {
                            node_path: { type: "string" },
                            properties: { type: "array", items: { type: "string" } },
                        },
                    },
                },
            },
            required: ["nodes"],
        },
    },
    find_ui_elements: {
        name: "find_ui_elements",
        description: "Find UI elements in the game",
        inputSchema: {
            type: "object",
            properties: {
                type_filter: { type: "string", description: "Filter by Control type (e.g. Button, Label)" },
            },
        },
    },
    click_button_by_text: {
        name: "click_button_by_text",
        description: "Click a button by its text content",
        inputSchema: {
            type: "object",
            properties: {
                text: { type: "string", description: "Button text to find" },
                partial: { type: "boolean", description: "Match partial text", default: true },
            },
            required: ["text"],
        },
    },
    wait_for_node: {
        name: "wait_for_node",
        description: "Wait for a node to appear in the scene",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Expected node path" },
                timeout: { type: "number", description: "Maximum wait time in seconds", default: 5.0 },
                poll_frames: { type: "number", description: "Frames between polls", default: 5 },
            },
            required: ["node_path"],
        },
    },
    find_nearby_nodes: {
        name: "find_nearby_nodes",
        description: "Find nodes near a position",
        inputSchema: {
            type: "object",
            properties: {
                position: {
                    type: "object",
                    description: "Position (Vector2 or Vector3)",
                    properties: {
                        x: { type: "number" },
                        y: { type: "number" },
                        z: { type: "number" },
                    },
                    required: ["x", "y"],
                },
                radius: { type: "number", description: "Search radius", default: 100 },
                type_filter: { type: "string", description: "Filter by node type" },
                group_filter: { type: "string", description: "Filter by group" },
                max_results: { type: "number", description: "Maximum results", default: 10 },
            },
            required: ["position"],
        },
    },
    navigate_to: {
        name: "navigate_to",
        description: "Navigate to a target position using navigation",
        inputSchema: {
            type: "object",
            properties: {
                target: {
                    type: "object",
                    properties: {
                        x: { type: "number" },
                        y: { type: "number" },
                        z: { type: "number" },
                    },
                },
                player_path: { type: "string", description: "Player character path" },
                camera_path: { type: "string", description: "Camera path" },
                move_speed: { type: "number", description: "Movement speed" },
            },
            required: ["target"],
        },
    },
    move_to: {
        name: "move_to",
        description: "Walk a character to a target position",
        inputSchema: {
            type: "object",
            properties: {
                target: {
                    type: "object",
                    properties: {
                        x: { type: "number" },
                        y: { type: "number" },
                        z: { type: "number" },
                    },
                },
                player_path: { type: "string", description: "Player character path" },
                camera_path: { type: "string", description: "Camera path" },
                arrival_radius: { type: "number", description: "Arrival distance threshold", default: 1.5 },
                timeout: { type: "number", description: "Maximum time in seconds", default: 15 },
                run: { type: "boolean", description: "Use running animation", default: false },
                look_at_target: { type: "boolean", description: "Face the target", default: true },
            },
            required: ["target"],
        },
    },
    watch_signals: {
        name: "watch_signals",
        description: "Watch for signal emissions from nodes",
        inputSchema: {
            type: "object",
            properties: {
                node_paths: {
                    type: "array",
                    items: { type: "string" },
                    description: "Node paths to watch"
                },
                signal_filter: {
                    type: "array",
                    items: { type: "string" },
                    description: "Filter by signal name"
                },
                duration_ms: { type: "number", description: "Watch duration in milliseconds", default: 5000 },
            },
            required: ["node_paths"],
        },
    },
};
//# sourceMappingURL=runtime.js.map