"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeTools = void 0;
exports.nodeTools = {
    add_node: {
        name: "add_node",
        description: "Add a new node with type and properties",
        inputSchema: {
            type: "object",
            properties: {
                type: { type: "string", description: "Node type (e.g. CharacterBody3D, Sprite2D)" },
                parent_path: { type: "string", description: "Parent node path", default: "." },
                name: { type: "string", description: "Node name" },
                properties: {
                    type: "object",
                    description: "Properties to set on the new node",
                    additionalProperties: true,
                },
            },
            required: ["type"],
        },
    },
    delete_node: {
        name: "delete_node",
        description: "Delete a node (supports undo)",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Path of node to delete" },
            },
            required: ["node_path"],
        },
    },
    duplicate_node: {
        name: "duplicate_node",
        description: "Duplicate a node and its children",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Path of node to duplicate" },
                name: { type: "string", description: "New node name" },
            },
            required: ["node_path"],
        },
    },
    move_node: {
        name: "move_node",
        description: "Move or reparent a node",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node to move" },
                new_parent_path: { type: "string", description: "New parent node path" },
            },
            required: ["node_path", "new_parent_path"],
        },
    },
    update_property: {
        name: "update_property",
        description: "Set a property value on a node",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path" },
                property: { type: "string", description: "Property name" },
                value: { description: "New property value", additionalProperties: true },
            },
            required: ["node_path", "property", "value"],
        },
    },
    get_node_properties: {
        name: "get_node_properties",
        description: "Get all properties of a node",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path" },
                category: { type: "string", description: "Filter by property category" },
            },
            required: ["node_path"],
        },
    },
    add_resource: {
        name: "add_resource",
        description: "Add a resource (Shape, Material, etc.) to a node",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path" },
                property: { type: "string", description: "Property name (e.g. shape, material)" },
                resource_type: { type: "string", description: "Resource type (e.g. RectangleShape2D)" },
                resource_properties: { type: "object", description: "Properties to set on the resource" },
            },
            required: ["node_path", "property", "resource_type"],
        },
    },
    set_anchor_preset: {
        name: "set_anchor_preset",
        description: "Set Control node anchor preset",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Control node path" },
                preset: {
                    type: "string",
                    description: "Anchor preset name",
                    enum: [
                        "top_left", "top_right", "bottom_left", "bottom_right",
                        "center_left", "center_top", "center_right", "center_bottom", "center",
                        "left_wide", "top_wide", "right_wide", "bottom_wide",
                        "vcenter_wide", "hcenter_wide", "full_rect"
                    ],
                },
                keep_offsets: { type: "boolean", description: "Keep current offsets", default: false },
            },
            required: ["node_path", "preset"],
        },
    },
    rename_node: {
        name: "rename_node",
        description: "Rename a node in the scene",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node to rename" },
                new_name: { type: "string", description: "New node name" },
            },
            required: ["node_path", "new_name"],
        },
    },
    connect_signal: {
        name: "connect_signal",
        description: "Connect a signal between nodes",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Source node" },
                signal: { type: "string", description: "Signal name (e.g. pressed)" },
                target_path: { type: "string", description: "Target node path" },
                method: { type: "string", description: "Target method name" },
                flags: { type: "number", description: "Connection flags" },
            },
            required: ["node_path", "signal", "target_path", "method"],
        },
    },
    disconnect_signal: {
        name: "disconnect_signal",
        description: "Disconnect a signal connection",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Source node" },
                signal: { type: "string", description: "Signal name" },
                target_path: { type: "string", description: "Target node path" },
                method: { type: "string", description: "Target method name" },
            },
            required: ["node_path", "signal", "target_path", "method"],
        },
    },
    get_node_groups: {
        name: "get_node_groups",
        description: "Get groups a node belongs to",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path" },
            },
            required: ["node_path"],
        },
    },
    set_node_groups: {
        name: "set_node_groups",
        description: "Set node group membership",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path" },
                add: { type: "array", items: { type: "string" }, description: "Groups to add" },
                remove: { type: "array", items: { type: "string" }, description: "Groups to remove" },
            },
            required: ["node_path"],
        },
    },
    find_nodes_in_group: {
        name: "find_nodes_in_group",
        description: "Find all nodes in a group",
        inputSchema: {
            type: "object",
            properties: {
                group: { type: "string", description: "Group name" },
            },
            required: ["group"],
        },
    },
};
//# sourceMappingURL=node.js.map