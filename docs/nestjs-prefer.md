“**模块走服务注入**”
是 NestJS 架构中一个非常重要的原则，它直接关系到项目是否容易维护、能否模块化解耦。

* 它是什么意思；
* 为什么要这么做；
* 怎么在代码里实现（含完整示例）。

---

## 🚀 一、什么叫「模块走服务注入」

👉 简单说：

> **模块之间不要直接互相 import 文件，而是通过「服务（Service）」来通信。**

也就是说：

* 模块之间的依赖关系只通过 **Nest 的依赖注入（DI）系统**；
* 而不是直接 `import` 对方的类或方法。

---

### 🔴 错误做法（直接引用）

```ts
// post.service.ts
import { UserService } from '../user/user.service';

export class PostService {
  async createPost(userId: number, content: string) {
    const user = await new UserService().findById(userId); // ❌ 直接 new 或 import
  }
}
```

问题：

* `PostService` 和 `UserService` 强耦合；
* 模块难以独立、无法复用；
* 不符合 Nest 的 IOC（控制反转）设计。

---

### ✅ 正确做法（服务注入）

```ts
// post.service.ts
@Injectable()
export class PostService {
  constructor(private readonly userService: UserService) {} // ✅ 注入服务

  async createPost(userId: number, content: string) {
    const user = await this.userService.findById(userId);
    // ...
  }
}
```

前提是：

* `UserModule` 必须在 `PostModule` 可用；
* `UserService` 必须由 `UserModule` 导出。

---

## 🧩 二、怎么实现模块级服务注入

假设有两个模块：`user` 和 `post`

```
src/
 ├── modules/
 │   ├── user/
 │   │   ├── user.module.ts
 │   │   ├── user.service.ts
 │   │   └── user.controller.ts
 │   └── post/
 │       ├── post.module.ts
 │       ├── post.service.ts
 │       └── post.controller.ts
```

---

### 1️⃣ 在 `user.module.ts` 导出服务

```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // ✅ 关键：导出服务供其他模块使用
})
export class UserModule {}
```

---

### 2️⃣ 在 `post.module.ts` 中导入依赖模块

```ts
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../user/user.module'; // ✅ 导入依赖模块

@Module({
  imports: [UserModule], // ✅ 告诉 Nest 可以从 UserModule 获取 UserService
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
```

---

### 3️⃣ 在 `post.service.ts` 中通过构造函数注入

```ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(private readonly userService: UserService) {}

  async createPost(userId: number, content: string) {
    const user = await this.userService.findById(userId);
    console.log('User info:', user);
  }
}
```

---

### ✅ 这样做的好处：

| 优点     | 说明                        |
| ------ | ------------------------- |
| 模块解耦   | 不直接依赖文件路径，而是依赖接口          |
| 可测试    | 可以用 mock 注入 `UserService` |
| 可复用    | 模块可独立使用、可被多个模块导入          |
| 支持依赖反转 | 符合 Nest IOC 原则            |

---

## 🧠 三、背后的原理（IOC 容器）

Nest 有一个全局的 **依赖注入容器（DI Container）**：

当你写：

```ts
constructor(private readonly userService: UserService) {}
```

Nest 会：

1. 查看该模块是否注册过 `UserService`；
2. 如果导出了该服务，则自动注入实例；
3. 整个应用中只会有一个共享实例（Singleton）。

---

## ⚙️ 四、常见进阶技巧

### 1️⃣ 避免循环依赖

如果两个模块互相注入对方：

```ts
UserService 依赖 PostService
PostService 又依赖 UserService
```

可以使用 `forwardRef()`：

```ts
@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

---

### 2️⃣ 只注入接口（推荐大型项目）

如果你定义接口：

```ts
export interface IUserService {
  findById(id: number): Promise<User>;
}
```

再提供实现类：

```ts
@Injectable()
export class UserService implements IUserService {
  findById(id: number) { ... }
}
```

注入时可以用 token：

```ts
constructor(@Inject('IUserService') private readonly userService: IUserService) {}
```

这在做依赖反转或 mock 测试时非常有用。

---

## ✅ 五、总结一句话

> **“模块走服务注入”** 的意思是：
> 模块之间通过 Nest 的依赖注入机制共享服务，而不是直接 `import` 另一个模块的代码。

---

### 🚀 实现步骤总结：

1. **在 A 模块导出服务** → `exports: [AService]`
2. **在 B 模块导入 A 模块** → `imports: [AModule]`
3. **在 B 的 Service 构造函数中注入 AService**

---

