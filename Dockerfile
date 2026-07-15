# Node 18 + Debian Bullseye Slim（Bullseye 自带 libssl1.1，兼容 Prisma 3.x 引擎）
FROM node:18-bullseye-slim

WORKDIR /app

# 先复制依赖文件，利用 Docker 缓存层
COPY package*.json ./
COPY prisma ./prisma

# 安装所有依赖（包括 devDependencies，prisma CLI 需要）
RUN npm ci && npx prisma generate

# 复制源码
COPY . .

# 构建项目
RUN npm run build

EXPOSE 3006

# 复制并设置启动脚本
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/main"]
