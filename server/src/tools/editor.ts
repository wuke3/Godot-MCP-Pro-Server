import { ToolDefinition } from "../protocol/mcp-types";

export const editorTools: Record<string, ToolDefinition> = {
  get_editor_errors: {
    name: "get_editor_errors",
    description: "Get current editor errors and stack traces",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  get_editor_screenshot: {
    name: "get_editor_screenshot",
    description: "Capture the editor viewport as an image",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Save path for screenshot" },
      },
    },
  },

  get_game_screenshot: {
    name: "get_game_screenshot",
    description: "Capture the running game viewport as an image",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Save path for screenshot" },
        half_resolution: { type: "boolean", description: "Capture at half resolution", default: true },
      },
    },
  },

  execute_editor_script: {
    name: "execute_editor_script",
    description: "Execute arbitrary GDScript in the editor context",
    inputSchema: {
      type: "object",
      properties: {
        code: { type: "string", description: "GDScript code to execute" },
      },
      required: ["code"],
    },
  },

  clear_output: {
    name: "clear_output",
    description: "Clear the output panel",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  get_signals: {
    name: "get_signals",
    description: "Get all signals of a node with their connections",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Node path" },
      },
      required: ["node_path"],
    },
  },

  reload_plugin: {
    name: "reload_plugin",
    description: "Reload the MCP plugin and reconnect",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  reload_project: {
    name: "reload_project",
    description: "Rescan filesystem and reload all scripts",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  get_output_log: {
    name: "get_output_log",
    description: "Get the content of the output panel",
    inputSchema: {
      type: "object",
      properties: {
        clear: { type: "boolean", description: "Clear the log after reading", default: false },
      },
    },
  },
};
