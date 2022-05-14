---
author: drizzle
date: 2022-05-14
tags: [yarn]
---

# [Solved] Error: spawn node-gyp ENOENT

## 报错

```bash
warning Error running install script for optional dependency: "APP/node_modules/watchpack-chokidar2/node_modules/fsevents, APP/node_modules/webpack-dev-server/node_modules/fsevents: Command failed.
Exit code: 1
Command: node install.js
Arguments:
Directory: APP/node_modules/webpack-dev-server/node_modules/fsevents
Output:
events.js:377
      throw er; // Unhandled 'error' event
      ^

Error: spawn node-gyp ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:277:19)
    at onErrorNT (internal/child_process.js:472:16)
    at processTicksAndRejections (internal/process/task_queues.js:82:21)
Emitted 'error' event on ChildProcess instance at:
    at Process.ChildProcess._handle.onexit (internal/child_process.js:283:12)
    at onErrorNT (internal/child_process.js:472:16)
    at processTicksAndRejections (internal/process/task_queues.js:82:21) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'spawn node-gyp',
  path: 'node-gyp',
  spawnargs: [ 'rebuild' ]
}"
yarn install v1.22.17
```

## 解决

```bash
yarn cache clean && yarn upgrade && yarn
```