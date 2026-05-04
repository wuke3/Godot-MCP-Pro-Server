#!/usr/bin/env node
import { godotClient } from "./websocket-client.js";
import { getTools } from "./tools/index.js";
import { logger } from "./utils/logger.js";

class GodotCLI {
  private tools = getTools("full");

  async execute(args: string[]): Promise<void> {
    if (args.length === 0 || args[0] === "help" || args[0] === "--help") {
      this.printHelp();
      return;
    }

    const [group, command, ...rest] = args;
    const params = this.parseParams(rest);
    const toolName = command ? `${group}_${command}` : group;
    const tool = this.tools[toolName];

    if (!tool) {
      console.error(`[CLI] Unknown command: ${group}${command ? " " + command : ""}`);
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
        if (nextArg && !nextArg.startsWith("--")) { params[key] = this.parseValue(nextArg); i++; }
        else params[key] = true;
      } else if (arg.startsWith("-")) {
        const key = arg.slice(1);
        const nextArg = args[i + 1];
        if (nextArg && !nextArg.startsWith("-")) { params[key] = this.parseValue(nextArg); i++; }
        else params[key] = true;
      }
    }
    return params;
  }

  private parseValue(value: string): unknown {
    if (value === "true") return true;
    if (value === "false") return false;
    const num = Number(value);
    if (!isNaN(num) && value.trim() !== "") return num;
    return value;
  }

  private async runTool(toolName: string, params: Record<string, unknown>): Promise<void> {
    console.log(`[CLI] Executing: ${toolName}`, params);
    godotClient.start();
    await new Promise<void>((resolve) => {
      const check = setInterval(() => { if (godotClient.getConnectedPort() !== null) { clearInterval(check); resolve(); } }, 100);
      setTimeout(() => { clearInterval(check); resolve(); }, 5000);
    });
    try {
      const result = await godotClient.sendCommand(toolName, params);
      if (result.error) { console.error(`[CLI] Error:`, result.error.message); process.exit(1); }
      console.log(`[CLI] Result:`, JSON.stringify(result.result || {}, null, 2));
    } catch (error) {
      console.error(`[CLI] Failed:`, error);
      process.exit(1);
    } finally {
      godotClient.stop();
    }
  }

  private printHelp(): void {
    console.log(`
Godot MCP CLI

Usage:
  node cli.js <group> <command> [options]

Groups:
  project, scene, node, script, editor, input, runtime

Examples:
  node cli.js project info
  node cli.js scene play --mode main
  node cli.js node add --type CharacterBody3D --name Player

Run 'node cli.js help' for more info.
`);
  }
}

async function main(): Promise<void> {
  const cli = new GodotCLI();
  try {
    await cli.execute(process.argv.slice(2));
  } catch (error) {
    logger.error("CLI error:", error);
    process.exit(1);
  }
}

main();
