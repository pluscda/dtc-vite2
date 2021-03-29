const listdata = require("./MOCK_DATA.json")
const mockList = listdata;

module.exports = [
  {
    url: "/dtc/getUser",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: { id: 1, name: "tom", age: 18 },
      };
    },
  },
  {
    url: "/dtc/getUsers",
    type: "get",
    response: (config) => {
      // 从查询参数中获取分页、过滤关键词等参数
      const { page = 1, limit = 5 } = config.query;

      // 分页
      const data = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 20000,
        data,
        total: mockList.length,
      };
    },
  },
  {
    url: "/dtc/addUser",
    type: "post",
    response: () => {
      // 直接返回
      return {
        code: 20000,
      };
    },
  },
  {
    url: "/dtc/updateUser",
    type: "post",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  {
    url: "/dtc/deleteUser",
    type: "get",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
];
