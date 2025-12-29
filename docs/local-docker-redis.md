# Windows本地docker部署redis环境


## 一、方案概述

本机只运行 Node.js（pnpm 管理依赖），
而 **Redis 通过 Docker 容器提供服务**。

优点：

1. **不需要安装本地 Redis**

   * 避免版本冲突、服务启动配置复杂等问题。
2. **跨平台一致性**

   * 容器里的 Redis 配置固定（版本、参数）
   * 团队开发或部署到 Linux/服务器时完全一致。
3. **轻量且易重启**

   * 容器启动/停止都简单，不影响本地系统。

---

## 二、实现方式

### 1. Docker Compose 简单配置

```yaml
# docker-compose.yml
services:
  redis:
    image: redis:7.4
    container_name: redis-dev
    ports:
      - "6379:6379"
    volumes:
      - ./redis_data:/data
    command: ["redis-server", "--save", "60", "1"]
```

* `ports: "6379:6379"` 映射端口到宿主机，**本机 Node.js 可以直接访问**。
* `volumes` 可以保留数据。

### 2. Node.js 连接 Redis

在 `.env` 或配置文件里：

```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

Node.js 代码中：

```js
const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redis.set('test', 'hello');
redis.get('test').then(console.log);
```

✅ 注意：这里 `host=localhost`，因为端口已经映射到本机。

---

### 3. 启动 Docker Redis

```bash
docker compose up -d
docker ps  # 会看到 redis-dev 运行
```

测试：

```bash
redis-cli -h 127.0.0.1 -p 6379 ping
# 输出 PONG
```

---

### 4. 小结流程

| 步骤          | 操作                              |
| ----------- | ------------------------------- |
| 启动 Redis 容器 | `docker compose up -d`          |
| Node.js 连接  | `REDIS_HOST=localhost`          |
| 开发调试        | 直接在本机运行 Node.js，Redis 在容器里      |
| 重启 Redis    | `docker restart redis-dev`，无需重装 |

---

### ✅ 优势总结

* 本机无需安装 Redis；
* 版本一致，方便团队共享；
* 容器独立，方便清理和持久化；
* Node.js 开发无需容器也能运行，保持快速迭代。

---

如果你愿意，我可以帮你生成一个 **完整开发环境 Docker Compose + Node.js + pnpm + Redis** 的最简配置示例，
只需要启动 Redis 容器，本机 Node.js 就可以直接访问。

你希望我直接生成吗？
