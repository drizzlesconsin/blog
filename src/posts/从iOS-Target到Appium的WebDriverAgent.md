---
author: drizzle
date: 2022-02-15
tags: [Automatic]
---

# 从 iOS-Target 到 Appium 的 WebDriverAgent

> 每次接触 Xcode 相关的东西，都需要记下来。

第一次试了 iOS-Target 没能成功连接。

## 环境

```js
Xcode: 13.1
MacOS: 12.0.0
iOS: 14.8.0
```

## 步骤

### 安装依赖

```bash
git clone https://github.com/appium/WebDriverAgent.git
```

### 在 Xcode 中，打开根目录的 `WebDriverAgent.xcodeproj` 文件

### 其他步骤参考

https://cloud.tencent.com/developer/article/1864001

### 通过 `tidevice` 连接真机

> https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485577&idx=1&sn=bdc1895134f66c7e106f6cb668d77f13

```bash
tidevice list # 查看设备

tidevice applist # 查看APP
```

1. 指定 BundleID 启动

```bash
tidevice xctest -B com.gameappium.WebDriverAgentRunner.xctrunner
```

在 AirtestIDE 可以通过两种地址连接

+ **推荐**:  `http+usbmux://[DeviceIdentifier]`  DeviceIdentifier 在上面的命令执行后会打印出来。

+ **麻烦**: `http://locahost:8100/` 需要再开个窗口执行 ` tidevice relay 8100 8100` 才可以连接。

2. 通过 wdaproxy 启动

```bash
tidevice wdaproxy -B com.gameappium.WebDriverAgentRunner.xctrunner --port 8200
```

## 通过 iOS-Tagent

安装部署流程：https://github.com/AirtestProject/IOS-Tagent

通过 Xcode 编译打开 `ServerURLHere->http://192.168.0.100:8100<-ServerURLHere` 访问地址

此时的 `sessionId`  会为 `null`

需要通过 iproxy 映射端口后，才能正常显示。

```base
brew install libimobiledevice
iproxy 8100 8100
```

### 踩到的坑

1. 修改 `Product Bundle Identifier` 后，`Signing & Capabilities -> Signing` 的 `Bundle Identifier` 也需要对应上。
2. `Product -> Test` 后，直接访问这个地址 `ServerURLHere->http://192.168.0.100:8100<-ServerURLHere` 这里的地址。打开后，会看一个 JSON, `sessionId` 有值大概就是成功了。
   再访问 `http://192.168.0.100:8100/status` 就能看到手机的一些信息。
3. 注意连接的顺序：
   - 先执行启动命令
   - 在手机上打开 `WebDriverAgent` 应用
   - 再到 AirtestIDE 编辑器中连接。（点击 `Connect` 没有 `Loading` 状态，稍微等会...）

## 一些报错

### WebDriverAgent.xcodeproj Building for iOS, but the embedded framework 'CocoaAsyncSocket.framework' was built for iOS + iOS Simulator.

> https://github.com/appium/appium/issues/14952#issuecomment-747081761

解决：找到 `WebDriverAgent -> Build Settings -> All -> Build Options`, 把 `Validate Workspace` 设为 `Yes`.

### The operation couldn’t be completed. Unable to launch com.xxxx.xxxx.xctrunner because it has an invalid code signature, inadequate entitlements or its profile has not been explicitly trusted by the user.

> 未信任开发者证书，点击对应 APP 图标时，也会有提示。

解决: 设置 -> 通用 -> 设备管理，信任对应的证书即可。

## REF

- https://github.com/AirtestProject/iOS-Tagent/blob/master/Introduction/README_zh.md
- https://cloud.tencent.com/developer/article/1864001
- [Airtest IDE iOS 连接](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/4_ios_connection/)
