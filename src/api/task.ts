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

// 获取任务列表数据
export function taskAllList(data: any) {
  return request({
    url: '/task/TaskAllList', 
    method: 'GET',
    params: data
  });
}

// 获取任务详请数据
export function taskDetail(data: any) {
  return request({
    url: '/task/getTaskDetails', 
    method: 'GET',
    params: data
  });
}

// 收藏任务接口
export function taskCollection(data: any) {
  return request({
      url: '/course/TaskCollection',
      method: 'POST',
      data
  })
}

// 热门搜索接口
export function hotSearch(data: any) {
  return request({
      url: '/position/public/getHotSeach',
      method: 'get',
      data
  })
}
