import { ToolDefinition } from "../protocol/mcp-types";

export const themeTools: Record<string, ToolDefinition> = {
  create_theme: {
    name: "create_theme",
    description: "Create a new Theme resource file",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Save path for the theme" },
      },
      required: ["path"],
    },
  },

  set_theme_color: {
    name: "set_theme_color",
    description: "Set a theme color override",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Control node path" },
        color_type: { 
          type: "string", 
          description: "Color type",
          enum: ["font_color", "font_outline_color", "box_shadow_color", "selection_color", "custom", "custom_font_outline_color"],
        },
        color: {
          type: "object",
          description: "Color value",
          properties: {
            r: { type: "number" },
            g: { type: "number" },
            b: { type: "number" },
            a: { type: "number" },
          },
        },
      },
      required: ["node_path", "color_type", "color"],
    },
  },

  set_theme_constant: {
    name: "set_theme_constant",
    description: "Set a theme constant override",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Control node path" },
        constant_name: { type: "string", description: "Constant name" },
        value: { type: "number", description: "Constant value" },
      },
      required: ["node_path", "constant_name", "value"],
    },
  },

  set_theme_font_size: {
    name: "set_theme_font_size",
    description: "Set a theme font size override",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Control node path" },
        font_type: { 
          type: "string", 
          description: "Font type",
          enum: ["font", "bold_font", "italics_font", "bold_italics_font"],
        },
        size_name: { 
          type: "string", 
          description: "Size name",
          enum: ["font_size", "custom_minimum_size"],
        },
        size: { type: "number", description: "Font size" },
      },
      required: ["node_path", "font_type", "size_name", "size"],
    },
  },

  set_theme_stylebox: {
    name: "set_theme_stylebox",
    description: "Set a StyleBoxFlat override",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Control node path" },
        stylebox_type: { type: "string", description: "Stylebox type (e.g. normal, hover, pressed)" },
        bg_color: { type: "string", description: "Background color (hex)" },
        border_color: { type: "string", description: "Border color (hex)" },
        border_width: { type: "number", description: "Border width" },
        corner_radius: { type: "number", description: "Corner radius" },
        content_margin: { type: "number", description: "Content margin" },
      },
      required: ["node_path", "stylebox_type"],
    },
  },

  get_theme_info: {
    name: "get_theme_info",
    description: "Get theme overrides information for a node",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Control node path" },
      },
      required: ["node_path"],
    },
  },
};
