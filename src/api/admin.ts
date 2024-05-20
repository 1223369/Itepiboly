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

// 管理员端-审核管理-人才列表接口
export function adminAuditorTalentList(data: any) {
  return request({
    url: "/admin/home/auditor/talent/list",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-人才详情接口
export function adminAuditorTalentDetail(data: any) {
  return request({
    url: "/admin/home/auditor/talent/detail",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-人才操作审核接口
export function adminAuditorTalentEdit(data: any) {
  return request({
    url: "/admin/home/auditor/talent/edit",
    method: "POST",
    data,
  });
}

// 管理员端-审核管理-企业列表接口
export function adminAuditorCompanyList(data: any) {
  return request({
    url: "/admin/home/auditor/company/list",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-企业详情接口
export function adminAuditorCompanyDetail(data: any) {
  return request({
    url: "/admin/home/auditor/company/detail",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-企业操作审核接口
export function adminAuditorCompanyEdit(data: any) {
  return request({
    url: "/admin/home/auditor/company/edit",
    method: "POST",
    data,
  });
}

// 管理员端-用户管理-用户列表接口
export function adminUserUserList(data: any) {
  return request({
    url: "/admin/home/user/user/list",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-用户操作接口
export function adminUserUserConfirm(data: any) {
  return request({
    url: "/admin/home/user/user/confirm",
    method: "POST",
    data,
  });
}

// 管理员端-用户管理-企业列表接口
export function adminUserCompanyList(data: any) {
  return request({
    url: "/admin/home/user/company/list",
    method: "GET",
    params: data,
  });
}

// 管理员端-审核管理-企业操作接口
export function adminUserCompanyConfirm(data: any) {
  return request({
    url: "/admin/home/user/company/confirm",
    method: "POST",
    data,
  });
}

// 管理员端-首页图表数据接口
export function adminHomeChart(data: any) {
  return request({
    url: "/admin/home/chart",
    method: "GET",
    params: data,
  });
}
