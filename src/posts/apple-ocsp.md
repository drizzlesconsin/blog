---
author: drizzle
date: 2020-11-16
tags: [Note]
---

# Apple OCSP

在 [Hacker News](https://news.ycombinator.com/item?id=25095438) 上看到在讨论关于 macOS OCSP 存在泄露用户隐私的隐患。

看了相关文章

+ https://blog.jacopo.io/en/post/apple-ocsp/
+ https://blog.cryptohack.org/macos-ocsp-disaster

主要是因为 OCSP 走的是不加密的 HTTP。*别人*会知道你在 macOS 上运行了什么程序。

## 什么是 OCSP

关于 [OCSP Wiki](https://zh.wikipedia.org/wiki/%E5%9C%A8%E7%BA%BF%E8%AF%81%E4%B9%A6%E7%8A%B6%E6%80%81%E5%8D%8F%E8%AE%AE) 上的解释：

> **在线证书状态协议**（英语：**O**nline **C**ertificate **S**tatus **P**rotocol，缩写：**OCSP**）是一个用于获取[X.509](https://zh.wikipedia.org/wiki/X.509)[数字证书](https://zh.wikipedia.org/wiki/数字证书)撤销状态的[网际协议](https://zh.wikipedia.org/wiki/网际协议)，[[1\]](https://zh.wikipedia.org/wiki/在线证书状态协议#cite_note-Digital-Ocean-Tutorial-OCSP-Stapling-1)在[RFC 6960](https://tools.ietf.org/html/rfc6960)中定义，作为[证书吊销列表](https://zh.wikipedia.org/wiki/证书吊销列表)（CRL）的替代品解决了在[公开密钥基础建设](https://zh.wikipedia.org/wiki/公開金鑰認證)（PKI）中使用证书吊销列表而带来的多个问题。[[2\]](https://zh.wikipedia.org/wiki/在线证书状态协议#cite_note-GlobalSign-OCSP-Stapling-2)协议数据传输过程中使用[ASN.1](https://zh.wikipedia.org/wiki/ASN.1)编码，并通常创建在[HTTP](https://zh.wikipedia.org/wiki/超文本传输协议)协议上，此消息类型分为“请求消息”和“响应消息”，因此致OCSP[服务器](https://zh.wikipedia.org/wiki/服务器)被称为“OCSP响应端”。

## Block OCSP

> **If you use macOS Big Sur, blocking OCSP might not be as trivial.** Before crying conspiracy, however, keep in mind that common users are generally not able to fully understand and evaluate the impact of disabling such a complex and delicate security feature on their computer.
>
> 引用于：https://blog.jacopo.io/en/post/apple-ocsp/#about-blocking-ocsp

热心网友提供了一段 [FUCK APPLE OCSP](https://gist.github.com/h0wardch3ng/c03e8528594aff6ccb3201f02e1ae2a8#file-fuck-apple-ocsp)，将以下规则添加到 `/etc/hosts`.

```bash 
127.0.0.1 ocsp-lb.apple.com.akadns.net
127.0.0.1 ocsp-cn-lb.apple.com.akadns.net
127.0.0.1 ocsp.apple.com.download.ks-cdn.com
127.0.0.1 k128-mzstatic.gslb.ksyuncdn.com
127.0.0.1 ocsp.apple.com.cdn20.com
127.0.0.1 ocsp.g.aaplimg.com
127.0.0.1 ocsp.apple.com
127.0.0.1 ocsp.digicert.com
```

刷新缓存

```bash
$ sudo dscacheutil -flushcache
```

## REF

+ https://www.v2ex.com/t/725369?p=1