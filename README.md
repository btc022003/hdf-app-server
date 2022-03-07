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

## 数据表

> 数据库表结构简单说明

<details>

<summary>数据库表说明</summary>

#### 找医生

- doctors
  > 医生信息，需要关键字即擅长领域，用来做关键技能查询。需要关联科室表
  ```
  id
  name
  desc
  tags
  content
  avatar
  doctor_title_id
  department_id
  ```
- department
  > 科室信息
  ```
  id
  name
  desc
  content
  image
  ```
- doctor_titles
  > 医生职称
  ```
  id
  name
  desc
  image
  ```

#### 找药品

#### 查疾病

#### 医师讲堂

#### 提问

#### 医药知识

</details>
