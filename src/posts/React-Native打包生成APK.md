---
author: drizzle
date: 2019-06-25
tags: [react-native]
---

# React-Native 编译生成 APK

## Environment

```bash
OS: Windows 10
Gradle: 4.7
Android Studio: 3.2.0.0
JVM: 1.8.0_91
Yarn: 1.15.2
npm: 6.4.1
```

## 使用命令行生成签名密钥

进入 `bin` 目录

```bash
$ cd C:\Program Files\Java\jdk1.8.0_211\bin
```

执行以下命令

```bash
$ keytool -genkeypair -v -keystore xxx-key.keystore -alias xxx-keystore -keyalg RSA -validity 10000 -keysize 2048
```

+ `-genkeypair` 生成的文件
+ `-alias xxx-keystore` 生成的 keystore 别名
+ `-keyalg RSA`  加密和数字签名的算法
+ `-validity 10000` 有效天数
+ `-keysize 2048` 密钥长度


执行后，需要输入密钥库和对应密钥的密码，名字、组织、国家等信息，直接回车快速完成。

完成后，生成的密钥库文件 `xxx-key.keystore` 会保存在当前目录下。

## 配置 gradle 变量

1. 将 `xxx-key.keystore` 文件移动到项目 `android\app` 文件夹下。
2. 打开 `android\gradle.properties` 文件，配置 gradle 变量。

```properties
MYAPP_RELEASE_STORE_FILE=xxx-key.keystore
MYAPP_RELEASE_KEY_ALIAS=xxx-alias
MYAPP_RELEASE_STORE_PASSWORD=******
MYAPP_RELEASE_KEY_PASSWORD=******
```

## 生成 APK

```bash
$ cd android && ./gradlew assembleRelease
```

生成的 APK 文件存放在 `\android\app\build\outputs\apk\release\xxx-release-0.0.1.apk`.

## REF

+ [Android APP-Signing-Manually](https://developer.android.com/studio/publish/app-signing#signing-manually)
+ [Android Variant_API](https://developer.android.com/studio/build/gradle-plugin-3-0-0-migration.html#variant_api)
+ [Oracle Docs keytool](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html#CHDFFCBG)