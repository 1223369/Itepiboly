import request from "../utils/request";

// 合约列表接口
export function contractList(data: any) {
  return request({
    url: "/task/myContractAllList",
    method: "GET",
    params: data,
  });
}

// 合约详情接口
export function contractDetail(data: any) {
  return request({
      url: '/task/contractAllList',
      method: 'GET',
      params: data
  })
}

// 合约签约/拒绝接口
export function contractOperation(data: any) {
  return request({
      url: '/contract/isContract',
      method: 'PUT',
      data
  })
}
