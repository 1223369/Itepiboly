import request from "../utils/request";

// 获取筛选数据接口
export function getScreenl() {
  return request({
    url: "/conllect/recuit/getScreenl",
    method: "GET",
    params: {},
  });
}

// 获取人才列表数据接口
export function getTalent(data: any) {
  return request({
    url: "/job/resume/list",
    method: "GET",
    params: data,
  });
}
