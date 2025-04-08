---
title: 解决Docker拉镜像时TLS证书错误的问题（OrbStack+代理）
date: 2025-04-08 21:40:00
updated:
tags: docker
---

# 解决 Docker 拉镜像时 TLS 证书错误的问题（OrbStack + 代理）

## 问题背景

在使用 `docker compose up` 或 `docker pull` 时出现以下错误：

```
tls: failed to verify certificate: x509: certificate is valid for *.facebook.com ... not registry-1.docker.io
```

同时使用的是 [OrbStack](https://orbstack.dev/) 管理 Docker 环境，系统中配置了代理 `http://127.0.0.1:7890`，而 `curl` 正常工作，但 Docker 报错。

---

## 排查步骤与结论

### 1. 检查 curl 能否访问 Docker Registry

```bash
curl -v https://registry-1.docker.io/v2/
```

- 结果返回 `401 Unauthorized`，说明网络正常，证书验证通过。

### 2. 执行容器内部请求测试

```bash
docker run --rm busybox wget -qO- https://registry-1.docker.io/v2/
```

- 报错仍为 TLS 证书错误，提示收到 Facebook 的证书。

### 3. 分析原因

Docker Daemon 本身没有走本地代理，直接访问被污染的 DNS，导致连接了错误的 IP 地址。

---

## 解决方案

### ✅ 正确配置 Docker 的代理

编辑或创建 `~/.docker/config.json`，添加如下配置：

```json
{
  "proxies": {
    "default": {
      "httpProxy": "http://127.0.0.1:7890",
      "httpsProxy": "http://127.0.0.1:7890",
      "noProxy": "localhost,127.0.0.1"
    }
  }
}
```

然后重启 OrbStack：

```bash
orb stop
orb start
```

### ✅ 通过 Orb GUI 设置代理（推荐）

在 OrbStack 设置中选择：

- Proxy: Custom
- 填入：`http://127.0.0.1:7890`
- 点击 Apply & Restart

### ✅ 验证代理是否生效

```bash
docker info | grep -i proxy
```

输出应包含：

```
HTTP Proxy: http://127.0.0.1:7890
HTTPS Proxy: http://127.0.0.1:7890
```

### ✅ 再次测试拉镜像

```bash
docker pull busybox
```

成功拉取说明代理配置已生效，TLS 问题解决。

---

## 补充：容器内访问宿主机代理的方法

```bash
docker run --rm   -e HTTP_PROXY=http://host.docker.internal:7890   -e HTTPS_PROXY=http://host.docker.internal:7890   busybox wget -qO- https://registry-1.docker.io/v2/
```

---

## 结论

证书错误并非 Docker 本身的问题，而是网络未走代理导致解析错误地址。通过正确配置代理后，一切恢复正常，Docker Daemon 成功通过 TLS 校验并能访问 Docker Hub。
