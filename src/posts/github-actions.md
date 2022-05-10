---
author: drizzle
date: 2020-06-13
tags: [Automatic]
---

# GitHub Actions 入门及自动化部署实践

## 介绍

GitHub Actions 是 GitHub 推出的一款持续集成工具。跟它具有同样功能的工具还有 [Jenkins](https://www.jenkins.io/), [Travis CI](https://travis-ci.org/), [Circle CI](https://circleci.com/)。都可以自动化地帮你完成很多重复的工作，如：构建、测试和部署代码等等。

## 一些术语

### workflow

工作流程，可以为仓库的项目创建至少一项以上的 Job 流程。每个作业流程中，都包含多个作业 Step。

工作流程配置文件使用 YAML 语法，必须以 `.yml` 或 `.yaml` 文件扩展名。配置文件存储于仓库根目录 `.github/workflows/*.yml` 。

一个仓库可以有多个 workflow 文件，[push...] 事件触发工作流程后，会执行所有 `*.yml, *yaml` 文件。

### jobs

workflow 由一个或多个 jobs 构成，一次持续集成的运行作业，可以完成多个任务。 作业默认是并行运行。

### steps

jobs 包含一系列任务，按步骤可以运行命令、运行设置任务的操作。

### action

每个步骤可以依次执行一个或多个命令。

## 快速开始

在 GitHub 进入仓库，在标签菜单项找到 **Actions** -> **New workflow**, 选择 **Simple workflow** 生成一个简单的模板。

```yml
# PROJECT_NAME/.github/workflows/deploy.yml

# 工作流的名称，如果省略则会显示 .github/workflows/[filename].yml
name: Deployment

# 必选
# 1. string on: push
# 2. array on: [push, pull_request]
# 3. 一个事件指定活动类型或配置，如下（指定分支及触发事件）
# master 分支发生 push, pull_request 事件才会触发 workflow
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

# workflow 文件的主体是 jobs 字段
jobs:
  build:
    # 指定构建服务器
    runs-on: ubuntu-latest

    steps:
      # 选择一个 action, 拉取代码
      - uses: actions/checkout@v2

      # 指定操作步骤的名称
      - name: Run a one-line script
        # 执行该步骤的所需的环境变量 npm install | npm run build
        run: echo Hello, world!

      # 可以执行多个
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

## 配置

### `jobs.<job_id>.runs-on`

GitHub 分配每台虚拟机的硬件配置：

- 2 核 CPU
- 7 GB RAM 内存
- 14 GB SSD 硬盘空间

指定服务器系统：

```yml 
runs-on: ubuntu-latest | windows-latest | macos-latest
```

| Virtual environment  | YAML workflow label                |
| :------------------- | :--------------------------------- |
| Windows Server 2019  | `windows-latest` or `windows-2019` |
| Ubuntu 20.04         | `ubuntu-20.04`                     |
| Ubuntu 18.04         | `ubuntu-latest` or `ubuntu-18.04`  |
| Ubuntu 16.04         | `ubuntu-16.04`                     |
| macOS Catalina 10.15 | `macos-latest` or `macos-10.15`    |

### `jobs.<job_id>.env`

环境变量的 `map` 可用于作业中的所有步骤。 也可以设置整个工作流程或单个步骤的环境变量。 更多信息查看 [`env`](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#env) 和 [`jobs..steps.env`](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv)。

当多个环境变量使用相同的名称定义时，GitHub 会使用最特定的环境变量。 例如，步骤中定义的环境变量在步骤执行时将覆盖名称相同的作业和工作流程变量。 为作业定义的变量在作业执行时将覆盖名称相同的工作流程变量。

```yaml
jobs:
  job1:
    env:
      FIRST_NAME: Mona
```

## 如何触发工作流程

- 单事件，`on: push`
- 多事件，`on: [push, pull_request]`

### 1. GitHub 事件触发

- push
- pull_request
- release
- merge…

### 2. 定时触发

workflow 在特定的 UTC 时间运行。定时 workflow 会在默认或基础分支的最新提交上运行。

```
on:  schedule:    - cron:  '*/30 * * * *' # 每30分钟运行一次
```

schedule 语法有五个字段，用空格分隔，每个字段代表一个时间单位。

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
* * * * *
```

- `*` 任意值 \* \* \* \* \* 在每天的每分钟运行。
- `,` 值列表分隔符 `2,10 4,5 * * *` 在每天第 4 和第 5 小时的第 2 和第 10 分钟运行。
- `-` 值的范围 `0 4-6 * * *` 在第 4、5、6 小时的第 0 分钟运行。
- `/` 步骤值 20/15 \* \* \* \* 从第 20 分钟到第 59 分钟每隔 15 分钟运行（第 20、35 和 50 分钟）。

## 添加工作流状态徽标

状态徽章显示工作流程目前失败还是通过。 添加状态徽章的常见位置是仓库的 README.md 文件。 徽章显示默认分支（通常是 `main`）的状态。

```markdown
![](https://docs.github.com/assets/cb-6722/images/help/repository/actions-workflow-status-badge.png)
```

## 自动部署到阿里云 OSS 的例子

```yml
name: Deployment to aliyun oss

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    # 配置构建矩阵
    strategy:
      matrix:
        node-version: [12.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      # 使用 yarn 安装依赖、编译
      - name: Install
        uses: CultureHQ/actions-yarn@master
        with:
          args: install

      - name: Build
        uses: CultureHQ/actions-yarn@master
        with:
          args: build

      # 读取项目 package.json 的版本号 ${{ env.PACKAGE_VERSION }}
      - name: Read project version
        uses: nyaascii/package-version@v1

      # 使用阿里云 OSS 命令行工具
      - name: Setup aliyun oss
        uses: manyuanrong/setup-ossutil@master
        with:
          # 填写 Bucket 所在地域的域名信息，可参考访问域名和数据中心。
          endpoint: "oss-cn-region.aliyuncs.com"
          # AccessKey
          access-key-id: ${{ secrets.OSS_ACCESS_KEY_ID }}
          # AccessKey Secret
          access-key-secret: ${{ secrets.OSS_ACCESS_KEY_SECRET }}
      - run: ossutil cp -r -f dist oss://:path/${{ env.PACKAGE_VERSION }}
```

### 如何获取 AccessKey ID 和 AccessKey Secret

https://help.aliyun.com/knowledge_detail/38738.html

### Create Secret

1. 在 GitHub repo 上依次点击 `Settings` -> `Secrets` 设置 `secret`.

2. 配置好 `OSS_ACCESS_KEY_ID` `OSS_ACCESS_KEY_SECRET` 加密密码之后，就可以使用 `secrets` 上下文访问创建的密码。

```yml
access-key-id: ${{ secrets.OSS_ACCESS_KEY_ID }}
access-key-secret: ${{ secrets.OSS_ACCESS_KEY_SECRET }}
```

### ossutil

- `-r` 上传文件夹
- `-f ` 强制操作 (当上传的文件已存在，则会强制覆盖上传)

```bash
ossutil cp -r -f dist oss://:path/dir
```

## [Github context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context)

```yml
- name: Echo commit message
  run: echo ${{ github.actor }}: ${{ github.event.head_commit.message }}
```

- `github.actor` 获取运行工作流的用户登录名
- `github.event.head_commit.message` 提交记录的消息 Commit Message
- `github.event.head_commit.author.username` 提交记录的开发者用户名

还有其它属性，可以通过 `toJson(github)` 打印出来，[字段说明文档](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads)。

```yaml
- name: Echo github context
  run: echo ${{ toJson(github) }}
```

## Create GitHub Action

[Creating a JavaScript action - GitHub Docs - GitHub Help](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)

## References

- https://docs.github.com/en/actions
- [GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
- [How to set up GitHub workflows and create GitHub Actions using Docker](https://medium.com/sysf/how-to-set-up-github-workflows-and-create-github-actions-using-docker-3a5ba7ec0988)
