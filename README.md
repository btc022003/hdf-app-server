# 项目运行以及发布配置

> 好大夫服务器端代码，基于 nest.js 框架开发

## Docker 部署（推荐）

已配置完整的 docker compose，无需手动安装 Node.js 和 PostgreSQL。

### 生产模式

```bash
# 一键启动（构建镜像 + PostgreSQL + 应用）
docker compose up -d

# 查看日志
docker compose logs -f app

# 停止
docker compose down
```

- 代码打包在镜像内，不依赖宿主机环境
- 数据库数据持久化在 `./data/db/postgres`
- 首次启动自动执行 `prisma db push` 和 `prisma db seed` 初始化数据库

### 开发模式

```bash
# 源码挂载 + 热更新（修改代码自动重启）
docker compose -f docker compose.yml -f docker compose.dev.yml up
```

- `src/`、`prisma/`、`public/` 目录实时挂载，修改立即生效
- `npm run start:dev` 启动，文件变更自动重启

### 服务端口

| 服务       | 宿主机端口 | 容器内部端口 |
| ---------- | ---------- | ------------ |
| API 服务   | `3006`     | `3006`       |
| PostgreSQL | `8988`     | `5432`       |

启动后访问：

- **接口文档**: http://localhost:3006/docs
- **管理系统**: http://localhost:3006/manager

---

## 运行环境

nodejs
postgresql

如果需要改变运行的数据库，直接修改数据库配置文件`prisma/schema.prisma`

⚠⚠⚠**注意事项**:本项目不能使用 sqlite 数据库，因为使用了 createMany 方法批量创建数据。建议使用 postgresql

```sql
/* 以下是本机安装的操作说明。已经配置docker容器，可以直接使用 */
/* 使用默认用户连接数据库 */
psql postgres
/* 创建数据库 */
CREATE DATABASE "hys-app";
/* 创建角色 */
CREATE USER postgres with SUPERUSER password '123456';
```

#### 添加 mysql 配置 🌰

使用 docker 直接启动 mysql 环境亦可。配置文件已经添加，修改代码注释就可以

```bash
docker compose up
```

## 启动项目

```bash
npx prisma db push # 初始化数据库
npx prisma db seed # 初始化数据

# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## 发布

```bash
npm run build
pm2 start dist/main.js --name hdf-app-3306
```

[使用 acme.sh 给 Nginx 安装 Let’ s Encrypt 提供的免费 SSL 证书](https://ruby-china.org/topics/31983)

```bash
# https://github.com/acmesh-official/acme.sh
# https://ruby-china.org/topics/31983
# ssl证书
# 生成证书
acme.sh --issue -d hdf-app-server.penkuoer.com -w /yl_data/website/hdf/hdf-app-server/public

# 安装证书
acme.sh --installcert -d hdf-app-server.penkuoer.com  --keypath /yl_data/website/ssl/hdf-app-server.penkuoer.com.key  --fullchainpath /yl_data/website/ssl/hdf-app-server.penkuoer.com.key.pem  --reloadcmd "sudo service nginx reload"

# dhparam.pem文件生成
openssl dhparam -out /yl_data/website/ssl/hdf-app-server-penkuoer.pem 2048
```

nginx 配置

```bash
upstream hdf_app_server_upstream {
  server 127.0.0.1:3006;
  keepalive 64;
}

server {
  listen 80;
  listen 443 ssl;
  ssl_certificate /yl_data/website/ssl/hdf-app-server.penkuoer.com.key.pem;
  ssl_certificate_key /yl_data/website/ssl/hdf-app-server.penkuoer.com.key;
  ssl_dhparam /yl_data/website/ssl/hdf-app-server-penkuoer.pem;
  server_name hdf-app-server.penkuoer.com;
  location / {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_max_temp_file_size 0;
    proxy_pass http://hdf_app_server_upstream/;
    proxy_redirect off;
    proxy_read_timeout 240s;
  }
}

```

## seed 数据生成

```bash
# https://www.prisma.io/docs/guides/database/seed-database
# 修改配置文件
npx prisma db seed # 执行编写的数据生成代码
```

## 接口文档

[接口文档](http://localhost:3006/docs)

## E2E 测试

测试目录 `test/`，基于 **pytest** + **requests**（API 测试）+ **Playwright**（页面测试）。

### 用到的插件

| 插件 | 作用 |
|---|---|
| [pytest](https://docs.pytest.org/) | 测试框架，发现并运行测试 |
| [requests](https://requests.readthedocs.io/) | 发 HTTP 请求，测 REST API |
| [playwright](https://playwright.dev/python/) | 启动浏览器，测前端页面交互 |
| [faker](https://faker.readthedocs.io/) | 随机生成中文假数据（名字、简介等），不用手写 |
| [allure-pytest](https://docs.qameta.io/allure/) | 生成测试报告（HTML 可视化） |

### 安装和运行

```bash
cd test

# 安装依赖（需要 Python ≥ 3.13）
uv sync

# 安装浏览器（仅首次，页面测试需要）
uv run playwright install chromium

# 确保后端已启动，然后：
uv run pytest              # 全部测试
uv run pytest test_auth.py           # 仅 API 测试
uv run pytest test_manager_pages.py  # 仅页面测试
uv run pytest test_doctors_crud.py   # 仅医生 CRUD 测试
```

### 测试文件说明

```
test/
├── conftest.py              # 全局 fixtures：登录、客户端、浏览器
├── pyproject.toml           # 依赖和 pytest 配置
├── test_auth.py             # 认证接口：登录成功/失败、权限 401/403
├── test_doctors_crud.py     # 医生增删改查 + 边界异常
└── test_manager_pages.py    # 管理后台 16 个页面可访问 + 权限拦截
```

### 关键约定

- **BASE_URL** 只有 `conftest.py` 顶行一处，改环境只改那里
- **API 测试**用 `BaseSession`，支持相对路径（`"/admin/users"` 不用拼完整 URL）
- **页面测试**用 `admin_page` / `user_page` fixture，cookie 自动注入免手动登录
- **假数据**通过 `faker` 随机生成，不需要写死在用例里
- 发现的 bug 用 `@pytest.mark.xfail` 标记，修好后会自动提示

### 生成 Allure 报告

```bash
uv run pytest --alluredir=allure-results
allure serve allure-results   # 浏览器打开可视化报告
```

## 初始化药品

药品信息数据可以在第一次使用项目的时候使用脚本进行数据的初始化。这个功能慎重使用，会删除已经存在的所有药品分类和药品信息

```bash
node medicine # 直接执行脚本就好
```
