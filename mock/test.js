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
      // 從查詢參數中獲取分頁、過濾關鍵詞等參數
      const { page = 1, limit = 5 } = config.query;

      // 分頁
      const data = mockList.filter(
        (_, index) => index < limit * page && index >= limit * (page - 1)
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
