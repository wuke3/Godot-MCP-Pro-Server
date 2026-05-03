import { ToolDefinition } from "../protocol/mcp-types";

export const resourceTools: Record<string, ToolDefinition> = {
  read_resource: {
    name: "read_resource",
    description: "Read .tres resource properties",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Resource file path" },
      },
      required: ["path"],
    },
  },

  edit_resource: {
    name: "edit_resource",
    description: "Edit resource properties",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Resource file path" },
        properties: { type: "object", description: "Properties to update" },
      },
      required: ["path", "properties"],
    },
  },

  create_resource: {
    name: "create_resource",
    description: "Create a new .tres resource",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Save path" },
        type: { type: "string", description: "Resource type" },
        properties: { type: "object", description: "Initial properties" },
      },
      required: ["path", "type"],
    },
  },

  get_resource_preview: {
    name: "get_resource_preview",
    description: "Get resource thumbnail preview",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Resource file path" },
        size: { type: "number", description: "Thumbnail size", default: 64 },
      },
      required: ["path"],
    },
  },

  add_autoload: {
    name: "add_autoload",
    description: "Register an autoload singleton",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Autoload name" },
        path: { type: "string", description: "Script path" },
      },
      required: ["name", "path"],
    },
  },

  remove_autoload: {
    name: "remove_autoload",
    description: "Remove an autoload singleton",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Autoload name" },
      },
      required: ["name"],
    },
  },
};
