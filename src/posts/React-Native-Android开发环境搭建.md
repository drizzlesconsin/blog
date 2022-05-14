---
author: drizzle
date: 2019-06-22
tags: [react-native]
cover: https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb
---

# React Native Android 开发环境搭建 (macOS/Windows)

## Environment

```bash
OS: macOS 10.14.5 & Windows 10
Yarn: 1.15.2
```

## 安装依赖

- node.js
- python2.7
- react-native-cli
- jdk8
- android studio

### macOS

```bash
# 安装 brew
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 安装 Node
$ brew install node

# 安装 Watchman (监视文件系统变更的工具)
$ brew install watchman

# macOS 自带 python 环境，不需要安装
$ python --version
Python 2.7.10
```

### Windows

#### Node.js

[下载地址](https://nodejs.org/en/)，版本需要在 **8.3** 及以上。

```bash
# 查看是否安装成功
$ node -v
v10.11.0

$ npm -v
6.4.1
```

#### Python2

[下载地址](https://www.python.org/downloads/release/python-2716/)，Python 的版本必须为 2.x（不支持 3.x）

1. 双击安装
2. 到 **Customize Python 2.7.16 (64-bit)** 这一步，点击 **Add python.exe to Path** 将 Python 添加到 Path 环境变量。
3. 最后完成安装。

```bash
# 查看是否安装成功
$ python
Python 2.7.16 (v2.7.16:413a49145e, Mar  4 2019, 01:37:19) [MSC v.1500 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

### React Native 命令行工具 (cli)

```bash
$ npm install -g react-native-cli

$ react-native -v # 查看是否安装成功
react-native-cli: 2.0.1
react-native: n/a - not inside a React Native project directory
```

### JDK (Java Development Kit)

[Java SE 8 Archive Downloads 下载地址](https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html)，版本必须是 1.8（目前不支持 1.9 及更高的版本）

1. 往下拉找到 `Java SE Development Kit 8u191`, 先点击 `Accept License Agreement` 同意协议。
2. **Windows** 点击 `jdk-8u211-windows-x64.exe` , **macOS** 点击 `jdk-8u191-macosx-x64.dmg` 下载。
3. 注册登录后下载安装。（下载速度不能接受，可以复制下载链接到类似迅雷之类的软件下载）
4. 安装完成后，打开命令行输入 `java -version`

```bash
$ java -version
java version "1.8.0_91"
Java(TM) SE Runtime Environment (build 1.8.0_91-b15)
Java HotSpot(TM) 64-Bit Server VM (build 25.91-b15, mixed mode)
```

~~如果不显示上方信息，还需要配置一下环境变量~~ **(1.8版本后的 JDK 会自动添加)**

- ~~在 Windows 打开设置面板，搜索 `环境变量`，点击 系统属性 → 高级 → 环境变量 → 系统变量~~
- ~~双击 Path, 新建一个变量：`C:\ProgramData\Oracle\Java\javapath`, 如还有其它问题，查阅相关 JDK 环境变量文章。~~

## Android 开发环境

### 安装 Android Studio

> 下载并安装 Android Studio [地址①](http://www.android-studio.org/) [地址②](https://developer.android.com/studio/index.html)

安装完成后，打开 Android Studio:

+ 启动进入显示欢迎页，**Welcome**, 直接 Next.
+ Install Type, 选择 **Custom**, Next.
+ Select UI Theme, 随便选一个 **Darcula**, Next.
+ SDK Components Setup, 确保选中以下组件：（安装路径默认，Next）
  + Android SDK
  + Android SDK Platform
  + Performance (Intel ® HAXM)
  + Android Virtual Device
+ Emulator Settings 模拟器设置，默认即可，Next.
+ Verify Settings, 点击 Finish, 等待完成！

### 安装 Android SDK

+ 在欢迎界面，点击右下角的 **Configure**, 选择 **SDK Manager** 进入 **Android SDK** 管理界面
  + (Default Settings) 路径：Appearance & Behavior > System Settings > Android SDK
+ 在 **SDK Platforms** 选项卡右下角勾上 **Show Package Details**, 并确保在 Android 9 (Pie) 下选中以下组件：
  + Android SDK Platform 28 (Android Studio 默认会安装最新版本的 Android SDK. 如果已安装(Installed)，不用管)
  + Intel x86 Atom_64 System Image（官方模拟器镜像文件，使用非官方模拟器不需要安装此组件）
+ 点击 **SDK Tools** 选项卡，同样勾中右下角的 **Show Package Details**, 并且确保在 Android SDK Build-Tools 下选中 RN 所必须的 `28.0.3` 版本。
+ 最后点击 Apply 进行安装，安装完成点击 OK。

### 配置 ANDROID_HOME 环境变量

#### macOS

如果使用的是 macOS 默认的命令行工具，则打开 terminal 执行 `vi ~/.bash_profile`, 添加以下代码：

如果使用的是 zsh, 则执行 `vi ~/.zshrc`. 在最后面添加以下代码：

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

执行 `source $HOME/.bash_profile` 或者 `source $HOME/.zshrc` 使环境变量生效。

最后，执行 `echo $ANDROID_HOME`, 查看输出的 SDK 路径是否与 Android Studio (`Preferences → Appearance & Behavior → System Settings → Android SDK`) 里的 Android SDK 一致。

#### Windows

+ Win10 打开设置面板，搜索 `环境变量`，点击 系统属性 -> 高级 -> 环境变量 -> 系统变量。
+ 新建系统变量，变量名：`ANDROID_HOME`, 变量值：`c:\Users\你的用户名\AppData\Local\Android\Sdk` (SDK 默认安装目录)

**将 platform-tools 目录添加到环境变量 Path**

+ 环境变量打开方式同上
+ 双击系统变量中的 Path，点击新建，输入：`C:\Users\你的用户名\AppData\Local\Android\Sdk\platform-tools`

## 创建第一个 RN 项目

```bash
$ react-native init AwesomeProject
```

至此，开发环境搭建完成。Enjoy!

## TODO

+ 补充 Gif 演示图片

## REF

+ https://reactnative.cn/docs/getting-started.html
+ https://facebook.github.io/react-native/docs/getting-started