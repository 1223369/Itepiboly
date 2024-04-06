import request  from '../utils/request';

//获取职位类型
export function positionTypeList(data: any) {
  return request({
      url: '/position/positionTypeApi',
      method: 'get',
      params: data
  })
}

//获取城市列表
export function cityList(data: any) {
  return request({
    url: '/sys/city/list', 
    method: 'GET',
    params: data
  });
}

//获取轮播图
export function bannerList(data: any) {
  return request({
    url: '/home/banner/list', 
    method: 'GET',
    params: data
  });
}

//获取筛选列表数据
export function screenList() {
  return request({
    url: '/task/getTaskAll', 
    method: 'GET'
  });
}