import request from "../utils/request";

// 合约列表接口
export function contractList(data: any) {
  return request({
    url: "/task/myContractAllList",
    method: "GET",
    params: data,
  });
}

