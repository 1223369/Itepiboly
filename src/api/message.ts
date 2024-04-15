import request  from '../utils/request';

// 系统消息列表
export function systemList(data: any) {
  return request({
      url: '/user/inform/list',
      method: 'GET',
      params: data
  })
}

// 通知消息详情
export function systemDetails(data: any) {
  return request({
      url: '/user/inform/lookover',
      method: 'GET',
      params: data
  })
}

// 对话列表
export function chatMessageList() {
  return request({
      url: '/it_chat/my/message/list',
      method: 'GET'
  })
}