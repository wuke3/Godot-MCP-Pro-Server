import { ToolDefinition } from "../protocol/mcp-types";

export const navigationTools: Record<string, ToolDefinition> = {
  setup_navigation_region: {
    name: "setup_navigation_region",
    description: "Configure NavigationRegion",
    inputSchema: {
      type: "object",
      properties: {
        parent_path: { type: "string", description: "Parent node path", default: "." },
        name: { type: "string", description: "Region name" },
        navigation_layers: { type: "number", description: "Navigation layers bitmask" },
        enter_cost: { type: "number", description: "Enter cost" },
        travel_cost: { type: "number", description: "Travel cost" },
      },
    },
  },

  setup_navigation_agent: {
    name: "setup_navigation_agent",
    description: "Configure NavigationAgent",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "NavigationAgent node path" },
        pathfinding_algorithm: { 
          type: "string", 
          description: "Pathfinding algorithm",
          enum: ["astar", "dijkstra"],
        },
        max_speed: { type: "number", description: "Maximum movement speed" },
        target_descriptions: { type: "number", description: "Target descriptions" },
        navigation_layers: { type: "number", description: "Navigation layers" },
        path_max_distance: { type: "number", description: "Maximum path distance" },
      },
      required: ["node_path"],
    },
  },

  bake_navigation_mesh: {
    name: "bake_navigation_mesh",
    description: "Bake navigation mesh",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "NavigationRegion node path" },
        cell_size: { type: "number", description: "Cell size" },
        cell_height: { type: "number", description: "Cell height" },
        agent_radius: { type: "number", description: "Agent radius" },
        agent_max_climb: { type: "number", description: "Agent max climb height" },
        agent_max_slope: { type: "number", description: "Agent max slope angle" },
        region_chunk_size: { type: "number", description: "Region chunk size" },
        partition_type: { type: "string", description: "Partition type", enum: ["watertight", "connectivity"] },
      },
      required: ["node_path"],
    },
  },

  set_navigation_layers: {
    name: "set_navigation_layers",
    description: "Set navigation layers on a node",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "Navigation node path" },
        layers: { type: "number", description: "Navigation layers bitmask" },
      },
      required: ["node_path"],
    },
  },

  get_navigation_info: {
    name: "get_navigation_info",
    description: "Get navigation setup information",
    inputSchema: {
      type: "object",
      properties: {
        node_path: { type: "string", description: "NavigationRegion or NavigationAgent path" },
      },
      required: ["node_path"],
    },
  },
};
