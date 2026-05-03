import { ToolDefinition } from "../protocol/mcp-types";

export const stateMachineTools: Record<string, ToolDefinition> = {
  remove_state_machine_state: {
    name: "remove_state_machine_state",
    description: "Remove a state from AnimationStateMachine",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "AnimationTree node path" },
        state_name: { type: "string", description: "State name to remove" },
      },
      required: ["node_path", "state_name"],
    },
  },

  add_state_machine_transition: {
    name: "add_state_machine_transition",
    description: "Add a transition between states",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "AnimationTree node path" },
        from_state: { type: "string", description: "Source state (use * for any)" },
        to_state: { type: "string", description: "Target state (use * for end)" },
        advance_mode: { 
          type: "string", 
          description: "Advance mode",
          enum: ["disabled", "enabled", "end"],
        },
        advance_condition: { type: "string", description: "Condition name for conditional advance" },
        priority: { type: "number", description: "Transition priority" },
        xfade_time: { type: "number", description: "Crossfade time" },
      },
      required: ["node_path", "from_state", "to_state"],
    },
  },

  remove_state_machine_transition: {
    name: "remove_state_machine_transition",
    description: "Remove a transition from AnimationStateMachine",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "AnimationTree node path" },
        from_state: { type: "string", description: "Source state" },
        to_state: { type: "string", description: "Target state" },
      },
      required: ["node_path", "from_state", "to_state"],
    },
  },
};
