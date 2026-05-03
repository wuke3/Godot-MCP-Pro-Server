import { ToolDefinition } from "../protocol/mcp-types";

export const analysisTools: Record<string, ToolDefinition> = {
  analyze_scene_complexity: {
    name: "analyze_scene_complexity",
    description: "Analyze scene performance characteristics",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Scene file path" },
      },
      required: ["path"],
    },
  },

  analyze_signal_flow: {
    name: "analyze_signal_flow",
    description: "Map signal connections in the scene",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Scene file path" },
        max_depth: { type: "number", description: "Maximum traversal depth", default: 10 },
      },
      required: ["path"],
    },
  },

  find_unused_resources: {
    name: "find_unused_resources",
    description: "Find resources that are not referenced anywhere",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Project root path", default: "res://" },
      },
    },
  },

  get_project_statistics: {
    name: "get_project_statistics",
    description: "Get project-wide statistics",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Project root path", default: "res://" },
      },
    },
  },
};
