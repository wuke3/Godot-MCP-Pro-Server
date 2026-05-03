#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('[Setup] Installing Godot MCP Server dependencies...');

const serverDir = path.dirname(__dirname);
const nodeModulesDir = path.join(serverDir, 'node_modules');

if (!fs.existsSync(nodeModulesDir)) {
    console.log('[Setup] Running npm install...');
    try {
        execSync('npm install', { 
            cwd: serverDir, 
            stdio: 'inherit' 
        });
        console.log('[Setup] Dependencies installed successfully!');
    } catch (error) {
        console.error('[Setup] Failed to install dependencies:', error.message);
        process.exit(1);
    }
} else {
    console.log('[Setup] Dependencies already installed.');
}

console.log('[Setup] Building TypeScript...');
try {
    execSync('npm run build', { 
        cwd: serverDir, 
        stdio: 'inherit' 
    });
    console.log('[Setup] Build completed successfully!');
} catch (error) {
    console.error('[Setup] Build failed:', error.message);
    process.exit(1);
}

console.log('[Setup] Done! You can now run:');
console.log('  npm start           - Start MCP server (MCP mode)');
console.log('  npm run cli         - Start CLI mode');
console.log('  npm run dev         - Development mode with watch');
