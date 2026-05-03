import { ToolDefinition } from "../protocol/mcp-types";

export const audioTools: Record<string, ToolDefinition> = {
  add_audio_player: {
    name: "add_audio_player",
    description: "Add AudioStreamPlayer node",
    inputSchema: {
      type: "object",
      properties: {
        parent_path: { type: "string", description: "Parent node path", default: "." },
        name: { type: "string", description: "Node name" },
        type: { type: "string", description: "Player type", enum: ["2d", "3d"], default: "2d" },
        stream_path: { type: "string", description: "Audio stream resource path" },
        volume_db: { type: "number", description: "Volume in dB", default: 0 },
        pitch_scale: { type: "number", description: "Pitch scale", default: 1.0 },
        autoplay: { type: "boolean", description: "Auto-play on load", default: false },
        bus: { type: "string", description: "Audio bus name", default: "Master" },
      },
    },
  },

  add_audio_bus: {
    name: "add_audio_bus",
    description: "Add an audio bus",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Bus name" },
        volume_db: { type: "number", description: "Volume in dB", default: 0 },
      },
      required: ["name"],
    },
  },

  add_audio_bus_effect: {
    name: "add_audio_bus_effect",
    description: "Add an effect to an audio bus",
    inputSchema: {
      type: "object",
      properties: {
        bus_index: { type: "number", description: "Audio bus index" },
        effect_type: { 
          type: "string", 
          description: "Effect type",
          enum: [
            "reverb", "delay", "eq", "compressor", "limiter",
            "filter", "chorus", "distortion", "panner"
          ],
        },
        enabled: { type: "boolean", description: "Effect enabled", default: true },
        properties: { type: "object", description: "Effect-specific properties" },
      },
      required: ["bus_index", "effect_type"],
    },
  },

  set_audio_bus: {
    name: "set_audio_bus",
    description: "Configure audio bus properties",
    inputSchema: {
      type: "object",
      properties: {
        bus_index: { type: "number", description: "Audio bus index" },
        volume_db: { type: "number", description: "Volume in dB" },
        mute: { type: "boolean", description: "Mute the bus" },
        solo: { type: "boolean", description: "Solo the bus" },
        bypass_fx: { type: "boolean", description: "Bypass effects" },
      },
      required: ["bus_index"],
    },
  },

  get_audio_bus_layout: {
    name: "get_audio_bus_layout",
    description: "Get the audio bus layout information",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  get_audio_info: {
    name: "get_audio_info",
    description: "Get audio-related information from a node",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "AudioStreamPlayer node path" },
      },
      required: ["node_path"],
    },
  },
};
