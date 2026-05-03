#!/usr/bin/env node

import { godotClient } from "./websocket-client.js";
import { getTools } from "./tools/index.js";
import { logger } from "./utils/logger.js";

interface CLICommand {
  name: string;
  description: string;
  execute: (args: string[]) => Promise<void>;
}

class GodotCLI {
  private tools: ReturnType<typeof getTools>;

  constructor() {
    this.tools = getTools("full");
  }

  async execute(args: string[]): Promise<void> {
    if (args.length === 0 || args[0] === "help" || args[0] === "--help" || args[0] === "-h") {
      this.printHelp();
      return;
    }

    const [group, command, ...rest] = args;
    const params = this.parseParams(rest);

    if (group === "help") {
      this.printGroupHelp(command || "");
      return;
    }

    const toolName = command ? `${group}_${command}` : group;
    const tool = this.tools[toolName];

    if (!tool) {
      console.error(`[CLI] Unknown command: ${group}${command ? " " + command : ""}`);
      console.error(`[CLI] Run 'node cli.js help' for available commands`);
      process.exit(1);
    }

    await this.runTool(toolName, params);
  }

  private parseParams(args: string[]): Record<string, unknown> {
    const params: Record<string, unknown> = {};

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg.startsWith("--")) {
        const key = arg.slice(2);
        const nextArg = args[i + 1];
        
        if (nextArg && !nextArg.startsWith("--")) {
          params[key] = this.parseValue(nextArg);
          i++;
        } else {
          params[key] = true;
        }
      } else if (arg.startsWith("-")) {
        const key = arg.slice(1);
        const nextArg = args[i + 1];
        
        if (nextArg && !nextArg.startsWith("-")) {
          params[key] = this.parseValue(nextArg);
          i++;
        } else {
          params[key] = true;
        }
      }
    }

    return params;
  }

  private parseValue(value: string): unknown {
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (value === "undefined") return undefined;
    
    const num = Number(value);
    if (!isNaN(num) && value.trim() !== "") {
      return num;
    }

    if (value.startsWith("[") || value.startsWith("{")) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    return value;
  }

  private async runTool(toolName: string, params: Record<string, unknown>): Promise<void> {
    console.log(`[CLI] Executing: ${toolName}`);
    console.log(`[CLI] Params:`, params);

    godotClient.start();

    await new Promise<void>((resolve) => {
      const checkConnection = setInterval(() => {
        if (godotClient.getConnectedPort() !== null) {
          clearInterval(checkConnection);
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkConnection);
        resolve();
      }, 5000);
    });

    try {
      const result = await godotClient.sendCommand(toolName, params);

      if (result.error) {
        console.error(`[CLI] Error:`, result.error.message);
        if (result.error.data) {
          console.error(`[CLI] Details:`, result.error.data);
        }
        process.exit(1);
      }

      console.log(`[CLI] Result:`);
      console.log(JSON.stringify(result.result || {}, null, 2));
    } catch (error) {
      console.error(`[CLI] Failed to execute command:`, error);
      process.exit(1);
    } finally {
      godotClient.stop();
    }
  }

  private printHelp(): void {
    console.log(`
Godot MCP CLI - Command Line Interface

Usage:
  node cli.js <group> <command> [options]

Groups:
  project      Project management tools
  scene        Scene manipulation tools
  node         Node operations
  script       Script editing tools
  editor       Editor tools
  input        Input simulation tools
  runtime      Runtime inspection tools

Examples:
  node cli.js project info
  node cli.js scene play --mode main
  node cli.js node add --type CharacterBody3D --name Player
  node cli.js input simulate_key --keycode KEY_ENTER --pressed true

Run 'node cli.js help <group>' for commands in a specific group.
    `);
  }

  private printGroupHelp(groupName: string): void {
    const groups: Record<string, string[]> = {
      project: ["get_project_info", "get_filesystem_tree", "search_files", "get_project_settings", "set_project_setting"],
      scene: ["get_scene_tree", "get_scene_file_content", "create_scene", "open_scene", "delete_scene", "add_scene_instance", "play_scene", "stop_scene", "save_scene"],
      node: ["add_node", "delete_node", "duplicate_node", "move_node", "update_property", "get_node_properties", "rename_node", "connect_signal", "disconnect_signal"],
      script: ["list_scripts", "read_script", "create_script", "edit_script", "attach_script", "get_open_scripts", "validate_script", "search_in_files"],
      editor: ["get_editor_errors", "get_editor_screenshot", "execute_editor_script", "clear_output", "get_signals", "reload_plugin", "reload_project"],
      input: ["simulate_key", "simulate_mouse_click", "simulate_mouse_move", "simulate_action", "simulate_sequence", "get_input_actions"],
      runtime: ["get_game_scene_tree", "get_game_node_properties", "set_game_node_property", "capture_frames", "monitor_properties", "start_recording", "stop_recording"],
    };

    if (!groupName || !groups[groupName]) {
      console.log("Available groups:");
      for (const [name, commands] of Object.entries(groups)) {
        console.log(`  ${name} (${commands.length} commands)`);
      }
      return;
    }

    console.log(`\n${groupName.toUpperCase()} commands:\n`);
    const commands = groups[groupName];
    for (const cmd of commands) {
      const tool = this.tools[`${groupName}_${cmd}`] || this.tools[cmd];
      if (tool) {
        console.log(`  ${cmd.padEnd(25)} ${tool.description}`);
      }
    }
    console.log();
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const cli = new GodotCLI();
  
  try {
    await cli.execute(args);
  } catch (error) {
    logger.error("CLI error:", error);
    process.exit(1);
  }
}

main();
