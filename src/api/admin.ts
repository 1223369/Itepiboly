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

// 管理员端-审核管理-任务列表接口
export function adminAuditorTaskList(data: any) {
  return request({
    url: "/admin/home/auditor/task/list",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-任务详情接口
export function adminAuditorTaskDetail(data: any) {
  return request({
    url: "/admin/home/auditor/task/detail",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-任务操作审核接口
export function adminAuditorTaskEdit(data: any) {
  return request({
    url: "/admin/home/auditor/task/edit",
    method: "POST",
    data,
  });
}
