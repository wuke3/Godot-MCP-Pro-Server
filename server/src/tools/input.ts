import { ToolDefinition } from "../protocol/mcp-types";

export const inputTools: Record<string, ToolDefinition> = {
  simulate_key: {
    name: "simulate_key",
    description: "Simulate keyboard key press/release",
    inputSchema: {
      type: "object",
      properties: {
        keycode: { type: "string", description: "Keycode (e.g. KEY_ENTER, KEY_A)" },
        pressed: { type: "boolean", description: "True for press, false for release", default: true },
        shift: { type: "boolean", description: "Shift modifier", default: false },
        ctrl: { type: "boolean", description: "Ctrl modifier", default: false },
        alt: { type: "boolean", description: "Alt modifier", default: false },
      },
      required: ["keycode"],
    },
  },

  simulate_mouse_click: {
    name: "simulate_mouse_click",
    description: "Simulate mouse click at position",
    inputSchema: {
      type: "object",
      properties: {
        x: { type: "number", description: "X coordinate" },
        y: { type: "number", description: "Y coordinate" },
        button: { type: "number", description: "Mouse button (1=left, 2=right, 3=middle)", default: 1 },
        pressed: { type: "boolean", description: "True for press, false for release", default: true },
        double_click: { type: "boolean", description: "Simulate double click", default: false },
      },
      required: ["x", "y"],
    },
  },

  simulate_mouse_move: {
    name: "simulate_mouse_move",
    description: "Simulate mouse movement",
    inputSchema: {
      type: "object",
      properties: {
        x: { type: "number", description: "X coordinate" },
        y: { type: "number", description: "Y coordinate" },
        relative_x: { type: "number", description: "Relative X movement" },
        relative_y: { type: "number", description: "Relative Y movement" },
        button_mask: { type: "number", description: "Button state bitmask" },
      },
      required: ["x", "y"],
    },
  },

  simulate_action: {
    name: "simulate_action",
    description: "Simulate a Godot Input Action",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", description: "Input action name (e.g. ui_accept)" },
        pressed: { type: "boolean", description: "True for press, false for release", default: true },
        strength: { type: "number", description: "Action strength (0-1)", default: 1.0 },
      },
      required: ["action"],
    },
  },

  simulate_sequence: {
    name: "simulate_sequence",
    description: "Sequence of input events with frame delays",
    inputSchema: {
      type: "object",
      properties: {
        sequence_events: {
          type: "array",
          description: "Array of input event objects",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["key", "mouse_button", "mouse_motion", "action"] },
              ...{},
            },
          },
        },
        frame_delay: { type: "number", description: "Frames between events", default: 1 },
      },
      required: ["sequence_events"],
    },
  },

  get_input_actions: {
    name: "get_input_actions",
    description: "List all configured input actions",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  set_input_action: {
    name: "set_input_action",
    description: "Create or modify an input action",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", description: "Action name" },
        events: {
          type: "array",
          description: "Array of input event configurations",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["key", "joypad_button", "joypad_motion"] },
              keycode: { type: "string", description: "Keycode (for type=key)" },
              button_index: { type: "number", description: "Button index (for joypad)" },
              device: { type: "number", description: "Device ID", default: 0 },
            },
          },
        },
      },
      required: ["action"],
    },
  },
};
