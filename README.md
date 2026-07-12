# Godot MCP Pro Server

独立实现的 Godot 4 MCP (Model Context Protocol) 服务器端，使用 TypeScript + Node.js 构建。通过 WebSocket 与 Godot 编辑器插件通信，为 AI 助手提供 174 个 Godot 开发工具。

> **⚠️ 法律声明与免责声明**：本项目为独立开发的开源软件，所有代码均为原创实现。本项目与任何商业软件、付费插件或专有产品无关联，也不包含、复制或衍生自任何专有代码。项目中使用的所有协议格式均基于公开的 JSON-RPC 2.0 标准和 MCP 开放规范。如有任何疑问或投诉，请通过 Issue 联系。

---

## 目录

- [功能特性](#功能特性)
- [架构概述](#架构概述)
- [工具模式](#工具模式)
- [安装步骤](#安装步骤)
- [配置与使用](#配置与使用)
  - [MCP 模式（推荐）](#mcp-模式推荐)
  - [CLI 命令行模式](#cli-命令行模式)
  - [Godot 插件配置](#godot-插件配置)
- [支持的 AI 客户端](#支持的-ai-客户端)
- [工具分类一览](#工具分类一览)
- [常见问题](#常见问题)
- [故障排除](#故障排除)
- [开发与贡献](#开发与贡献)
- [许可证](#许可证)
- [免责声明](#免责声明)

---

## 功能特性

- **174 个开发工具**：覆盖项目管理、场景编辑、节点操作、脚本编写、运行时调试、3D 开发、动画、物理、导航、音频、着色器、UI 主题、瓦片地图、测试分析、Android 部署等全流程
- **四种运行模式**：Full / 3D / Lite / Minimal，适配不同 AI 客户端的工具数量限制
- **WebSocket 通信**：Node.js 作为服务端监听端口，Godot 编辑器作为客户端主动连接
- **JSON-RPC 2.0 协议**：标准化的请求/响应格式，支持错误处理
- **心跳机制**：5 秒间隔心跳，30 秒超时自动重连
- **多端口支持**：端口 6505-6514，可同时连接多个 AI 会话
- **两种运行方式**：MCP stdio 模式（AI 助手调用）和 CLI 命令行模式（手动调用）
- **TypeScript 编写**：完整类型定义，易于扩展和维护

---

## 架构概述

```
┌───────────────┐      stdio / MCP       ┌──────────────────┐
│   AI 助手     │ ◄─────────────────────►│  Node.js Server  │
│ (Claude/Cursor│                         │   (本项目)       │
│   Cline 等)   │                         └────────┬─────────┘
└───────────────┘                                  │
                                                   │ WebSocket
                                                   │ (6505-6514)
                                                   ▼
                                          ┌──────────────────┐
                                          │  Godot 编辑器     │
                                          │  (插件配合)       │
                                          └──────────────────┘
```

**通信流程**：
1. Node.js 服务器启动后在端口 6505-6514 上监听 WebSocket 连接
2. Godot 编辑器插件启动后主动连接到这些端口
3. AI 助手通过 MCP 协议调用工具
4. Node.js 服务器将工具调用通过 WebSocket 转发给 Godot
5. Godot 执行命令并返回结果
6. 结果通过 MCP 协议返回给 AI 助手

---

## 工具模式

根据 AI 客户端的工具数量限制，可选择以下模式：

| 模式 | 工具数 | 适用客户端 | 说明 |
|------|--------|-----------|------|
| **Full** | 174 | Claude Code, Cline, VS Code Copilot, Cursor | 全部工具，功能最完整 |
| **3D** | 134 | 工具限制约 100-150 的客户端 | 3D 开发相关工具 + 核心功能 |
| **Lite** | 83 | Windsurf, JetBrains Junie, Gemini CLI | 常用核心工具 |
| **Minimal** | 35 | OpenCode, 本地小模型, 上下文有限的环境 | 最核心的基础工具 |

通过命令行参数切换模式：
```bash
node build/index.js --full      # 完整模式（默认）
node build/index.js --3d        # 3D 模式
node build/index.js --lite      # 轻量模式
node build/index.js --minimal   # 最小模式
node build/index.js --mode lite # 通用模式参数
```

---

## 安装步骤

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Godot 4.x（配合对应的 Godot 编辑器插件使用）

### 安装命令

```bash
# 克隆仓库
git clone <your-repo-url>
cd Godot-MCP-Pro-Server

# 进入服务端目录
cd server

# 安装依赖
npm install

# 构建 TypeScript
npm run build
```

构建完成后，可执行文件位于 `server/build/` 目录：
- `index.js` — MCP 服务器主入口
- `cli.js` — 命令行工具入口

---

## 配置与使用

### MCP 模式（推荐）

将服务器配置为 AI 客户端的 MCP 工具提供者。

#### Claude Desktop / Claude Code

在 `claude_desktop_config.json`（或 `.mcp.json`）中添加：

```json
{
  "mcpServers": {
    "godot": {
      "command": "node",
      "args": ["/absolute/path/to/Godot-MCP-Pro-Server/server/build/index.js", "--lite"]
    }
  }
}
```

> **提示**：将 `--lite` 替换为你需要的模式（`--full`、`--3d`、`--minimal`）。
> **注意**：路径必须是绝对路径。

#### Cursor

在 Cursor 设置 → MCP Servers 中添加：

```json
{
  "mcpServers": {
    "godot": {
      "command": "node",
      "args": ["/absolute/path/to/server/build/index.js", "--3d"]
    }
  }
}
```

#### Cline (VS Code)

在 VS Code 设置中搜索 "Cline: Mcp Servers"，添加：

```json
{
  "godot": {
    "command": "node",
    "args": ["/absolute/path/to/server/build/index.js", "--full"]
  }
}
```

#### Windsurf / JetBrains Junie

推荐使用 `--lite` 模式，工具数量适中。

---

### CLI 命令行模式

也可以直接通过命令行手动调用工具，用于调试或脚本集成。

#### 基本用法

```bash
cd server

# 查看帮助
node build/cli.js --help

# 调用工具（group_command 格式）
node build/cli.js project info
node build/cli.js get_editor_errors
node build/cli.js node add --type CharacterBody3D --name Player
node build/cli.js scene open --path res://scenes/Main.tscn
node build/cli.js script read --path res://scripts/Player.gd
```

#### 工具名格式

工具调用支持两种格式：
1. **组 + 命令**：`node cli.js <group> <command> [options]`
   - 例：`node cli.js node add --type Sprite2D`
2. **完整工具名**：`node cli.js <tool_name> [options]`
   - 例：`node cli.js add_node --type Sprite2D`

#### 参数传递

```bash
# 带参数调用
node build/cli.js simulate_key --keycode KEY_SPACE --pressed true
node build/cli.js set_property --node_path Player --property position --value "Vector2(100,200)"
node build/cli.js get_node_properties --node_path Player --properties '["position","rotation"]'
```

#### 可用工具组

共 52 个工具组：`add`, `analyze`, `apply`, `assert`, `assign`, `attach`, `bake`, `batch`, `capture`, `clear`, `click`, `compare`, `connect`, `create`, `cross`, `delete`, `deploy`, `detect`, `disconnect`, `duplicate`, `edit`, `execute`, `export`, `find`, `get`, `list`, `monitor`, `move`, `navigate`, `open`, `play`, `project`, `read`, `reload`, `remove`, `rename`, `replay`, `run`, `save`, `search`, `select`, `set`, `setup`, `simulate`, `start`, `stop`, `tilemap`, `uid`, `update`, `validate`, `wait`, `watch`

---

### Godot 插件配置

本服务器需要与 Godot 编辑器插件配合使用。请确保 Godot 中安装了对应的 WebSocket MCP 插件，插件将作为客户端自动连接到端口 6505-6514。

**使用步骤**：
1. 先启动 AI 客户端（MCP 模式会自动启动本服务器）
2. 打开 Godot 编辑器
3. 在 Godot 中启用 MCP 插件
4. 插件会自动尝试连接端口 6505-6514
5. 连接成功后即可在 AI 助手中使用 Godot 工具

> **注意**：请确保 Godot 插件版本与本服务器兼容。如果使用第三方 Godot MCP 插件，请参考其文档进行配置。

---

## 支持的 AI 客户端

理论上支持所有兼容 MCP 协议的 AI 客户端：

| 客户端 | 推荐模式 | 说明 |
|--------|---------|------|
| Claude Code / Claude Desktop | Full / 3D | 官方支持 MCP，体验最佳 |
| Cursor | Full / 3D | 内置 MCP 支持 |
| Cline (VS Code) | Full | VS Code 插件，支持 MCP |
| VS Code Copilot | 3D / Lite | 根据工具限制选择 |
| Windsurf | Lite | 支持 MCP |
| JetBrains Junie | Lite | JetBrains IDE 支持 |
| Gemini CLI | Lite | 支持 MCP |
| OpenCode | Minimal | 开源 IDE |
| 本地大模型 | Minimal | 上下文有限时使用 |

---

## 工具分类一览

### 核心开发（Core）
- **Project** — 项目信息、文件系统、搜索、项目设置、UID、Autoload
- **Scene** — 场景打开/保存/播放、场景树、场景依赖
- **Node** — 节点增删改查、属性操作、父子关系、移动复制
- **Script** — 脚本读写、创建、编辑、附加、验证
- **Editor** — 编辑器错误、截图、输出日志、信号、编辑器脚本、相机、自动关闭弹窗
- **Input** — 键盘/鼠标/动作模拟、输入序列
- **Runtime** — 运行时场景树、节点属性、游戏脚本、UI 交互、节点查找、等待

### 高级功能（Additional）
- **Animation** — 动画列表、创建、轨道、关键帧、信息
- **Animation Tree** — 动画树创建、结构、状态机、混合树、参数设置
- **3D Scene** — 3D 节点创建、变换、光照、相机、材质
- **Physics** — 物理体、碰撞、层、射线检测、物理信息
- **Navigation** — 导航区域、代理、烘焙、层、信息
- **Particle** — 粒子系统创建与配置
- **Audio** — 音频播放器、总线、效果、布局
- **TileMap** — 瓦片地图单元格、填充、信息、已用单元格
- **Theme** — 主题创建、颜色、常量、字体、样式、控件设置
- **Shader** — 着色器创建、读写、编辑、材质分配
- **Resource** — 资源读写、创建、预览
- **Export** — 项目导出、预设、导出信息
- **Batch** — 批量查找、属性设置、节点引用、跨场景操作
- **Analysis** — 场景复杂度、信号流、未使用资源、循环依赖、脚本引用、项目统计
- **Profiling** — 性能监控、编辑器性能
- **Testing** — 测试场景、断言、截图对比、压力测试、测试报告
- **Input Map** — 输入动作列表、设置
- **Android** — Android 部署、设备、打包

---

## 常见问题

### Q: 服务器启动后 Godot 连不上怎么办？
A: 请检查以下几点：
1. 确认 Node.js 服务器已启动（端口 6505-6514 正在监听）
2. 确认 Godot 插件已启用
3. 检查防火墙是否阻止了本地端口连接
4. 查看 Godot 输出日志中的连接错误信息

### Q: 工具调用没反应？
A: 
1. 确认 Godot 客户端已成功连接（查看服务器日志）
2. 检查工具名是否正确（区分大小写）
3. 查看 AI 客户端的 MCP 日志
4. 确认参数格式正确

### Q: 不同模式有什么区别？
A: 模式仅影响暴露给 AI 助手的工具数量，不影响服务器功能。工具数量越少，AI 上下文占用越小，响应可能越快。建议根据 AI 客户端的工具限制选择合适的模式。

### Q: 可以同时连接多个 AI 会话吗？
A: 可以。服务器监听 10 个端口（6505-6514），每个端口可接受一个 Godot 连接。每个 AI 会话应使用独立的服务器实例（不同端口）。

### Q: 支持 Godot 3 吗？
A: 本项目针对 Godot 4.x 设计，不保证 Godot 3 兼容性。

### Q: 可以在远程机器上运行吗？
A: 可以，但需要注意安全风险。WebSocket 服务器默认监听所有网络接口，建议仅在本地或受信任的网络环境中使用。如需远程访问，请配置防火墙或 VPN。

---

## 故障排除

### 错误："No Godot connection available"
- 原因：Godot 客户端未连接到服务器
- 解决：
  1. 确认 Godot 中 MCP 插件已启用
  2. 确认 Godot 插件尝试连接的端口与服务器监听端口一致
  3. 重启 Godot 编辑器

### 错误：端口被占用
- 原因：端口 6505-6514 已被其他进程使用
- 解决：关闭占用端口的进程，或修改源代码中的端口配置

### TypeScript 构建失败
- 运行 `npm install` 确保依赖完整
- 确认 TypeScript 版本兼容（`npm list typescript`）
- 尝试删除 `build/` 和 `node_modules/` 后重新安装

### MCP 连接失败
- 检查 Node.js 路径是否正确
- 检查服务器路径是否为绝对路径
- 查看 AI 客户端的 MCP 日志获取详细错误
- 手动运行 `node build/index.js` 测试是否正常启动

---

## 开发与贡献

### 项目结构

```
Godot-MCP-Pro-Server/
├── server/
│   ├── src/
│   │   ├── index.ts              # MCP 服务器主入口
│   │   ├── cli.ts                # CLI 命令行入口
│   │   ├── websocket-server.ts   # WebSocket 服务器实现
│   │   ├── protocol/
│   │   │   ├── mcp-types.ts      # 类型定义
│   │   │   └── jsonrpc.ts        # JSON-RPC 2.0 工具
│   │   ├── tools/
│   │   │   ├── core.ts           # 核心工具定义
│   │   │   ├── additional.ts     # 高级工具定义
│   │   │   └── index.ts          # 工具聚合与模式配置
│   │   └── utils/
│   │       ├── config.ts         # 配置与参数解析
│   │       └── logger.ts         # 日志工具
│   ├── build/                    # 编译输出（构建后生成）
│   ├── package.json
│   └── tsconfig.json
├── README.md
├── LICENSE
└── .gitignore
```

### 本地开发

```bash
cd server

# 监听模式自动编译
npm run dev

# 手动构建
npm run build

# 启动 CLI 测试
node build/cli.js --help
```

### 添加新工具

1. 在 `src/tools/core.ts` 或 `src/tools/additional.ts` 中添加工具定义
2. 在 `src/tools/index.ts` 的 `ALL_TOOLS` 中确认已包含
3. 如需在特定模式中启用，将工具名加入对应的 Set
4. 运行 `npm run build` 重新构建

---

## 许可证

MIT License — 详见 [LICENSE](LICENSE) 文件。

---

## 免责声明

### 项目性质声明

本项目是一个**独立的、开源的** MCP 服务器实现，旨在为 Godot 游戏引擎开发者提供 AI 辅助开发工具。

### 知识产权声明

1. **独立实现**：本项目所有代码均为独立开发，不包含任何专有软件的源代码、二进制代码或派生代码。
2. **标准协议**：项目使用的 JSON-RPC 2.0 协议和 MCP (Model Context Protocol) 均为公开标准或开放规范。
3. **通用功能**：工具设计基于 Godot 编辑器的公开 API 和通用游戏开发工作流，属于功能性描述，不受版权保护。
4. **开源依赖**：项目仅使用开源库（TypeScript, ws, @modelcontextprotocol/sdk 等），所有依赖均有各自的开源许可证。

### 无担保声明

本软件按"原样"提供，不提供任何形式的明示或暗示担保，包括但不限于对适销性、特定用途适用性和非侵权性的担保。在任何情况下，作者或版权持有人均不对因软件或软件使用或其他交易引起的任何索赔、损害或其他责任承担责任。

### 使用风险

用户自行承担使用本软件的所有风险。对于因使用本软件而导致的任何直接或间接损失，项目作者不承担任何责任。

### 商标声明

本项目中提及的所有产品名称、商标和注册商标均为其各自所有者的财产，仅用于描述目的。本项目与这些公司/产品无任何关联、授权或从属关系。

- Godot 是 Godot Engine 社区的商标
- Claude 是 Anthropic 的商标
- Cursor 是 Anysphere 的商标
- VS Code 是 Microsoft 的商标

### DMCA / 版权投诉

如果您认为本项目侵犯了您的版权，请通过 GitHub Issue 联系我们，并提供以下信息：
1. 版权所有者的身份证明
2. 被控侵权内容的具体位置
3. 侵权的详细说明
4. 您的联系方式

我们将在收到通知后尽快处理。

---

<p align="center">
  <em>Made with ❤️ for the Godot open-source community</em>
</p>
