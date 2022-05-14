---
author: drizzle
date: 2019-06-26
tags: [react-native, iOS]
cover: https://images.unsplash.com/photo-1603515161074-3206aaeb03f2
typora-root-url: ..
---

# React-Native 打包 IPA 文件全流程(Ad-Hoc)

## Environment

```bash
VMware Workstation 14 Pro: 14.0.0
macOS Mojave: 10.14.0
Xcode: 10
Node: 11
react-native: 0.58.2
```

## 注册开发者账号

[注册地址](https://developer.apple.com/cn/support/enrollment/)

> 详细的注册流程，由于篇幅过长，自行通过搜索引擎查找相关教程，或者上某宝购买一个。

### 证书签名方式区别

苹果提供三种类型的证书签名方式：

| 证书名称  |                 安装范围                  |             开发者账号类型             |
| :-------: | :---------------------------------------: | :------------------------------------: |
|  Ad-Hoc   |    需要把设备 UDID 添加到证书才可安装     | 个人账号、公司账号、教育账号、企业账号 |
| In-house  | 任何 iOS 设备均可安装，不能上架 App Store |                企业账号                |
| App-Store |            通过 App Store 安装            |      个人账号、公司账号、教育账号      |

### 创建证书 Certificate

> 进入[开发者账户首页](https://developer.apple.com/account/#/overview/)，点击 `Certificates, Identifiers & Profiles`

1. 点击 Certificates 旁边的加号。
2. 选择证书类型 -> `iOS Distribution (App Store and Ad Hoc)`, 点击 Continue.
3. 创建证书签名请求(CSR)文件 (`.certSigningRequest`) 后，选择上传，点击继续。
   1. 打开【钥匙串】，钥匙串访问 -> 证书助理 -> 从证书颁发机构请求证书...
   2. 填写用户电子邮件地址 -> `开发者账号邮箱地址`，请求是 -> `选择存储到磁盘`，其它默认即可。
   3. 选择请求证书存放位置，完成。
4. **下载证书后，双击运行 `ios_distribution.cer` 文件。**(会提示添加到钥匙串，添加即可)

![create-ios-certificate-1](/assets/create-ios-certificate-1.png)
![create-ios-certificate-2](/assets/create-ios-certificate-2.png)
![create-ios-certificate-3](/assets/create-ios-certificate-3.png)
![create-ios-certificate-3-1](/assets/create-ios-certificate-3-1.png)
![create-ios-certificate-3-2](/assets/create-ios-certificate-3-2.png)
![create-ios-certificate-4](/assets/create-ios-certificate-4.png)

### 注册 App Identifier

1. 点击左侧 Identifiers 再点击旁边的加号。
2. 填写 App ID 描述（除特殊字符外的任意英文）。
3. 填写 Bundle ID。iOS 应用的唯一标识。
   1. 一般格式为：`com.company.appName`, com.公司名称.应用名称，示例：`com.alibaba.aliqq`
   2. **Bundle ID 对应 Xcode 中的 Bundle Identifier 一致**
4. 选择应用服务权限，无特殊需求默认即可。
5. 点击 **Continue** -> 确认 App ID 信息 -> 点击 **Register** -> 注册完成。

如果填写的 App ID 已被使用，注册不会通过：

> There were errors in the data supplied. Please correct and re-submit.
> An App ID with Identifier 'com.fb.f8' is not available. Please enter a different string.

![create-app-id-1](/assets/create-app-id-1.png)
![create-app-id-2](/assets/create-app-id-2.png)
![create-app-id-3](/assets/create-app-id-3.png)

### 注册设备 Device

> 使用 Ad-hoc 进行签名的应用，只有配置文件中包含相应设备的 UDID, 该设备才能安装应用。

1. 点击 Devices 旁边的加号(＋)
2. 填写设备名称、UDID
3. 点击 Continue. 注册，完成添加。(每种设备最多 100 台)

![register-device-1](/assets/register-device-1.png)
![register-device-2](/assets/register-device-2.png)

#### 查看 UUID 的几种方式

1. 使用 [iTunes](https://www.apple.com/cn/itunes/download/) 查看

- 下载安装后，连接 iPhone, 左侧的 📱 图标 -> 摘要 -> 点击序列号, 就会显示 UDID。

2. 使用 [iMazing](https://imazing.com/zh/) 查看

- 下载安装后，连接 iPhone, 点击右下角的设备详情信息旁边的图标，**Device ID** 即是。

3. 使用蒲公英提供的 [网址](https://www.pgyer.com/udid/) 查看

- 手机打开 Safari, 访问，安装描述文件后，点击获取。

4. 使用 Xcode 查看

- 手机连接电脑后，在 Xcode 中的模拟器选择设备，Devices Information -> Identifier。

### 创建配置文件 Profile

> Profile 文件包含证书、App ID、设备，文件后缀为 `.mobileprovision`

1. 点击 Profiles 旁边的加号(＋) 生成证书
2. 选择配置文件类型 (Distribution -> Ad-Hoc)
3. 选择 App ID，点击继续。
4. 选择证书，点击继续。
5. 选择设备，点击继续。
6. 填写文件名称，点击生成证书。
7. 最后，下载证书。
8. **打开 Xcode, 双击配置文件** `xxx_app_ad_hoc.mobileprovision` **安装（Xcode 界面闪一下说明安装成功）**

![create-profile-1](/assets/create-profile-1.png)
![create-profile-1-1](/assets/create-profile-1-1.png)
![create-profile-2](/assets/create-profile-2.png)
![create-profile-3](/assets/create-profile-3.png)
![create-profile-4](/assets/create-profile-4.png)
![create-profile-5](/assets/create-profile-5.png)
![create-profile-6](/assets/create-profile-6.png)
![create-profile-7](/assets/create-profile-7.png)

以上步骤最后产生的文件：

```shell
ios_distribution.cer
xxx_app_ad_hoc.mobileprovision
CertificateSigningRequest.certSigningRequest
```

## 打包 ipa

### 生成 jsbundle 文件

1. 在 package.json 中添加脚本

```diff
# package.json
{
  "scripts": {
+   "build:ios": "node node_modules/react-native/local-cli/cli.js bundle --entry-file index.js --platform ios --dev false --bundle-output ./ios/bundle/index.ios.jsbundle --assets-dest ./ios/bundle"
  }
}
```

参数说明

- `--entry-file`， 项目入口文件, `index.js`。

- `--platform` ，平台名称 (ios 或 android)。

- `--dev`, 设置为 `false` 会对 JS 代码进行优化处理。

- `--bundle-output`, 生成的 jsbundle 文件的名称，eg. `./ios/bundle/index.ios.jsbundle`

- `--assets-dest` 图片、资源存放的目录，eg. `./ios/bundle`

2. **在 ios 目录下创建 `bundle` 目录**，执行命令：

```bash
yarn build:ios
# npm run build:ios
```

_不创建 bundle 目录会报错： `ENOENT: no such file or directory, open './ios/bundle/index.ios.jsbundle'`_

### 使用 Xcode 集成离线包

> 离线包生成后在 `/ios/bundle/` 目录下，接下来需要在 Xcode 中完成集成

1. 在 Xcode 左侧目录，选择 `你的项目名` 右键选择 `Add Files to "你的项目名" ...`
2. 选择刚刚生成的离线包，并选中 `Create folder references`, 点击添加。

![bundle-create-folder-references](/assets/bundle-create-folder-references.png)

添加成功后，结构如下：（文件夹图标颜色为蓝色才是正确的）

```bash
▾ project-name
  ▾ project-name
    ▾ bundle
      ▸ assets
        index.ios.jsbundle
```

### 修改 AppDelegate.m 文件

> 修改 `/project-name/AppDelegate.m` 文件中加载包的方式，以自动根据环境 (debug & release) 加载不同的包。

```objective-c
#ifdef DEBUG
  // 开发包
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  // 离线包
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
#endif
```

切换项目构建配置

1. 打开 Xcode, 在菜单栏选择 ` Product -> Scheme -> Edit Scheme`.
2. 在 `Run -> info -> Build Configuration` 选择切换。

![edit-scheme](/assets/edit-scheme.png)

### 添加开发者账号

在菜单栏选择 Xcode - > Preferences, 在打开的界面左下角，点击加号 (＋)，进行添加。

![add-account](/assets/add-account.png)

### Xcode 配置证书&打包环境

1. 双击运行证书文件 `ios_distribution.cer`
2. 双击运行描述文件 （这两步上面已经做了，这里强调一下）
3. 用 Xcode 打开项目 ios 目录，在文件列表双击根目录（你的项目名）

- 在 `TARGETS -> 你的项目名 -> General -> Signing` 勾选 `Automatically manage signing`
- 在 Team 选择刚刚添加的开发者账号，即可。

> 如果不勾选 `Automatically manage signing` , 下方则会出现 Signing(Debug), Signing(Release) 两个环境分别配置。

![config-signing](/assets/config-signing.png)

### 打包

1. 打开 Xcode，在调试设备的位置选择 `Generic iOS Device`。
2. 在菜单栏选择 `Product -> Archive`，点击开始打包。
3. 打包快完成时，需要输入访问钥匙串的密码并允许。

![codesign-password](/assets/codesign-password.png)

### 导出应用

> 需要再次访问 Archives 窗口，可以在 Xcode 菜单栏选择 `Window -> Organizer` 打开。

1. 在弹出的 Archives 窗口，点击分发应用 (Distribute App)
2. 选择一种分发方式 (Select a method of distribution)，这里选择 **Ad Hoc**，下一步。
   - iOS App Store 发布到 App Store，需要发布证书。
   - Ad Hoc 开发者账户下添加的 UDID 设备使用。
   - Enterprise 企业级账户，需提供企业证书。
   - Development 分发给团队成员使用，不需要证书。
3. Ad Hoc distribution options, 选择默认即可，继续下一步。
4. 重新签名应用，这一步与 Xcode 中的 Signing 配置一致，选择自动管理签名 (Automatically manage signing)，下一步。（中间可能会需要输入登录钥匙串的密码）
5. 最后，导出到桌面，将 `.ipa` 文件传到 iPhone 手机上测试。（利用 “隔空投送” 安装，或者使用 iMazing 安装）

![distribution-app](/assets/distribution-app.gif)

## REF

- https://www.jianshu.com/p/e5b7bdcc93c9
- https://blog.whezh.com/react-native-ios-bundle/
- https://medium.com/@esther.tsai/ios-%E5%A6%82%E4%BD%95%E5%88%A9%E7%94%A8-adhoc-%E7%99%BC%E4%BD%88-app-648f1344b8a6
