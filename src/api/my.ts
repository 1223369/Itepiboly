import request from "../utils/request";

// 获取用户基本信息接口
export function userInfo() {
  return request({
    url: "/clicent/user_info",
    method: "GET",
    params: {},
  });
}

// 图片上传接口
export function uploadImage(data: any) {
  return request({
    url: "/upload/image",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 个人信息提交接口
export function userModify(data: any) {
  return request({
      url: '/user/modify',
      method: 'PUT',
      data
  })
}

// 获取我的收藏接口
export function collectList() {
  return request({
      url: '/task/getTaskCollection',
      method: 'GET',
      params: {}
  })
}

// 获取我的提现接口
export function transferList() {
  return request({
      url: '/my/transfer/userList',
      method: 'GET',
      params: {}
  })
}

// 获取我的收入接口
export function incomeList(data: any) {
  return request({
      url: '/admin/task/purchaseRecord',
      method: 'GET',
      params: data
  })
}

// 我的提现接口
export function withdrawal(data: any) {
  return request({
      url: '/my/apply/transfer',
      method: 'POST',
      data
  })
}