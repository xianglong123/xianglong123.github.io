---
title: mysql介绍

---

# ♥ MySQL 介绍 ♥
::: tip 提示
本系列主要介绍数据库相关的知识体系。
:::

## 一、什么是 MySQL

MySQL 是一款开源的关系型数据库管理系统（RDBMS），由瑞典公司 MySQL AB 开发，后被 Sun Microsystems 收购，2010 年随 Sun 并入 Oracle 旗下。它使用结构化查询语言（SQL）进行数据管理，是目前全球最流行的开源数据库之一，广泛应用于 Web 应用、企业系统和数据分析等领域。

## 二、核心特点

- **开源免费**：社区版完全免费，源代码开放，可在 GPL 协议下自由使用和修改
- **跨平台**：支持 Linux、Windows、macOS 等主流操作系统
- **高性能**：采用多线程架构，支持大并发访问，读写性能优异
- **高可靠性**：提供事务支持、数据备份与恢复、主从复制等特性
- **易于使用**：SQL 语法标准，学习成本低，生态工具丰富
- **可扩展性强**：支持存储过程、触发器、视图、自定义函数等高级特性

## 三、MySQL 架构

MySQL 整体架构分为以下几层：

```
┌─────────────────────────────────────┐
│           客户端连接层               │
│   (连接管理 / 认证 / 授权)           │
├─────────────────────────────────────┤
│           服务层（核心）              │
│   查询缓存 / 解析器 / 优化器 / 执行器 │
├─────────────────────────────────────┤
│           存储引擎层                  │
│    InnoDB / MyISAM / Memory ...      │
├─────────────────────────────────────┤
│           文件系统层                  │
│     数据文件 / 日志文件 / 配置文件    │
└─────────────────────────────────────┘
```

## 四、常用存储引擎

| 引擎 | 事务支持 | 外键支持 | 锁粒度 | 适用场景 |
|------|----------|----------|--------|----------|
| **InnoDB** | ✅ | ✅ | 行锁 | 高并发读写、事务操作（默认引擎） |
| **MyISAM** | ❌ | ❌ | 表锁 | 读多写少、全文搜索 |
| **Memory** | ❌ | ❌ | 表锁 | 临时表、缓存数据 |
| **Archive** | ❌ | ❌ | 行锁 | 数据归档、日志存储 |

> InnoDB 是 MySQL 5.5 之后的默认存储引擎，推荐在大多数场景下使用。

## 五、数据类型

### 数值类型
| 类型 | 大小 | 说明 |
|------|------|------|
| TINYINT | 1 字节 | -128 ~ 127 |
| INT | 4 字节 | -2^31 ~ 2^31-1 |
| BIGINT | 8 字节 | 大整数 |
| DECIMAL(M,D) | 变长 | 精确小数，适合金融数据 |
| FLOAT / DOUBLE | 4/8 字节 | 浮点数（不精确） |

### 字符串类型
| 类型 | 说明 |
|------|------|
| CHAR(n) | 定长字符串，最多 255 字符 |
| VARCHAR(n) | 变长字符串，最多 65535 字节 |
| TEXT | 长文本，最大 65535 字节 |
| LONGTEXT | 超长文本，最大 4GB |
| BLOB | 二进制大对象 |

### 日期时间类型
| 类型 | 格式 | 说明 |
|------|------|------|
| DATE | YYYY-MM-DD | 日期 |
| TIME | HH:MM:SS | 时间 |
| DATETIME | YYYY-MM-DD HH:MM:SS | 日期时间，不受时区影响 |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | 时间戳，受时区影响 |

## 六、常用 SQL 语句

### 数据库操作
```sql
-- 创建数据库
CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 选择数据库
USE mydb;

-- 删除数据库
DROP DATABASE mydb;
```

### 表操作
```sql
-- 创建表
CREATE TABLE user (
    id       BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键',
    username VARCHAR(50)  NOT NULL                COMMENT '用户名',
    email    VARCHAR(100)                         COMMENT '邮箱',
    age      TINYINT      UNSIGNED                COMMENT '年龄',
    status   TINYINT      DEFAULT 1               COMMENT '状态 1:正常 0:禁用',
    created_at DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 修改表结构
ALTER TABLE user ADD COLUMN phone VARCHAR(20) COMMENT '手机号';
ALTER TABLE user MODIFY COLUMN age SMALLINT;
ALTER TABLE user DROP COLUMN phone;

-- 删除表
DROP TABLE user;
```

### 数据 CRUD
```sql
-- 插入
INSERT INTO user (username, email, age) VALUES ('张三', 'zhangsan@example.com', 25);

-- 查询
SELECT id, username, email FROM user WHERE status = 1 ORDER BY id DESC LIMIT 10;

-- 更新
UPDATE user SET status = 0 WHERE id = 1;

-- 删除
DELETE FROM user WHERE id = 1;
```

### 聚合查询
```sql
SELECT
    status,
    COUNT(*)    AS total,
    AVG(age)    AS avg_age,
    MAX(age)    AS max_age,
    MIN(age)    AS min_age
FROM user
GROUP BY status
HAVING total > 5
ORDER BY total DESC;
```

