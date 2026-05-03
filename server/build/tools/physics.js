"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.physicsTools = void 0;
exports.physicsTools = {
    setup_physics_body: {
        name: "setup_physics_body",
        description: "Configure physics body properties",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "PhysicsBody node path" },
                body_mode: {
                    type: "string",
                    description: "Body mode",
                    enum: ["static", "rigid", "character", "kinematic"],
                },
                mass: { type: "number", description: "Body mass" },
                gravity_scale: { type: "number", description: "Gravity scale" },
                freeze: { type: "boolean", description: "Freeze the body" },
                freeze_mode: {
                    type: "string",
                    description: "Freeze mode",
                    enum: ["all", "position", "rotation"],
                },
            },
            required: ["node_path"],
        },
    },
    setup_collision: {
        name: "setup_collision",
        description: "Add collision shapes to nodes",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Node path" },
                shape_type: {
                    type: "string",
                    description: "Collision shape type",
                    enum: ["box", "sphere", "capsule", "cylinder", "segment", "concave_polygon", "convex_polygon"],
                },
                size: {
                    type: "object",
                    description: "Shape size parameters",
                    properties: {
                        x: { type: "number" },
                        y: { type: "number" },
                        z: { type: "number" },
                        radius: { type: "number" },
                        height: { type: "number" },
                    },
                },
                transform: {
                    type: "object",
                    description: "Shape transform",
                    properties: {
                        position: { type: "object" },
                        rotation: { type: "object" },
                    },
                },
            },
            required: ["node_path", "shape_type"],
        },
    },
    set_physics_layers: {
        name: "set_physics_layers",
        description: "Set collision layer and mask",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "CollisionObject node path" },
                layer: { type: "number", description: "Collision layer bitmask" },
                mask: { type: "number", description: "Collision mask bitmask" },
            },
            required: ["node_path"],
        },
    },
    get_physics_layers: {
        name: "get_physics_layers",
        description: "Get collision layer and mask information",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "CollisionObject node path" },
            },
            required: ["node_path"],
        },
    },
    get_collision_info: {
        name: "get_collision_info",
        description: "Get collision shape details",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "CollisionObject node path" },
            },
            required: ["node_path"],
        },
    },
    add_raycast: {
        name: "add_raycast",
        description: "Add a RayCast2D or RayCast3D node",
        inputSchema: {
            type: "object",
            properties: {
                parent_path: { type: "string", description: "Parent node path", default: "." },
                name: { type: "string", description: "RayCast node name" },
                type: { type: "string", description: "RayCast type", enum: ["2d", "3d"], default: "2d" },
                target_position: {
                    type: "object",
                    description: "Target position",
                    properties: {
                        x: { type: "number" },
                        y: { type: "number" },
                        z: { type: "number" },
                    },
                },
                collide_with_bodies: { type: "boolean", description: "Collide with physics bodies", default: true },
                collide_with_areas: { type: "boolean", description: "Collide with areas", default: false },
            },
            required: ["type"],
        },
    },
};
//# sourceMappingURL=physics.js.map