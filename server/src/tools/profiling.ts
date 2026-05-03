import { ToolDefinition } from "../protocol/mcp-types";

export const profilingTools: Record<string, ToolDefinition> = {
  get_performance_monitors: {
    name: "get_performance_monitors",
    description: "Get all performance monitors (FPS, memory, physics, etc.)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  get_editor_performance: {
    name: "get_editor_performance",
    description: "Get a quick performance summary",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
};
