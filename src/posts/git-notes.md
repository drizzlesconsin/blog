---
author: drizzle
date: 2019-06-20
tags: [git]
cover: https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1
---

# Git 不常用的命令

> 主要记录一些不常用，但是不定时会用到并且要去搜索的命令操作。

## 同步 Fork

查看远程仓库

```bash
$ git remote -v
origin	https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
origin	https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```

添加新的远程仓库引用到当前的项目

```bash
$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
```

再次查看远程仓库，添加成功

```bash
$ git remote -v
origin	https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
origin	https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
upstream	https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY_NEW.git (fetch)
upstream	https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY_NEW.git (push)
```

切回主分支执行同步命令

```bash
$ git checkout master
$ git fetch upstream
remote: Enumerating objects: 254, done.
remote: Counting objects: 100% (300/300), done.
remote: Compressing objects: 100% (50/50), done.
remote: Total 167 (delta 141), reused 153 (delta 128), pack-reused 0
Receiving objects: 100% (180/180), 96.50 KiB | 500.00 KiB/s, done.
Resolving deltas: 100% (150/150), completed with 90 local objects.
From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
```

如果本地当前分支已经做了改动，则需要合并上游仓库对应的分支

```bash
$ git merge upstream/master
```

同步更新到远程 (Fork) 分支

```bash
$ git push origin master
```

## Git 撤销某次提交

> 场景：项目仓库做了某些改动提交后，小伙伴拉下来时没强制覆盖，合并后次提交。提交历史会产生多个版本的记录。需要删掉重复的记录。

使用 `git revert` 解决这个麻烦

```bash
$ git revert xb1b345
error: commit xb1b345 is a merge but no -m option was given.
fatal: revert failed
```

如果提交 `[commit_id]` 是 merge 节点 (遇到的就是这种情况\*)，则会报上面的错，还原失败。

解决这个麻烦，需要指定具体的提交节点。加上 `-m` 选项，后面加上序号 `2 parents xb1b345 + 2345342`

```bash
$ git revert xb1b345 -m 1 # 1 -> xb1b345, 2 -> 2345342
$ git add .
$ git commit -m 'message'
```

执行完合并冲突、提交，再处理第二个节点

```bash
$ git revert 2345342 -m 2 # 1 -> xb1b345, 2 -> 2345342
$ git add .
$ git commit -m '...'

$ git push origin master -f
```

## 项目同时推送到多个远程地址

### 添加多个

在你的本地项目目录中，添加 GitHub 仓库作为新的远程仓库：

```bash
# 查看当前远程仓库
git remote -v

# 添加 GitHub 作为名为 github 的远程仓库
git remote add github https://github.com/用户名/仓库名.git
```

### 推送

分别推送

```bash
# 推送到 Gitee (假设远程名称为 origin)
git push origin 分支名

# 推送到 GitHub
git push github 分支名
```

同时推送

```bash
# 编辑 .git/config 文件
git config -e
```

在 [remote "origin"] 部分添加 GitHub 的 URL：

```bash
[remote "origin"]
    url = https://a.com/用户名/仓库名.git
    url = https://b.com/用户名/仓库名.git
```
