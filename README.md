> 好大夫服务器端代码，基于 nest.js 框架开发

## 运行环境

nodejs
postgresql

如果需要改变运行的数据库，直接修改数据库配置文件`prisma/schema.prisma`

## 启动项目

```bash
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
pm2 start dist/main.js --name hdf-app
```

## seed 数据生成

```bash
# https://www.prisma.io/docs/guides/database/seed-database
# 修改配置文件
npx prisma db seed # 执行编写的数据生成代码
```

## 接口文档

[接口文档](http://localhost:3000/docs)