## 七、索引

索引是提升查询性能的关键手段，本质上是一种数据结构（B+ 树）。

### 索引分类

| 类型 | 说明 |
|------|------|
| 主键索引 | PRIMARY KEY，唯一且非空 |
| 唯一索引 | UNIQUE，值唯一但可为 NULL |
| 普通索引 | INDEX，无约束，加快查询 |
| 全文索引 | FULLTEXT，适用于文本搜索 |
| 联合索引 | 多列组合，遵循最左前缀原则 |

### 创建与使用
```sql
-- 创建普通索引
CREATE INDEX idx_email ON user(email);

-- 创建联合索引
CREATE INDEX idx_name_status ON user(username, status);

-- 查看索引
SHOW INDEX FROM user;

-- 删除索引
DROP INDEX idx_email ON user;
```

### 使用注意事项
- 索引并非越多越好，会占用磁盘空间并降低写入性能
- 遵循**最左前缀原则**，联合索引 `(a, b, c)` 可以走 `a`、`a+b`、`a+b+c` 的查询
- 避免在索引列上使用函数或隐式类型转换（会导致索引失效）
- 对区分度低的列（如性别）不适合单独建索引

## 八、事务（Transaction）

事务是一组操作的集合，要么全部成功，要么全部回滚。

### ACID 特性
| 特性 | 说明 |
|------|------|
| **原子性（Atomicity）** | 事务中的操作要么全执行，要么全不执行 |
| **一致性（Consistency）** | 事务执行前后，数据库从一个合法状态到另一个合法状态 |
| **隔离性（Isolation）** | 并发事务互不干扰 |
| **持久性（Durability）** | 事务一旦提交，结果永久保存 |

### 基本用法
```sql
START TRANSACTION;

UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;

-- 成功则提交
COMMIT;

-- 失败则回滚
-- ROLLBACK;
```

### 事务隔离级别
| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|----------|------|-----------|------|
| READ UNCOMMITTED | ✅ | ✅ | ✅ |
| READ COMMITTED | ❌ | ✅ | ✅ |
| REPEATABLE READ | ❌ | ❌ | ✅（MySQL InnoDB 通过 MVCC 解决） |
| SERIALIZABLE | ❌ | ❌ | ❌ |

> MySQL InnoDB 默认隔离级别为 **REPEATABLE READ**。

## 九、日志系统

MySQL 有三种核心日志，对理解其工作机制至关重要：

| 日志 | 所属层 | 作用 |
|------|--------|------|
| **redo log**（重做日志） | InnoDB 引擎层 | 崩溃恢复，保证持久性 |
| **undo log**（回滚日志） | InnoDB 引擎层 | 事务回滚、MVCC 实现 |
| **binlog**（二进制日志） | Server 层 | 数据备份、主从复制 |

## 十、主从复制

MySQL 主从复制是实现高可用和读写分离的基础，原理如下：

1. 主库（Master）将数据变更写入 **binlog**
2. 从库（Slave）的 IO 线程读取主库 binlog，写入本地 **relay log**
3. 从库的 SQL 线程回放 relay log，完成数据同步

```
主库 Master          从库 Slave
┌──────────┐         ┌──────────────┐
│  binlog  │──────→  │  relay log   │
└──────────┘  IO线程  └──────┬───────┘
                             │ SQL线程
                      ┌──────▼───────┐
                      │   数据同步    │
                      └──────────────┘
```

## 十一、版本与生态

| 版本系列 | 状态 | 特点 |
|----------|------|------|
| MySQL 5.7 | 长期维护 | 稳定，广泛使用 |
| MySQL 8.0 | 当前主版本 | 性能提升、窗口函数、JSON 支持增强 |
| MariaDB | 社区分支 | MySQL 的开源分支，兼容性好 |
| Percona Server | 企业增强版 | 性能优化版本，工具链完善 |

## 十二、常用工具

| 工具 | 用途 |
|------|------|
| **MySQL Workbench** | 官方 GUI 客户端 |
| **Navicat** | 流行的商业数据库客户端 |
| **DBeaver** | 开源通用数据库客户端 |
| **mysqldump** | 数据库备份工具 |
| **mysqlbinlog** | binlog 解析工具 |
| **EXPLAIN** | SQL 执行计划分析 |
| **slow query log** | 慢查询日志分析 |

## 十三、总结=

MySQL 凭借其开源、高性能、易用性强等特点，成为 Web 开发领域的首选数据库。学习 MySQL 需要掌握以下几个层次：

1. **基础 SQL**：增删改查、聚合、联表
2. **表设计**：范式、数据类型选择、字段约束
3. **性能优化**：索引原理、EXPLAIN 分析、慢查询优化
4. **事务与锁**：ACID、隔离级别、死锁排查
5. **高可用架构**：主从复制、读写分离、分库分表

> 深入理解 MySQL 的工作原理，是成为一名优秀后端工程师的必修课。
