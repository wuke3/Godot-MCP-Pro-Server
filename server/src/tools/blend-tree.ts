import { ToolDefinition } from "../protocol/mcp-types";

export const blendTreeTools: Record<string, ToolDefinition> = {
  set_blend_tree_node: {
    name: "set_blend_tree_node",
    description: "Configure a blend tree node",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "AnimationTree node path" },
        node_name: { type: "string", description: "Blend tree node name" },
        node_type: { 
          type: "string", 
          description: "Node type",
          enum: [
            "input", "output", "animation", "blend2", "blend3", "blend4",
            "one_shot", "time_seek", "timescale", "transition", "clip_reference",
            "blend_tree", "random", "selection", "state_machine", "root"
          ],
        },
        position: { 
          type: "object",
          description: "Editor position",
          properties: {
            x: { type: "number" },
            y: { type: "number" },
          },
        },
        properties: { type: "object", description: "Node-specific properties" },
        input_ports: { 
          type: "array", 
          description: "Input port connections",
          items: {
            type: "object",
            properties: {
              source_node: { type: "string" },
              source_port: { type: "number" },
            },
          },
        },
      },
      required: ["node_path", "node_name", "node_type"],
    },
  },
};
