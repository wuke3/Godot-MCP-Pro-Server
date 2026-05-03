import { ToolDefinition } from "../protocol/mcp-types";

export const scriptTools: Record<string, ToolDefinition> = {
  list_scripts: {
    name: "list_scripts",
    description: "List all scripts with class information",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Root path to search" },
      },
    },
  },

  read_script: {
    name: "read_script",
    description: "Read script content",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Script file path" },
      },
      required: ["path"],
    },
  },

  create_script: {
    name: "create_script",
    description: "Create a new script with template",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Save path for new script" },
        class_name: { type: "string", description: "Optional class name" },
        extends: { type: "string", description: "Base class to extend", default: "Node" },
        template: { type: "string", description: "Template type", enum: ["empty", "basic", "minimal", "complete"] },
      },
      required: ["path"],
    },
  },

  edit_script: {
    name: "edit_script",
    description: "Edit a script (search/replace or full content)",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Script file path" },
        find: { type: "string", description: "Text to find" },
        replace: { type: "string", description: "Replacement text" },
        content: { type: "string", description: "Full file content (replaces entire file)" },
      },
      required: ["path"],
    },
  },

  attach_script: {
    name: "attach_script",
    description: "Attach a script to a node",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Node path" },
        script_path: { type: "string", description: "Script file path" },
      },
      required: ["node_path", "script_path"],
    },
  },

  get_open_scripts: {
    name: "get_open_scripts",
    description: "List scripts currently open in the editor",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  validate_script: {
    name: "validate_script",
    description: "Validate GDScript syntax",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Script file path" },
        content: { type: "string", description: "Script content to validate" },
      },
    },
  },

  search_in_files: {
    name: "search_in_files",
    description: "Search content in project files",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query or regex pattern" },
        path: { type: "string", description: "Root path to search", default: "res://" },
        regex: { type: "boolean", description: "Use regex pattern", default: false },
        file_type: { type: "string", description: "Filter by file extension" },
        max_results: { type: "number", description: "Maximum results", default: 50 },
      },
      required: ["query"],
    },
  },
};
