import request  from '../utils/request';

//获取验证码
export function getCode(data: any) {
  return request({
    url: '/login/Code', 
    method: 'POST',
    data
  });
}



//获取城市列表
export function cityList(data: any) {
  return request({
    url: 'sys/city/list', 
    method: 'GET',
    params: data
  });
}