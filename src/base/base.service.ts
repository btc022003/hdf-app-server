export class BaseService {
  model: any;
  includes: any;

  /**
   *
   * @param model 当前的需要查询的数据模型
   * @param includes 外键关联，是一个对象
   */
  constructor(model: any, includes = null) {
    this.model = model;
    this.includes = includes;
  }

  /**
   * 新增一条记录
   * @param data
   * @returns
   */
  create(data) {
    return this.model.create({
      data,
    });
  }

  /**
   * 统计数量
   * @returns
   */
  count() {
    return this.model.count();
  }

  /**
   * 分页查询
   * @param where 查询条件
   * @param page  页码
   * @param per   每页显示的数量
   * @returns
   */
  async findAll(where = {}, page = 1, per = 10, include = null) {
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(per) ? 10 : per * 1;
    include = include || this.includes;
    const list = await this.model.findMany({
      where,
      skip: (page - 1) * per,
      take: per * 1,
      include,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await this.model.count({ where });
    return {
      list,
      current: page,
      pageSize: per,
      total,
    };
  }

  /**
   * 根据id获取一个
   * @param id
   * @returns
   */
  findOne(id: string, include = null) {
    include = include || this.includes;
    return this.model.findUnique({
      where: {
        id,
      },
      include,
    });
  }

  /**
   * 根据id修改一个
   * @param id
   * @param data
   * @returns
   */
  update(id: string, data) {
    return this.model.update({
      where: { id },
      data,
    });
  }

  /**
   * 根据id删除一个
   * @param id
   * @returns
   */
  remove(id: string) {
    return this.model.delete({ where: { id } });
  }

  /**
   * 根据id删除多个，多个id用,分割
   * @param ids
   * @returns
   */
  removeMany(ids: string[]) {
    console.log(ids)
    return this.model.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
