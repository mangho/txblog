# Express 项目结构

## 项目层级结构

```
my-express-app/
├─ node_modules/
├─ src/
│  ├─ app.js                # Express 主应用入口
│  ├─ server.js             # 启动文件，监听端口
│  ├─ config/               # 配置相关
│  │  ├─ db.js              # 数据库配置/连接
│  │  ├─ index.js           # 统一导出配置
│  ├─ routes/               # 路由定义
│  │  ├─ index.js           # 汇总路由
│  │  ├─ user.routes.js
│  │  └─ product.routes.js
│  ├─ controllers/          # 控制器，处理请求逻辑
│  │  ├─ user.controller.js
│  │  └─ product.controller.js
│  ├─ services/             # 业务逻辑层
│  │  ├─ user.service.js
│  │  └─ product.service.js
│  ├─ models/               # 数据模型层（ORM/Schema）
│  │  ├─ user.model.js
│  │  └─ product.model.js
│  ├─ middlewares/          # 中间件，如鉴权、日志、异常处理
│  │  ├─ auth.middleware.js
│  │  └─ error.middleware.js
│  ├─ utils/                # 工具函数
│  │  ├─ logger.js
│  │  └─ validator.js
│  └─ constants/            # 常量，如状态码、枚举
│      └─ statusCodes.js
├─ tests/                   # 测试代码
│  ├─ user.test.js
│  └─ product.test.js
├─ package.json
├─ package-lock.json
├─ .env                     # 环境变量
├─ .gitignore
└─ README.md
```

## 设计理念

1. **分层清晰**

   - `routes` → 定义路由
   - `controllers` → 接受请求，处理输入/输出
   - `services` → 核心业务逻辑
   - `models` → 数据层/ORM

2. **可扩展**

   - 新增模块只需要添加 `routes/controller/service/model`，整体结构不变

3. **中间件集中管理**

   - 统一异常处理、鉴权、日志，便于维护

4. **配置、常量、工具函数独立**

   - 避免硬编码，方便不同环境切换

5. **测试友好**

   - `tests` 与 `src` 分离，支持单元测试/集成测试

## 总体职责区分

| 层级           | 职责                         | 放什么代码                                           | 不放什么代码                              |
| -------------- | ---------------------------- | ---------------------------------------------------- | ----------------------------------------- |
| **Controller** | 接受请求、验证参数、返回响应 | 调用 service、处理输入输出、捕获异常                 | 不做复杂业务逻辑、不要直接操作数据库      |
| **Service**    | 核心业务逻辑                 | 处理业务流程、调用 model、调用其他 service、处理事务 | 不直接返回 HTTP 响应、不处理 req/res 对象 |
| **Model**      | 数据访问层                   | 数据库操作（CRUD）、ORM schema、数据验证             | 不写业务流程逻辑、不要处理 HTTP 请求      |

---

### 总结一句话理解

- **Controller** → “接电话的”，接收请求，告诉 Service 去干什么
- **Service** → “干活的”，把业务流程处理好
- **Model** → “仓库/数据库”，负责数据存取

---

## 鉴权/权限控制

### **JWT 鉴权（常用）**

- 库：[`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken)
- 功能：验证请求头的 token，解析用户信息

### **RBAC/权限控制（可选）**

- 可以在中间件里检查 `req.user.role` 或权限列表
- 配合 JWT 使用，保证接口访问权限

## 响应封装

- 统一 JSON 响应格式，减少重复

> 封装后在 Controller 中可以：

```js
res.success({ id: 1 });
res.fail("参数错误", 422);
```

## 全局异常处理

- 捕获 Controller 中的错误，统一返回

> 在 app.js 中挂载：

```js
app.use(errorMiddleware);
```

---

## ️ 请求日志

- 记录请求信息，调试和运维必备
- 库：[`morgan`](https://www.npmjs.com/package/morgan) [winston](https://www.npmjs.com/package/winston)

## 其他实用中间件

| 功能              | 推荐库/自写                              | 说明                     |
| ----------------- | ---------------------------------------- | ------------------------ |
| 请求体解析        | `express.json()`, `express.urlencoded()` | 解析 JSON、表单          |
| 跨域              | `cors`                                   | 支持跨域请求             |
| 防止重复请求/限流 | `express-rate-limit`                     | 防刷接口                 |
| 安全头            | `helmet`                                 | 设置 HTTP 安全头         |
| 文件上传          | `multer`                                 | 处理 multipart/form-data |
| 参数校验          | `express-validator`, `joi`               | 参数校验                 |

---

## 实践推荐组合

```js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const responseMiddleware = require("./middlewares/response.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

// 基础中间件
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(responseMiddleware);

// 需要鉴权的路由
app.use("/api/user", authMiddleware, require("./routes/user.routes"));

// 全局异常处理
app.use(errorMiddleware);

module.exports = app;
```

✅ 这样可以保证：

- 响应统一
- 异常统一处理
- 请求日志和安全基础都完成
- 鉴权灵活可组合
