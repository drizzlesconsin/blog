---
author: drizzle
date: 2019-06-25
tags: [react-native]
cover: https://images.unsplash.com/photo-1561736778-92e52a7769ef
---

# React-Native 开发碰到的问题汇总

> 记录开发时，遇到的一些问题及解决方法。

## Environment

```bash
react-native: 0.58.5
```

## iOS 模拟器无法调用开发菜单 (Mac OS)

**解决：**Xcode -> Product -> Scheme -> Edit Scheme -> Run -> `Build Configuration` 修改为 `Debug`

## 执行 `react-native info` 无法显示 Xcode 版本号

> `IDEs: Xcode: /undefined - /usr/bin/xcodebuild`  版本号显示 `undefined`

**解决：**执行 `sudo xcode-select -s /Applications/Xcode.app`

## No bundle URL present

> 错误信息: Make sure you’re running a packager server or have included a .jsbundle file in your application bundle.

报这个错误，试过各种办法：

1. `rm -rf ios/build/; kill $(lsof -t -i:8081); react-native run-ios`
2. `sudo xcodebuild -license` 同意 iOS 许可
3. 在 Xcode 中，选中 `main.jsbundle` 文件，在右侧 Target Membership 勾选项目
4. `npm install && react-native run-ios`

以上方法对我的环境均无效。

**解决：**关闭全局代理（你懂的）即可。

## Error: spawnSync ./gradlew EACCES

权限问题，执行下面的代码即可解决：

```bash
chmod 755 android/gradlew
```
