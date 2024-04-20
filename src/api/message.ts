import request from "../utils/request";

// 系统消息列表
export function systemList(data: any) {
  return request({
    url: "/user/inform/list",
    method: "GET",
    params: data,
  });
}

// 通知消息详情
export function systemDetails(data: any) {
  return request({
    url: "/user/inform/lookover",
    method: "GET",
    params: data,
  });
}

// 对话列表
export function chatMessageList() {
  return request({
    url: "/it_chat/my/message/list",
    method: "GET",
  });
}

// 对话消息聊天内容
export function chatMessageContent(data: any) {
  return request({
    url: "/it_chat/message/list",
    method: "GET",
    params: data,
  });
}

// 消息常用语列表
export function chatMessageWordsList(data: any) {
  return request({
    url: "/it_chat/message/works/list",
    method: "GET",
    params: data,
  });
}

// 消息常用语添加
export function chatMessageWordsAdd(data: any) {
  return request({
    url: "/it_chat/message/works/add",
    method: "POST",
    data,
  });
}

// 消息常用语修改
export function chatMessageWordsEdit(data: any) {
  return request({
    url: "/it_chat/message/works/edit",
    method: "POST",
    data,
  });
}

// 消息常用语删除
export function chatMessageWordsDelete(data: any) {
  return request({
    url: "/it_chat/message/works/delete",
    method: "POST",
    data,
  });
}

// 对话消息内容发送
export function chatMessageContentAdd(data: any) {
  return request({
      url: '/it_chat/add_message',
      method: 'POST',
      data
  })
}