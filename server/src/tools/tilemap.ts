import { ToolDefinition } from "../protocol/mcp-types";

export const tilemapTools: Record<string, ToolDefinition> = {
  tilemap_set_cell: {
    name: "tilemap_set_cell",
    description: "Set a single tile cell",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "TileMap node path" },
        x: { type: "number", description: "Cell X coordinate" },
        y: { type: "number", description: "Cell Y coordinate" },
        tile_id: { type: "number", description: "Tile ID to set (-1 to clear)" },
        alternative_tile: { type: "number", description: "Alternative tile ID", default: -1 },
      },
      required: ["node_path", "x", "y"],
    },
  },

  tilemap_fill_rect: {
    name: "tilemap_fill_rect",
    description: "Fill a rectangular region with tiles",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "TileMap node path" },
        x1: { type: "number", description: "Start X coordinate" },
        y1: { type: "number", description: "Start Y coordinate" },
        x2: { type: "number", description: "End X coordinate" },
        y2: { type: "number", description: "End Y coordinate" },
        tile_id: { type: "number", description: "Tile ID to fill with" },
        alternative_tile: { type: "number", description: "Alternative tile ID", default: -1 },
      },
      required: ["node_path", "x1", "y1", "x2", "y2", "tile_id"],
    },
  },

  tilemap_get_cell: {
    name: "tilemap_get_cell",
    description: "Get tile data at a specific cell",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "TileMap node path" },
        x: { type: "number", description: "Cell X coordinate" },
        y: { type: "number", description: "Cell Y coordinate" },
      },
      required: ["node_path", "x", "y"],
    },
  },

  tilemap_clear: {
    name: "tilemap_clear",
    description: "Clear all cells in the TileMap",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "TileMap node path" },
      },
      required: ["node_path"],
    },
  },

  tilemap_get_info: {
    name: "tilemap_get_info",
    description: "Get TileMap information and tile set sources",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "TileMap node path" },
      },
      required: ["node_path"],
    },
  },

  tilemap_get_used_cells: {
    name: "tilemap_get_used_cells",
    description: "Get a list of all used cells in the TileMap",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "TileMap node path" },
      },
      required: ["node_path"],
    },
  },
};
