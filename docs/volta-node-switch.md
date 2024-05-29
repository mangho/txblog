### 使用 Volta 实现 Node.js 多项目开发环境的自动切换

#### 1. 安装 Volta

##### 首先，需要安装 Volta。linux可以使用命令安装：

```sh
curl https://get.volta.sh | bash
```

##### windows需要去官网下载安装文件安装

安装后把 Volta 添加到系统 PATH 中。

#### 2. 配置项目特定的 Node.js 版本

##### 如果没有 `package.json` 文件，创建一个：
如果你的项目还没有 `package.json` 文件，可以使用以下命令创建：

```sh
npm init -y
```

##### 在 `package.json` 中指定 Node.js 版本：
在 `package.json` 中添加一个 `volta` 部分，并指定所需的 Node.js 版本：

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "volta": {
    "node": "16.13.0"  // 指定所需要的 Node.js 版本
  }
}
```

##### 安装指定的 Node.js 版本：
导航到项目目录并安装指定的 Node.js 版本：

```sh
cd /path/to/your/project
volta install node@16.13.0
```

Volta 会自动在工作的项目目录中使用指定的 Node.js 版本。

#### 3. 验证配置
为了确保 Volta 使用了正确的 Node.js 版本，可以检查 Node.js 版本：

```sh
node -v
```

这应该显示的是在 `package.json` 中指定的版本。

#### 4. 自动切换
Volta 自动处理环境切换。当在不同的项目目录之间切换时，Volta 会自动更改 Node.js 版本以匹配每个项目的 `package.json` 中指定的版本。无需额外配置或命令；只需导航到项目目录，Volta 会自动处理其余部分。

#### 示例工作流：
1. **项目 A (`package.json` 指定 Node.js 14.17.0)：**

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

2. **项目 B (`package.json` 指定 Node.js 16.13.0)：**

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

通过这种方式使用 Volta，就可以轻松管理和切换多个项目的不同 Node.js 版本，无需手动干预，确保开发环境的一致性和兼容性。
