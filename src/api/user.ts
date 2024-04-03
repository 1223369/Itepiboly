import request  from '../utils/request';

//获取验证码
export function getCode(data: any) {
  return request({
    url: '/login/Code', 
    method: 'POST',
    data
  });
}

//登录
export function login(data: any) {
  return request({
    url: '/login', 
    method: 'POST',
    data
  });
}

//协议文件接口
export function getPolicy(data: any) {
  return request({
    url: 'policy_protocol/list', 
    method: 'GET',
    params: data
  });
}