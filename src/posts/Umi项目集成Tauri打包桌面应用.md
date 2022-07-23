---
author: drizzle
date: 2022-07-13
tags: [tauri]
cover: https://images.unsplash.com/photo-1633419461186-7d40a38105ec
---

# Umi 项目集成 Tauri 打包桌面应用

选择 Tauri，主要是 tauri 打包体积小，不用像 Electron 一样打包 Chromium, 把黑洞 `node_modules` 整个打包进去。不过也是有方法优化这个问题的，可以做到只打包生产环境的依赖。当然还有别的优化方案，毕竟业界的 Visual Studio Code 就摆在那里。这不是重点，本文主要是尝新，时间充裕给项目准备两套打包方案。

2022 年明显感觉到一些的编程语言(go, zig, rust) 开发的生态工具，在速度和性能方面都远超使用 JavaScript (解释型编程语言) 开发的。举几个栗子：

**[Vite](https://vitejs.dev/)**

前端新一代打包工具 Vite，利用 esbuild 预构建依赖，esbuild 基于 **Go** 开发，构建速度直接带来的收益就是可以早下班。回头看 webpack 就像一头老牛，webpack 的棺材盖已经悬着。

**[Bun](https://bun.sh/)**

最近新出的一个全能工具，不过目前还不能在生产环境中使用。Bun 是基于 **Zig** 语言开发的全家桶 JS 运行时，官网的性能对比完爆 Node.js。对 Zig 编程语言比较陌生，毕竟日常是写前端的。

**[Tauri](https://tauri.app/)**

Tauri 是个跨平台 GUI 框架，前端调用系统自带的 WebView，后端基于 **Rust** 开发。对标 Electron，没有巨大的 Chromium 内核，打包更小、运行更快，内存消耗也比 Electron 小。后续还会支持打包到移动设备。

另外还有对标 babel 的 swc 也是基于 Rust 编写，Rust 在前端领域工具基建可谓是前途一片光明，是 JS 工具的未来。前端生态圈越来越多工具使用 Rust 重写，必须再次打开学习 Rust 的大门(写给自己)，否则以后配置都不会配。

以上是观察到一些变化，接下来开始集成 Tauri 的教程。

## 环境版本

```json
umi: "^4.0.8"
rustc 1.62.1
```

Rust 环境必装，其它安装项看个人系统环境，macOS 装 xcode, Windows C++ 编译工具，具体看 [文档](https://tauri.app/v1/guides/getting-started/prerequisites/)。环境配置过程比 React Native 舒服太多。

## 安装 Tauri

```bash
$ pnpm add -D @tauri-apps/cli
```

使用可以和系统交互的 Tauri API.

```bash
$ pnpm add @tauri-apps/api
```

## 创建 Rust 项目配置

```bash 
$ pnpm tauri init
```

初始化需要配置一些基本信息，一路回车后可到 `src-tauri/tauri.conf.json` 修改。**注意打包前需要修改 `bundle.identifier` 应用的包名。**

```js 
{
  "$schema": "../node_modules/@tauri-apps/cli/schema.json",
  "build": {
    // 生产环境调试前执行的指令
    "beforeBuildCommand": "pnpm build",
    // 开发环境调试前执行的指令
    "beforeDevCommand": "pnpm dev",
    // 配置与 Umi 开发环境的端口一致
    "devPath": "http://localhost:8000",
    // 前端打包出来的物料单独部署，需要改线上域名: https://www.xxx.com
    // 本地运行或 debug 的版本改为: ../dist，与 Umi 物料输出目录一致
    "distDir": "../dist"
  },
  "package": {
    // 打包的执行文件名、第一项菜单显示的名称、关于里面显示的名称
    "productName": "XXX 桌面版",
    // 菜单—关于，里面显示的版本号
    "version": "0.1.0"
  },
  "tauri": {
    "allowlist": {
      "all": true
    },
    "bundle": {
      // 不能默认 com.tauri.dev，需要修改
      "identifier": "com.umi.app",
    },
    // .......
    "windows": [
      {
        "fullscreen": false,
        "height": 600,
        "resizable": true,
        "title": "XXX 桌面版",
        "width": 800
      }
    ]
  }
}
```

### 配置 package.json

定义脚本命令，也可以直接 `pnpm tauri dev` or `pnpm tauri build`.

```diff
{
  "scripts": {
  	"dev": "umi dev",
    "build": "umi build",
+   "tauri:dev": "tauri dev",
+   "tauri:build": "tauri build",
+   "tauri:build-debug": "tauri build --debug"
  }
}
```

### 运行项目

```bash
$ pnpm dev
$ pnpm build
```

> Please note that `.msi` installers can **only be created on Windows** as cross-compilation doesn't work yet.

Tauri 目前还[不支持跨平台打包](https://tauri.app/zh/v1/guides/building/windows)，只能在对应系统上编译。不过可以用 GitHub Actions [(官方提供的 Action)](https://github.com/tauri-apps/tauri-action) 解决这个问题。

- 打包输出的安装包位置： `src-tauri/target/release/bundle`.
- debug 版本：`src-tauri/target/debug`.

### 修改窗口大小填满屏幕

```diff
// tauri.conf.json
"windows": [
  {
    "fullscreen": false,
-    "height": 600,
    "resizable": true,
     // 标题栏显示的文本
    "title": "ABCD 桌面版",
-   "width": 800,
+   "maximized": true
  }
]
```

### 更新图标

> 推荐的图标尺寸为 1240x1240，是为了更好的适配 Windows 平台。
>
> 如果发现在 macOS 启动台或者 Dock 的图标偏大，图标四周需要一定留白。

Tauri 非常贴心的提供了一个 tauricon 指令。准备一张 1240x1240 大小的 `app-icon.png` 图片或者 svg 放到项目根目录。

```bash
# 不带路径默认在根目录查找
$ npx @tauri-apps/tauricon

# 指定图标路径
$ npx @tauri-apps/tauricon ./public/app-icon.png
```

其它问题后续补充，Enjoy! 🎉
