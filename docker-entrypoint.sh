#!/bin/sh
set -e

echo "============================================"
echo "  HDF App Server - Docker Entrypoint"
echo "============================================"

# 等待 PostgreSQL 就绪，同时执行数据库初始化
echo ""
echo "[1/3] Waiting for PostgreSQL to be ready..."

RETRIES=30
while [ $RETRIES -gt 0 ]; do
  if npx prisma db push --skip-generate 2>/dev/null; then
    echo "Database schema is up to date."
    break
  fi
  echo "PostgreSQL is unavailable - retrying ($RETRIES attempts left)..."
  RETRIES=`expr $RETRIES - 1`
  sleep 2
done

if [ $RETRIES -eq 0 ]; then
  echo "ERROR: Failed to connect to PostgreSQL after 30 attempts."
  exit 1
fi

# 初始化种子数据（首次运行）
echo ""
echo "[2/3] Running database seed..."
npx prisma db seed 2>/dev/null || echo "Seed skipped (data may already exist)."

# 启动应用
echo ""
echo "[3/3] Starting HDF App Server on port 3006..."
echo "============================================"
echo ""

exec "$@"
