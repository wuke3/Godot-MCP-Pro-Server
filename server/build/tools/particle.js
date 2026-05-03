"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.particleTools = void 0;
exports.particleTools = {
    create_particles: {
        name: "create_particles",
        description: "Create GPUParticles2D or GPUParticles3D",
        inputSchema: {
            type: "object",
            properties: {
                parent_path: { type: "string", description: "Parent node path", default: "." },
                name: { type: "string", description: "Node name" },
                type: { type: "string", description: "Particle type", enum: ["2d", "3d"], default: "2d" },
                amount: { type: "number", description: "Particle count", default: 1000 },
            },
        },
    },
    set_particle_material: {
        name: "set_particle_material",
        description: "Configure ParticleProcessMaterial",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Particles node path" },
                particle_color: { type: "string", description: "Particle color (hex)" },
                emission_color: { type: "string", description: "Initial emission color (hex)" },
                velocity_min: { type: "number", description: "Min velocity" },
                velocity_max: { type: "number", description: "Max velocity" },
                direction: {
                    type: "object",
                    description: "Spread direction",
                    properties: {
                        x: { type: "number", default: 0 },
                        y: { type: "number", default: 0 },
                        z: { type: "number", default: 0 },
                    },
                },
                spread: { type: "number", description: "Spread angle", default: 180 },
                gravity: {
                    type: "object",
                    description: "Gravity",
                    properties: {
                        x: { type: "number", default: 0 },
                        y: { type: "number", default: 98 },
                        z: { type: "number", default: 0 },
                    },
                },
                angular_velocity_min: { type: "number", description: "Min angular velocity" },
                angular_velocity_max: { type: "number", description: "Max angular velocity" },
                linear_accel_min: { type: "number", description: "Min linear acceleration" },
                linear_accel_max: { type: "number", description: "Max linear acceleration" },
                lifetime_min: { type: "number", description: "Min lifetime", default: 1 },
                lifetime_max: { type: "number", description: "Max lifetime", default: 1 },
                explosiveness: { type: "number", description: "Explosiveness (0-1)", default: 0 },
                fract: { type: "number", description: "Randomness fraction (0-1)", default: 1 },
            },
            required: ["node_path"],
        },
    },
    set_particle_color_gradient: {
        name: "set_particle_color_gradient",
        description: "Set color gradient for particles",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Particles node path" },
                gradient: {
                    type: "array",
                    description: "Gradient color stops",
                    items: {
                        type: "object",
                        properties: {
                            offset: { type: "number", description: "Gradient offset (0-1)" },
                            color: { type: "string", description: "Color (hex)" },
                        },
                    },
                },
            },
            required: ["node_path", "gradient"],
        },
    },
    apply_particle_preset: {
        name: "apply_particle_preset",
        description: "Apply a preset configuration to particles",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Particles node path" },
                preset: {
                    type: "string",
                    description: "Preset name",
                    enum: [
                        "fire", "smoke", "sparks", "dust", "rain", "snow",
                        "magic", "smoke_soft", "fire_large", "embers", "confetti",
                        "bubble", "foam", "leaves", "energy", "plasma"
                    ],
                },
            },
            required: ["node_path", "preset"],
        },
    },
    get_particle_info: {
        name: "get_particle_info",
        description: "Get particle system details",
        inputSchema: {
            type: "object",
            properties: {
                node_path: { type: "string", description: "Particles node path" },
            },
            required: ["node_path"],
        },
    },
};
//# sourceMappingURL=particle.js.map