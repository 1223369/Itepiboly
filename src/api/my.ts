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