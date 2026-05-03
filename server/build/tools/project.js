"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTools = void 0;
exports.projectTools = {
    get_project_info: {
        name: "get_project_info",
        description: "Get project metadata including name, version, viewport settings, and autoloads",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    get_filesystem_tree: {
        name: "get_filesystem_tree",
        description: "Get recursive file tree with optional filtering",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Root path to scan (default: res://)", default: "res://" },
                filter: { type: "string", description: "File filter pattern (e.g. *.gd, *.tscn)" },
                max_depth: { type: "number", description: "Maximum directory depth", default: 10 },
            },
        },
    },
    search_files: {
        name: "search_files",
        description: "Search for files with fuzzy/glob matching",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "Search query" },
                path: { type: "string", description: "Root path to search (default: res://)" },
                file_type: { type: "string", description: "Filter by file extension (e.g. gd, tscn)" },
                max_results: { type: "number", description: "Maximum results", default: 50 },
            },
            required: ["query"],
        },
    },
    get_project_settings: {
        name: "get_project_settings",
        description: "Read project.godot settings",
        inputSchema: {
            type: "object",
            properties: {
                section: { type: "string", description: "Settings section to filter" },
                key: { type: "string", description: "Specific setting key" },
            },
        },
    },
    set_project_setting: {
        name: "set_project_setting",
        description: "Set a project setting via the editor API",
        inputSchema: {
            type: "object",
            properties: {
                key: { type: "string", description: "Setting key (e.g. application/config/name)" },
                value: { type: "string", description: "Setting value" },
            },
            required: ["key", "value"],
        },
    },
    uid_to_project_path: {
        name: "uid_to_project_path",
        description: "Convert UID to project path (res://)",
        inputSchema: {
            type: "object",
            properties: {
                uid: { type: "string", description: "Resource UID (e.g. res://...#uid)" },
            },
            required: ["uid"],
        },
    },
    project_path_to_uid: {
        name: "project_path_to_uid",
        description: "Convert project path (res://) to UID",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string", description: "Project path (res://...)" },
            },
            required: ["path"],
        },
    },
    add_autoload: {
        name: "add_autoload",
        description: "Register an autoload singleton",
        inputSchema: {
            type: "object",
            properties: {
                name: { type: "string", description: "Autoload name" },
                path: { type: "string", description: "Script path (e.g. res://scripts/MyAutoload.gd)" },
            },
            required: ["name", "path"],
        },
    },
    remove_autoload: {
        name: "remove_autoload",
        description: "Remove an autoload singleton",
        inputSchema: {
            type: "object",
            properties: {
                name: { type: "string", description: "Autoload name to remove" },
            },
            required: ["name"],
        },
    },
};
//# sourceMappingURL=project.js.map