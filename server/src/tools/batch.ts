import { ToolDefinition } from "../protocol/mcp-types";

export const batchTools: Record<string, ToolDefinition> = {
  find_nodes_by_type: {
    name: "find_nodes_by_type",
    description: "Find all nodes of a specific type in the scene",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", description: "Node type (e.g. CharacterBody3D, Button)" },
      },
      required: ["type"],
    },
  },

  find_signal_connections: {
    name: "find_signal_connections",
    description: "Find all signal connections in the scene",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Root node path to search" },
      },
    },
  },

  batch_set_property: {
    name: "batch_set_property",
    description: "Set a property on all nodes of a specific type",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", description: "Node type to target" },
        property: { type: "string", description: "Property name" },
        value: { description: "Value to set" },
        recursive: { type: "boolean", description: "Search recursively", default: true },
      },
      required: ["type", "property", "value"],
    },
  },

  find_node_references: {
    name: "find_node_references",
    description: "Search project files for references to a node",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Node path to search for" },
      },
      required: ["node_path"],
    },
  },

  get_scene_dependencies: {
    name: "get_scene_dependencies",
    description: "Get resource dependencies of a scene",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Scene file path" },
      },
      required: ["path"],
    },
  },

  cross_scene_set_property: {
    name: "cross_scene_set_property",
    description: "Set a property across all scenes that reference a resource",
    inputSchema: {
      type: "object",
      properties: {
        resource_path: { type: "string", description: "Path to the resource/script" },
        property: { type: "string", description: "Property name" },
        value: { description: "Value to set" },
      },
      required: ["resource_path", "property", "value"],
    },
  },

  find_script_references: {
    name: "find_script_references",
    description: "Find where a script or resource is used",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Script or resource path" },
      },
      required: ["path"],
    },
  },

  detect_circular_dependencies: {
    name: "detect_circular_dependencies",
    description: "Find circular scene dependencies",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
};
