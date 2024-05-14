import request from "../utils/request";

// 管理员端-合约列表接口
export function adminContractList(data: any) {
  return request({
    url: "/admin/home/contract/list",
    method: "GET",
    params: data,
  });
}
