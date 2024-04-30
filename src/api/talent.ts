import request from "../utils/request";

// 获取筛选数据接口
export function getScreenl() {
  return request({
    url: "/conllect/recuit/getScreenl",
    method: "GET",
    params: {}
  });
}
