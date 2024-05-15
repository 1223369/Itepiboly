import request from "../utils/request";

// 管理员端-合约列表接口
export function adminContractList(data: any) {
  return request({
    url: "/admin/home/contract/list",
    method: "GET",
    params: data,
  });
}

// 管理员端-合约是否完成接口
export function adminContractConfirm(data: any) {
  return request({
    url: "/admin/home/contract/confirm",
    method: "POST",
    data,
  });
}

// 管理员端-合约发薪接口
export function adminPayConfirm(data: any) {
  return request({
    url: "/admin/home/contract/pay/confirm",
    method: "POST",
    data,
  });
}
