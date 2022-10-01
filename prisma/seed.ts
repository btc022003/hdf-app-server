import cheerio from 'cheerio';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { encodePwd } from '../src/utils/tools';
const prisma = new PrismaClient();
let departments;
let doctorTitles;
// var doctors;
// var hospitals;

async function loadHospital(url) {
  const hospital = await axios.get(url).then((res) => res.data);
  const $hospitals = cheerio.load(hospital);
  const hs = [];
  // console.log($hospitals('a').html());
  $hospitals('.hospital-li').each(function () {
    hs.push({
      link:
        'https://m.chunyuyisheng.com' + $hospitals(this).find('a').attr('href'),
      txt: $hospitals(this).find('.hospital-name').text(),
    });
  });
  return hs;
}

async function loadHospitalDetail(id) {
  const url = `https://www.chunyuyisheng.com/pc/hospital/${id}/`;
  const info = await axios.get(url).then((res) => res.data);
  const $info = cheerio.load(info);
  // console.log(departments);
  const hp = await prisma.hospital.create({
    data: {
      name: $info('.hospital-name').text(),
      desc: $info('.hospital-desc').text(),
    },
  });
  const doctors = [];
  // console.log($info('.doctors-li').length);
  $info('.doctors-li').each(function () {
    doctors.push({
      avatar: $info(this).find('.doctor-img').attr('src'),
      name: $info(this).find('.doctor-name').text(),
      // title: $info(this).find('.doctor-title').text(),
      desc: $info(this)
        .find('.doctor-good-at')
        .text()
        .replace('擅长：', '')
        .replace(/，/g, ','),
      // departmentId: departments.find(
      //   (t) => t.name == $info(this).find('.doctor-title').text(),
      // )?.id,
      hospitalId: hp.id,
      doctorTitleId: doctorTitles.find(
        (t) => t.name == $info(this).find('.doctor-title').text(),
      )?.id,
    });
  });
  // return doctors;
  await prisma.doctor.createMany({ data: doctors });

  console.log(`创建"${hp.name}"成功`);
}

async function loadDoctors() {
  const h1 = await loadHospital(
    'https://m.chunyuyisheng.com/m/hospitallist/0/0/?page=1',
  );
  const h2 = await loadHospital(
    'https://m.chunyuyisheng.com/m/hospitallist/0/0/?page=2',
  );

  const hs = [...h1, ...h2];

  hs.forEach(async (item) => {
    await loadHospitalDetail(
      item.link
        .split('/')
        .filter((item) => item)
        .slice(-1)[0],
    );
  });
  // console.log(hs);
}

async function main() {
  const admin = await prisma.manager.upsert({
    where: {
      userName: 'admin',
    },
    update: {
      password: encodePwd('admin'),
    },
    create: {
      userName: 'admin',
      password: encodePwd('admin'),
    },
  });
  console.log(admin);

  // 数据清除
  await prisma.department.deleteMany({ where: {} }); // 科室
  await prisma.doctorTitle.deleteMany({ where: {} }); // 职称
  await prisma.hospital.deleteMany({ where: {} }); // 医院
  await prisma.doctor.deleteMany({ where: {} }); // 医生
  // 科室
  await prisma.department.createMany({
    data: [
      { name: '妇科' },
      { name: '儿科' },
      { name: '内科' },
      { name: '皮肤性病科' },
      { name: '营养科' },
      { name: '骨伤科' },
      { name: '男科' },
      { name: '外科' },
      { name: '肿瘤及防治科' },
      { name: '中医科' },
      { name: '口腔颌面科' },
      { name: '耳鼻咽喉科' },
      { name: '眼科' },
      { name: '整形美容科' },
      { name: '精神心理科' },
      { name: '产科' },
      { name: '报告解读科' },
    ],
  });
  departments = await prisma.department.findMany({});
  // 职称
  await prisma.doctorTitle.createMany({
    data: [
      {
        name: '主任医师',
      },
      {
        name: '副主任医师',
      },
      {
        name: '主治医师',
      },
      {
        name: '医师',
      },
    ],
  });
  doctorTitles = await prisma.doctorTitle.findMany({});

  //
  await loadDoctors();
  console.log('数据初始化完成');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
