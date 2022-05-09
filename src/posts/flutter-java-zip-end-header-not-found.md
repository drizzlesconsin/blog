---
author: drizzle
date: 2022-05-09
tags: [flutter]
---

# Exception in thread "main" java.util.zip.ZipException: zip END header not found

> flutter run 时报错。

```bash
Exception in thread "main" java.util.zip.ZipException: zip END header not found
        at java.base/java.util.zip.ZipFile$Source.zerror(ZipFile.java:1581)
        at java.base/java.util.zip.ZipFile$Source.findEND(ZipFile.java:1476)
        at java.base/java.util.zip.ZipFile$Source.initCEN(ZipFile.java:1483)
        at java.base/java.util.zip.ZipFile$Source.<init>(ZipFile.java:1288)
        at java.base/java.util.zip.ZipFile$Source.get(ZipFile.java:1251)
        at java.base/java.util.zip.ZipFile$CleanableResource.<init>(ZipFile.java:732)
        at java.base/java.util.zip.ZipFile$CleanableResource.get(ZipFile.java:849)
        at java.base/java.util.zip.ZipFile.<init>(ZipFile.java:247)
        at java.base/java.util.zip.ZipFile.<init>(ZipFile.java:177)
        at java.base/java.util.zip.ZipFile.<init>(ZipFile.java:191)
        at org.gradle.wrapper.Install.unzip(Install.java:214)
        at org.gradle.wrapper.Install.access$600(Install.java:27)
        at org.gradle.wrapper.Install$1.call(Install.java:74)
        at org.gradle.wrapper.Install$1.call(Install.java:48)
        at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:65)
        at org.gradle.wrapper.Install.createDist(Install.java:48)
        at org.gradle.wrapper.WrapperExecutor.execute(WrapperExecutor.java:128)
        at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:61)
```

## [尝试过的方案](https://github.com/flutter/flutter/issues/73852#issuecomment-759494547)

>  此方法无法解决。

```bash
rm rf ~/.gradle
```

## 解决

**多半是“网络”下载的导致的问题。**查看 gradle 的版本，没有安装，则手动去下载。

```bash
gradle --version

------------------------------------------------------------
Gradle 6.8
------------------------------------------------------------
```



打开文件 `android/gradle/wrapper/gradle-wrapper.properties` ，将 `distributionUrl` 改成对应的版本即可。