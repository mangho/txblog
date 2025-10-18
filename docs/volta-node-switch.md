# 使用 `volta` 实现 `Node.js` 多项目开发环境的自动切换

## `volta`，前端项目依赖的管理工具，包括 `node`,`pnpm`,`yarn` 等基础依赖动态切换

[官方文档](https://docs.volta.sh/)

## 1. 安装 `volta`

### 首先，需要安装 `volta`。`linux` 可以使用命令安装

```sh
curl https://get.volta.sh | bash
```

#### `windows` 需要去官网下载安装文件安装

安装后把 `volta` 添加到系统 `PATH` 中。

## 2. 配置项目特定的 `node` 版本

如果你的项目还没有 `package.json` 文件，可以使用以下命令创建：

```bash
npm init -y
```

### 有两种方法指定项目的 node 版本

1. 在 `package.json` 中添加一个 `volta` 部分，并指定所需的 `node` 版本

   ```json
   {
     "name": "your-project-name",
     "volta": {
       "node": "16.13.0" // 指定所需要的 Node.js 版本
     }
   }
   ```

1. 使用 `pin` 命令

   ```bash
   volta pin node@22.1.0
   ```

`Volta` 会自动在工作的项目目录中使用指定的 `node` 版本。

## 3. 验证配置

为了确保 `volta` 使用了正确的 `node` 版本，可以检查 `node` 版本：

```sh
node -v
```

这应该显示的是在 `package.json` 中指定的版本

## 4. 自动切换

`volta` `自动处理环境切换。当在不同的项目目录之间切换时，volta` 会自动更改 `node` 版本以匹配每个项目的 `package.json` 中指定的版本。无需额外配置或命令；只需导航到项目目录，`volta` 会自动处理其余部分。

### 示例工作流

1. **项目 A (`package.json` 指定 `node 14.17.0`)：**

   ```json
   {
     "name": "project-a",
     "version": "1.0.0",
     "volta": {
       "node": "14.17.0"
     }
   }
   ```

   导航到项目 A 目录：

   ```sh
   cd /path/to/project-a
   node -v  # 应输出：v14.17.0
   ```

2. **项目 B (`package.json` 指定 `node 16.13.0`)：**

   ```json
   {
     "name": "project-b",
     "version": "1.0.0",
     "volta": {
       "node": "16.13.0"
     }
   }
   ```

   导航到项目 B 目录：

   ```sh
   cd /path/to/project-b
   node -v  # 应输出：v16.13.0
   ```

#### 通过这种方式使用 Volta，就可以轻松管理和切换多个项目的不同 `Node.js` 版本，无需手动干预，确保开发环境的一致性和兼容性。
