> 好大夫服务器端代码，基于 nest.js 框架开发

## 运行环境

nodejs
postgresql

如果需要改变运行的数据库，直接修改数据库配置文件`prisma/schema.prisma`

注意事项:本项目不能使用 sqlite 数据库，因为使用了 createMany 方法批量创建数据。建议使用 postgresql

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
pm2 start dist/src/main.js --name hdf-app-3306
```

[使用 acme.sh 给 Nginx 安装 Let’ s Encrypt 提供的免费 SSL 证书](https://ruby-china.org/topics/31983)

```bash
# https://ruby-china.org/topics/31983
# ssl证书
# 生成证书
acme.sh --issue -d hdf-app-server.penkuoer.com -w /yl_data/website/hdf/hdf-app-server/public

# 安装证书
acme.sh --installcert -d hdf-app-server.penkuoer.com  --keypath /yl_data/website/ssl/hdf-app-server.penkuoer.com.key  --fullchainpath /yl_data/website/ssl/hdf-app-server.penkuoer.com.key.pem  --reloadcmd "sudo service nginx reload"

# dhparam.pem文件生成
openssl dhparam -out /yl_data/website/ssl/hdf-app-server-penkuoer.pem 2048
```

## seed 数据生成

```bash
# https://www.prisma.io/docs/guides/database/seed-database
# 修改配置文件
npx prisma db seed # 执行编写的数据生成代码
```

## 接口文档

[接口文档](http://localhost:3000/docs)
