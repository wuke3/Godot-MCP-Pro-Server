import { ToolDefinition } from "../protocol/mcp-types";

export const exportTools: Record<string, ToolDefinition> = {
  list_export_presets: {
    name: "list_export_presets",
    description: "List all export presets",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  export_project: {
    name: "export_project",
    description: "Get the export command for a preset",
    inputSchema: {
      type: "object",
      properties: {
        preset: { type: "number", description: "Preset index" },
        path: { type: "string", description: "Export output path" },
      },
      required: ["preset"],
    },
  },

  get_export_info: {
    name: "get_export_info",
    description: "Get export-related project information",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
};
