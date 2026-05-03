import { ToolDefinition } from "../protocol/mcp-types";

export const scene3dTools: Record<string, ToolDefinition> = {
  add_mesh_instance: {
    name: "add_mesh_instance",
    description: "Add MeshInstance3D with a primitive mesh",
    inputSchema: {
      type: "object",
      properties: {
        parent_path: { type: "string", description: "Parent node path", default: "." },
        name: { type: "string", description: "Node name" },
        mesh_type: { 
          type: "string", 
          description: "Primitive mesh type",
          enum: [
            "box", "sphere", "cylinder", "cone", "capsule", 
            "prism", "torus", "tube_torus", "cylinder_tube", "uv_sphere",
            "hemisphere", "icosphere", "octahedron", "diamond", "pentagon",
            "hexagon", "hexagonal_prism", "square", "triangle", "ruby",
            "emerald", "sapphire", "topaz", "quartz", "ametrine",
            "citrine", "kunzite", "morganite", "tourmaline", "zircon"
          ],
          default: "box"
        },
        size: {
          type: "object",
          description: "Mesh size",
          properties: {
            x: { type: "number", default: 1 },
            y: { type: "number", default: 1 },
            z: { type: "number", default: 1 },
          },
        },
        position: {
          type: "object",
          description: "World position",
          properties: {
            x: { type: "number", default: 0 },
            y: { type: "number", default: 0 },
            z: { type: "number", default: 0 },
          },
        },
      },
    },
  },

  setup_camera_3d: {
    name: "setup_camera_3d",
    description: "Configure Camera3D properties",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Camera3D node path" },
        fov: { type: "number", description: "Field of view" },
        size: { type: "number", description: "Frustum size (for Orthographic)" },
        near: { type: "number", description: "Near clip plane" },
        far: { type: "number", description: "Far clip plane" },
        current: { type: "boolean", description: "Make this the current camera" },
        projection: { 
          type: "string", 
          description: "Projection type",
          enum: ["perspective", "orthogonal"],
        },
        position: { type: "object", description: "Camera position" },
        look_at: { type: "object", description: "Point to look at" },
      },
      required: ["node_path"],
    },
  },

  setup_lighting: {
    name: "setup_lighting",
    description: "Add or configure light nodes",
    inputSchema: {
      type: "object",
      properties: {
        parent_path: { type: "string", description: "Parent node path", default: "." },
        name: { type: "string", description: "Light node name" },
        light_type: { 
          type: "string", 
          description: "Light type",
          enum: ["directional3d", "omni3d", "spot3d"],
        },
        color: { type: "string", description: "Light color (hex)" },
        energy: { type: "number", description: "Light energy" },
        indirect_energy: { type: "number", description: "Indirect light energy" },
        shadow_enabled: { type: "boolean", description: "Enable shadows", default: false },
        shadow_bias: { type: "number", description: "Shadow bias" },
        position: { type: "object", description: "Position (for Omni/Spot)" },
        rotation: { type: "object", description: "Rotation (for Directional)" },
        spot_angle: { type: "number", description: "Spot angle (for SpotLight3D)" },
        spot_attenuation: { type: "number", description: "Spot attenuation" },
      },
      required: ["light_type"],
    },
  },

  setup_environment: {
    name: "setup_environment",
    description: "Configure WorldEnvironment",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "WorldEnvironment node path" },
        background_mode: { 
          type: "string", 
          description: "Background mode",
          enum: ["clear", "sky", "color", "canvas", "keep_color", "extend"],
        },
        background_color: { type: "string", description: "Background color (hex)" },
        sky_mode: { type: "string", description: "Sky mode" },
        ambient_light_color: { type: "string", description: "Ambient light color (hex)" },
        ambient_light_energy: { type: "number", description: "Ambient light energy" },
        tonemap_mode: { type: "number", description: "Tonemap mode (0-4)" },
        glow_enabled: { type: "boolean", description: "Enable glow", default: false },
        glow_intensity: { type: "number", description: "Glow intensity" },
        fog_mode: { type: "string", description: "Fog mode" },
        fog_color: { type: "string", description: "Fog color (hex)" },
        fog_sun_color: { type: "string", description: "Fog sun color (hex)" },
      },
      required: ["node_path"],
    },
  },

  add_gridmap: {
    name: "add_gridmap",
    description: "Set up a GridMap node",
    inputSchema: {
      type: "object",
      properties: {
        parent_path: { type: "string", description: "Parent node path", default: "." },
        name: { type: "string", description: "GridMap node name" },
        cell_size: { 
          type: "object", 
          description: "Cell size",
          properties: {
            x: { type: "number", default: 1 },
            y: { type: "number", default: 1 },
            z: { type: "number", default: 1 },
          },
        },
        cell_scale: { type: "number", description: "Cell scale", default: 1 },
        mesh_library_path: { type: "string", description: "Path to MeshLibrary resource" },
      },
    },
  },

  set_material_3d: {
    name: "set_material_3d",
    description: "Set StandardMaterial3D properties on a mesh",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "MeshInstance3D node path" },
        albedo_color: { type: "string", description: "Albedo color (hex)" },
        metallic: { type: "number", description: "Metallic value (0-1)" },
        roughness: { type: "number", description: "Roughness value (0-1)" },
        emission_color: { type: "string", description: "Emission color (hex)" },
        emission_energy: { type: "number", description: "Emission energy" },
        texture_path: { type: "string", description: "Albedo texture path" },
        normal_texture_path: { type: "string", description: "Normal texture path" },
        uv_offset: { type: "object", description: "UV offset" },
        uv_scale: { type: "object", description: "UV scale" },
        cull_mode: { 
          type: "string", 
          description: "Culling mode",
          enum: ["back", "front", "disabled"],
        },
        transparency: { 
          type: "string", 
          description: "Transparency mode",
          enum: ["none", "alpha", "alpha_scissor", "alpha_hash", "alpha_layer", "double_side"],
        },
      },
      required: ["node_path"],
    },
  },
};
