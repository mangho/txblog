# 拦截器 vs 中间件：日志记录的最佳选择
非常好的问题，这在 **NestJS 架构设计**里确实是一个关键选择。
不同场景下，**拦截器（Interceptor）** 和 **中间件（Middleware）** 都能记录请求日志，但它们的定位和能力不一样。

下面我们从实用角度来对比一下：

---

## 🧩 一、区别对比总览

| 项目        | 拦截器（Interceptor）        | 中间件（Middleware）       |
| --------- | ----------------------- | --------------------- |
| 触发时机      | Controller 执行前后         | 路由匹配之前                |
| 是否可拿到响应数据 | ✅ 可以                    | ❌ 不可以                 |
| 是否可拿到异常   | ✅ 可以（通过 `catchError`）   | ❌ 不可以（异常已交给异常过滤器）     |
| 典型用途      | 请求耗时统计、响应格式统一、性能分析、业务日志 | 全局请求日志、CORS、认证前预处理    |
| 可注入 DI    | ✅ 支持依赖注入                | ⚠️ 支持有限（需手动注册）        |
| 精度控制      | 可针对某个 controller / 方法生效 | 通常全局生效                |
| 底层级别      | 高层（Nest 层）              | 低层（Express/Fastify 层） |

---

## ⚙️ 二、应用场景推荐

### ✅ **1. 全局访问日志（推荐中间件）**

例如：

* 记录所有请求的 `method`、`url`、`statusCode`、`响应时间`
* 不关心业务逻辑，只想做全局追踪

👉 **使用中间件更合适**。

```ts
// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const ms = Date.now() - start;
      console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${ms}ms)`);
    });
    next();
  }
}
```

然后在 `app.module.ts` 注册：

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({ /* ... */ })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

> ✅ 优点：性能开销低，适合做全局日志、请求统计。
> ❌ 缺点：拿不到响应体内容，也无法拦截异常。

---

### ✅ **2. 带业务上下文的日志（推荐拦截器）**

例如：

* 想记录 Controller 返回的内容；
* 想记录异常信息；
* 想按业务分类打印日志；
* 想在日志里包含用户信息（JWT 解析后）。

👉 **使用拦截器更合适**。

```ts
// src/common/interceptors/logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    return next.handle().pipe(
      tap((data) => {
        const ms = Date.now() - now;
        console.log(`[${method}] ${url} - ${ms}ms\nResponse:`, data);
      }),
      catchError((err) => {
        const ms = Date.now() - now;
        console.error(`[${method}] ${url} - ERROR after ${ms}ms:`, err.message);
        return throwError(() => err);
      }),
    );
  }
}
```

注册为全局拦截器：

```ts
// main.ts
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

app.useGlobalInterceptors(new LoggingInterceptor());
```

> ✅ 优点：能捕获响应体、异常信息，适合做“请求链级”日志。
> ❌ 缺点：性能略低于中间件，不适合特别高频的低延迟场景。

---

## 🧠 三、综合建议（推荐组合使用）

| 用途                                | 推荐方式                       |
| --------------------------------- | -------------------------- |
| 记录基础访问日志（method, url, status, 耗时） | ✅ 中间件                      |
| 记录业务数据（返回值、异常信息）                  | ✅ 拦截器                      |
| 生产环境高并发、日志量大                      | 中间件 + 独立日志系统（winston/pino） |
| 需要调试和性能分析                         | 拦截器更灵活                     |

---

## ✅ 总结结论

> **NestJS 请求日志推荐组合方式**：

* **中间件**：记录全局请求基础日志（快速、低成本）
* **拦截器**：记录详细业务日志（带返回值、异常、耗时）

典型做法是：

> 中间件负责收集基础访问日志 →
> 拦截器负责扩展业务日志（例如某些控制器需要记录详细输入输出）

---

如果你愿意，我可以帮你写一个：

> 🔧「生产可用版」组合方案：
>
> * 中间件记录全局访问日志
> * 拦截器记录接口输入输出和异常
> * 集成 `winston` 输出到文件 + 控制台

是否希望我直接写一份这样的组合示例？
