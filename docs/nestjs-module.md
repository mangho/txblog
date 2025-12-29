## **NestJS 最优目录结构方案**

## 🚀 一、总体目标

> ✅ 模块清晰
> ✅ 可水平扩展
> ✅ 便于多人协作
> ✅ 支持 REST / GraphQL / Microservice
> ✅ 兼容 Knex / TypeORM / Prisma 等 ORM

---

## 🧩 二、推荐目录结构

```
src/
│
├── main.ts                 # 应用入口
├── app.module.ts           # 根模块
│
├── config/                 # 配置文件（数据库、环境变量）
│   ├── database.config.ts
│   ├── app.config.ts
│   └── ...
│
├── common/                 # 全局通用模块
│   ├── constants/          # 常量
│   ├── decorators/         # 自定义装饰器
│   ├── filters/            # 异常过滤器（HttpExceptionFilter）
│   ├── interceptors/       # 拦截器（如日志/响应格式化）
│   ├── guards/             # 守卫（AuthGuard / RolesGuard）
│   ├── pipes/              # 管道（验证、转换）
│   ├── utils/              # 工具函数
│   └── dto/                # 全局共享 DTO（如分页）
│
├── database/               # 数据层（TypeORM / Knex）
│   ├── entities/           # 实体（Entity 或 Model）
│   ├── migrations/         # 数据迁移
│   └── seeds/              # 数据初始化脚本
│
├── modules/                # 核心业务模块（重点）
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   │
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   └── guards/
│   │       └── jwt-auth.guard.ts
│   │
│   ├── post/
│   │   ├── post.module.ts
│   │   ├── post.service.ts
│   │   ├── post.controller.ts
│   │   ├── dto/
│   │   └── entities/
│   │
│   └── ...
│
├── infrastructure/         # 外部适配层
│   ├── mail/               # 邮件服务
│   ├── storage/            # 文件存储（如 AWS S3 / 本地）
│   └── cache/              # 缓存（Redis）
│
├── tests/                  # 测试文件（e2e / unit）
│
└── main.ts
```

---

## 三、目录设计逻辑

### 1️⃣ **分层思想：DDD-lite**

结构参考 DDD（领域驱动设计），但不复杂：

| 层级              | 说明                               |
| ----------------- | ---------------------------------- |
| `modules/`        | 业务模块（每个模块自成体系）       |
| `common/`         | 通用层（横切关注点）               |
| `database/`       | 数据层（Entity / Migration）       |
| `infrastructure/` | 基础设施（外部系统、存储、邮件等） |

---

### 2️⃣ **模块化是核心**

每个业务模块 **自包含**：

```
user/
 ├── dto/
 ├── entities/
 ├── user.service.ts
 ├── user.controller.ts
 └── user.module.ts
```

✅ 好处：

- 模块可独立维护；
- 可随时抽离为微服务；
- DTO / 实体互不干扰。

---

### 3️⃣ **common 层统一复用机制**

> 一切通用逻辑都不应该放在业务模块里。

典型例子：

```ts
common/
 ├── guards/jwt.guard.ts
 ├── interceptors/logging.interceptor.ts
 ├── pipes/validation.pipe.ts
 ├── filters/http-exception.filter.ts
```

在 `main.ts` 中统一挂载：

```ts
app.useGlobalFilters(new HttpExceptionFilter());
app.useGlobalPipes(new ValidationPipe());
app.useGlobalInterceptors(new LoggingInterceptor());
```

---

### 4️⃣ **config 层统一配置**

使用 [`@nestjs/config`](https://docs.nestjs.com/techniques/configuration) 模块：

```
config/
 ├── database.config.ts
 ├── app.config.ts
```

在 `app.module.ts`：

```ts
ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig, databaseConfig],
});
```

这样环境变量和配置可集中管理。

---

### 5️⃣ **infrastructure 层管理外部服务**

这层专门放「和外部交互」的模块，比如：

```
infrastructure/
 ├── mail/ (邮件服务)
 ├── cache/ (Redis)
 ├── storage/ (文件上传)
```

方便未来做：

- 云迁移；
- 接口适配；
- 微服务抽离。

---

## ⚙️ 四、Knex / TypeORM / Prisma 集成位置

无论你用哪种数据库工具，推荐放在 `database/` 层：

```
database/
 ├── knex/ (配置、连接、migration)
 ├── typeorm/
 ├── prisma/
```

这样不管 ORM 怎么换，业务模块不会被污染。

---

## 🧱 五、建议规范

| 项目部分 | 建议                                          |
| -------- | --------------------------------------------- |
| 文件命名 | 全小写 + 中划线，例如 `user.controller.ts`    |
| 模块导入 | 一个模块内不要互相 import，走服务注入         |
| DTO 校验 | 用 `class-validator` + `class-transformer`    |
| 日志     | 用内置 `Logger` 或 `nestjs-pino`              |
| 响应格式 | 建议加统一响应拦截器（`ResponseInterceptor`） |

---

## ✅ 六、总结一句话

> NestJS 最优结构是：**模块分层、职责清晰、通用隔离、配置集中。**

简单记忆：

```
common → 通用层
config → 配置层
modules → 业务层
database → 数据层
infrastructure → 外部层
```

---

如果你愿意告诉我：

- 你的项目规模（小型接口 / 中型后台 / 企业服务）
- 用的 ORM（TypeORM / Knex）
  我可以帮你生成一个 **定制化目录模板 + 文件示例结构（可直接复制）**。
  要我帮你出一版吗？
