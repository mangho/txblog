
在 **NestJS + TypeORM** 项目里，确实可以通过几种方式「操作数据库新建表」，但要区分几种常见场景。

---

## ✅ 一、方式 1：TypeORM 自动同步（推荐开发阶段）

最简单的方式是让 TypeORM 根据你的实体（Entity）自动创建或更新表结构。

在 `TypeOrmModule.forRoot()` 中配置：

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'testdb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // 🔥 自动根据实体建表
});
```

> ⚠️ `synchronize: true` 只推荐 **开发环境** 使用，生产环境应关闭，否则会导致字段或表被意外修改或删除。

**示例实体：**

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user') // 表名 user
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  age: number;
}
```

运行项目后，TypeORM 会自动执行：

```sql
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  age INT DEFAULT 0
);
```

---

## ✅ 二、方式 2：使用 TypeORM Migration（生产推荐）

在生产环境，你通常不会让 TypeORM 自动改数据库，而是用「迁移脚本 (migration)」显式执行建表语句。

### 1️⃣ 生成 migration

先安装 CLI：

```bash
npm install typeorm -D
```

在 `package.json` 中添加命令（假设你用 Nest CLI）：

```json
"scripts": {
  "typeorm": "typeorm-ts-node-commonjs"
}
```

再创建迁移：

```bash
npm run typeorm migration:generate -- -d src/data-source.ts -n CreateUserTable
```

> `src/data-source.ts` 是数据源配置文件（类似 `TypeOrmModule.forRoot()` 里的配置）

它会生成一个文件，例如：

```
src/migrations/1735042791780-CreateUserTable.ts
```

内容类似：

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1735042791780 implements MigrationInterface {
  name = 'CreateUserTable1735042791780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT DEFAULT 0
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
```

### 2️⃣ 执行迁移

```bash
npm run typeorm migration:run -- -d src/data-source.ts
```

TypeORM 会自动执行建表 SQL。

---

## ✅ 三、方式 3：在代码里手动执行 SQL（临时操作）

如果你希望在运行时动态创建表（比如用户上传文件定义结构），也可以使用 `QueryRunner`。

示例：

```ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DynamicTableService {
  constructor(private dataSource: DataSource) {}

  async createTable(tableName: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.query(`
      CREATE TABLE ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.release();
  }
}
```

然后调用：

```ts
await dynamicTableService.createTable('user_2025');
```

✅ **优点：** 动态灵活，适合临时或多租户场景。
⚠️ **缺点：** 无法通过实体同步、迁移追踪，易混乱。

---

## ✅ 四、方式对比

| 方式                     | 场景   | 优点     | 缺点        |
| ---------------------- | ---- | ------ | --------- |
| `synchronize: true`    | 开发测试 | 快速自动建表 | 不能用于生产    |
| Migration              | 正式生产 | 可控、可回滚 | 需要命令行操作   |
| 手动 SQL (`QueryRunner`) | 动态建表 | 灵活     | 不受 ORM 管理 |

---

## ✅ 五、总结推荐

| 场景        | 推荐做法                     |
| --------- | ------------------------ |
| 本地开发调试    | `synchronize: true` 自动建表 |
| 部署上线、多人协作 | Migration                |
| 运行时动态生成表  | `QueryRunner` 手动建表       |
