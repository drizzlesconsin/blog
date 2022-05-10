---
author: drizzle
date: 2020-06-27
---

# 网络抓包工具

## Proxyman

一款 HTTP 调试工具，主要吸引我使用的是 UI，当然工具不能只看外观，功能当然重要。Map Local, Map Remote... 更多功能介绍看 [官网](https://proxyman.io/)

### 安装

除了去 [仓库](https://github.com/ProxymanApp/Proxyman/releases) 下载，还可以通过 Homebrew 下载

```bash
$ brew cask install proxyman
```

### 电脑端安装证书

1. 菜单栏找到：**Certificate** -> **Install Certificate on this Mac...**
2. 在 **Automatic** 标签栏下点击 **Install & Trust Certificate**
3. 安装成功后，会提示 **Installed & Trusted!**

### 移动端安装证书

#### 下载证书

Android: **Certificate** -> **Install Certificate on Android** -> **Physical Devices...**

iOS: **Certificate** -> **Install Certificate on iOS** -> **Physical Devices...**（也支持模拟器）

#### Android 安装指南

1. 打开设置—WLAN—长按当前连接的 WiFi—修改网络—显示高级选项—选择代理—手动—配置服务器、端口。
2. 浏览器打开 **http://proxy.man/ssl**，在弹出的证书安装器中，填写证书名称，选择 **VPN 和应用**，点击确定即可安装成功后开始享用。
3. 如果是 Android 11+，还需要打开设置—安全—加密与凭证—安装证书—CA Certificate。

#### iOS 安装指南

1. 设置—WiFi—点击当前连接的 Wi-Fi —HTTP 代理(拉到最底部)，点击**配置代理**—设置为**手动**，配置服务器、端口为弹窗中对应信息即可。
2. 配置好代理后，在 Safari 浏览器中打开 **http://proxy.man/ssl**，弹窗提示下载描述文件，**允许**即可。
   - 下载成功后，再打开**设置**—**已下载描述文件**—**安装**。
   - 安装成功，需要信任证书，再进到**设置**—**通过**—**关于本机**—**证书信任设置**—**开启 Proxyman CA...**
3. 不出问题就可以在电脑上观摩请求。

> 打不开 ssl 地址通常就是代理没有配置正确，或者开着**梯子**。
> 信任证书这一步也重要，不能漏。

![iOS Setup Guide](https://proxyman.imgix.net/assets/images/Dashboard_Proxyman_Update.jpg)

<div align="center">图片引用自 Proxyman 官网</div>

### 抓包 HTTPS

在左侧面板的远程设备，选择要抓包的 Host，右键启用 HTTPS -> **Enable HTTPS Response** 就会看到一把打开的锁。

## Wireshark

// TODO
