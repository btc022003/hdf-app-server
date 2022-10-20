/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const axios = require('axios').default;
const cheerio = require('cheerio');

const prisma = new PrismaClient();

// 此文件初始化药品信息，慎重执行。

prisma.$connect().then(() => {
  console.log('连接成功');
  loadInfoFromServer();
});

const categories = [
  {
    name: '发热感冒',
    url: 'http://www.yfdyf.com/gallery-176.html',
  },
  {
    name: '清热消炎',
    url: 'http://www.yfdyf.com/gallery-178.html',
  },
  {
    name: '皮炎湿疹',
    url: 'http://www.yfdyf.com/gallery-108.html',
  },
  {
    name: '胃痛胃胀',
    url: 'http://www.yfdyf.com/gallery-147.html',
  },
  {
    name: '痔疮',
    url: 'http://www.yfdyf.com/gallery-152.html',
  },
  {
    name: '消化不良',
    url: 'http://www.yfdyf.com/gallery-276.html',
  },
  {
    name: '抗生素',
    url: 'http://www.yfdyf.com/gallery-180.html',
  },
];
async function loadInfoFromServer() {
  await prisma.medicine.deleteMany({ where: {} });
  await prisma.medicineCategory.deleteMany({ where: {} });
  // axios.get('');
  const loadData = categories.map((item) => axios.get(item.url));
  await prisma.medicineCategory.createMany({
    data: categories.map((item) => ({ name: item.name })),
  });
  const allCategories = await prisma.medicineCategory.findMany({});
  const allMedicine = []; // 所有的药品
  Promise.all(loadData).then((res) => {
    res.forEach((item, index) => {
      const $ = cheerio.load(item.data);
      $('.left-pro').each(function () {
        const m = {};
        m.image = $(this).find('#show-img img').attr('src');
        m.name = $(this).find('.goodinfo h3 a').text().trim();
        m.content =
          'http://www.yfdyf.com' + $(this).find('.goodinfo h3 a').attr('href');
        m.price = $(this).find('.sell-price').text().replace('¥', '') * 1;
        // console.log(m);
        // mc.medicines.unshift(m);
        m.createdAt = new Date(Date.now() + index + Math.random() * 5000);
        m.medicineCategoryId = allCategories[index].id;
        allMedicine.push(m);
      });
    });
    // console.log(allMedicine);
    prisma.medicine
      .createMany({ data: allMedicine })
      .then(() => {
        console.log('创建成功,开始更新详情数据');
        initContent();
      })
      .catch((err) => console.log(err));
  });
}

async function initContent() {
  let count = 0;
  const allMedicines = await prisma.medicine.findMany({ where: {} });
  allMedicines.forEach(async (item) => {
    const res = await axios.get(item.content).then((res) => {
      return res.data;
    });

    const $ = cheerio.load(res);
    let strHtml = '';
    $('.list2_pro_small').each(function () {
      // const data = JSON.parse($(this).attr('imginfo'));
      // console.log(data.big);
      strHtml +=
        '<p><img src="' +
        $(this)
          .attr('imginfo')
          .split(',')[1]
          .replace("big:'", '')
          .replace("'}", '') +
        '" /></p>';
    });
    await prisma.medicine.update({
      data: {
        content: strHtml,
      },
      where: {
        id: item.id,
      },
    });
    count++;
    console.log(count + ',更新完成');
  });
  // console.log(strHtml);
}
