在用 `Docker` 部署前端开发环境时，Vite 的热重载（HMR）会失效，这是因为 Docker 容器的网络和文件系统设置可能导致一些问题。在搜索了大量资料之后，终于在 stackoverflow 找到了答案：

### 常见原因

1. **网络配置问题**：Docker 容器默认使用桥接网络，可能导致 Vite 的热重载请求无法正确路由到主机。
2. **文件系统问题**：在 Docker 中挂载卷（volume）时，文件系统的变化可能无法正确传递到容器内的文件监听器。
3. **Vite 配置问题**：Vite 需要配置一些选项来适应 Docker 环境，比如指定主机和端口。

### 解决方案

#### 1. 配置 Vite 以适应 Docker 环境

在 `vite.config.js` 中配置服务器选项：

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // 监听所有地址
    port: 3000, // 对外暴露的端口
    watch: {
      usePolling: true, // 使用轮询来检查文件变化
    },
  },
})
```

#### 2. Dockerfile 和 Docker Compose 配置

创建或修改 `Dockerfile`：

```Dockerfile
# 使用官方Node.js镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件
COPY . .

# 暴露端口
EXPOSE 3000

# 启动Vite开发服务器
CMD ["npm", "run", "dev"]
```

创建或修改 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - '3000:3000'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      CHOKIDAR_USEPOLLING: 'true' # 使用chokidar的轮询模式
    command: bash -c "npm && npm run dev"  
```

#### 3. 启动容器

运行 Docker 容器：

```sh
docker-compose up
```

### 详细解释

1. **监听所有地址**：通过在 Vite 的配置文件中设置 `host: '0.0.0.0'`，Vite 会监听所有网络接口，这允许 Docker 容器内部的服务对外部（宿主机）可见。
2. **使用轮询**：Docker 的文件系统挂载可能不支持文件事件，使用 `usePolling: true` 可以强制 Vite 使用轮询来检测文件变化，尽管这样会更耗资源，但能确保热重载功能正常工作。
3. **环境变量**：`CHOKIDAR_USEPOLLING` 环境变量也是为了确保文件变化能够被检测到。Chokidar 是一个文件变化检测库，Vite 使用它来实现热重载。

其中， Vite 的 `usePolling` 配置项与 `CHOKIDAR_USEPOLLING` 的作用是一样的，至于实现方式暂时还没理解，至少熱重载能工作了
