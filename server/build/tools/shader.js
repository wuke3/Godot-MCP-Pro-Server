"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shaderTools = void 0;
exports.shaderTools = {
    create_shader: {
        name: "create_shader",
        description: "Create a new shader with template",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Save path for the shader" },
                shader_type: {
                    type: "string",
                    description: "Shader type",
                    enum: ["canvas_item", "spatial", "sky", "particles"],
                    default: "canvas_item"
                },
                code: { type: "string", description: "Custom shader code (optional)" },
            },
            required: ["path"],
        },
    },
    read_shader: {
        name: "read_shader",
        description: "Read shader file content",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Shader file path" },
            },
            required: ["path"],
        },
    },
    edit_shader: {
        name: "edit_shader",
        description: "Edit shader content (replace or search-replace)",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Shader file path" },
                find: { type: "string", description: "Text to find" },
                replace: { type: "string", description: "Replacement text" },
                content: { type: "string", description: "Full shader content" },
            },
            required: ["path"],
        },
    },
    assign_shader_material: {
        name: "assign_shader_material",
        description: "Assign a ShaderMaterial to a node",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path (must have geometry)" },
                shader_path: { type: "string", description: "Shader file path" },
            },
            required: ["node_path", "shader_path"],
        },
    },
    set_shader_param: {
        name: "set_shader_param",
        description: "Set a shader parameter value",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node with ShaderMaterial" },
                param: { type: "string", description: "Parameter name" },
                value: { description: "Parameter value" },
            },
            required: ["node_path", "param", "value"],
        },
    },
    get_shader_params: {
        name: "get_shader_params",
        description: "Get all shader parameters and their values",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node with ShaderMaterial" },
            },
            required: ["node_path"],
        },
    },
};
//# sourceMappingURL=shader.js.map