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
    url: "/user/modify",
    method: "PUT",
    data,
  });
}

// 人才端获取我的收藏接口（任务）
export function collectList() {
  return request({
    url: "/task/getTaskCollection",
    method: "GET",
    params: {},
  });
}

// 企业端获取我的收藏接口（人才）
export function talentCollectList() {
  return request({
    url: "/collect/resume/list",
    method: "GET",
    params: {
      type: 1,
    },
  });
}

// 获取我的提现接口
export function transferList() {
  return request({
    url: "/my/transfer/userList",
    method: "GET",
    params: {},
  });
}

// 获取我的收入接口
export function incomeList(data: any) {
  return request({
    url: "/admin/task/purchaseRecord",
    method: "GET",
    params: data,
  });
}

// 我的提现接口
export function withdrawal(data: any) {
  return request({
    url: "/my/apply/transfer",
    method: "POST",
    data,
  });
}

// 获取我的简历详情接口
export function resumeDetail(data: any) {
  return request({
    url: "/admin/resume/getInfoDetailsAPI",
    method: "GET",
    params: {
      id: data.resume_id,
    },
  });
}

// 我的简历个人优势保存接口
export function personAdvantage(data: any) {
  return request({
    url: "/resume/advantage",
    method: "POST",
    data,
  });
}

// 获取我的简历类型字典接口
export function resumeDict() {
  return request({
    url: "/conllect/recuit/getRecuit",
    method: "GET",
    params: {},
  });
}

// 我的简历求职意愿保存接口
export function jobIntention(data: any) {
  return request({
    url: "/resume/job_intention",
    method: "POST",
    data,
  });
}

// 获取我的简历技能字典接口
export function labelsSkill() {
  return request({
    url: "/resume/labels_skill",
    method: "GET",
    params: {
      pid: 4,
    },
  });
}

// 我的简历擅长技能保存接口
export function resumeSkill(data: any) {
  return request({
    url: "/resume/skill",
    method: "POST",
    data,
  });
}

// 我的简历工作经历删除接口
export function workDelete(data: any) {
  return request({
    url: "/job/resume/work/delete",
    method: "DELETE",
    params: data,
  });
}

// 我的简历工作经历添加接口
export function addWorkExper(data: any) {
  return request({
    url: "/admin/resume/work/add",
    method: "POST",
    data,
  });
}

// 我的简历工作经历修改接口
export function editWorkExper(data: any) {
  return request({
    url: "/resume/work/edit",
    method: "PUT",
    data,
  });
}

// 我的简历项目经历删除接口
export function projectDelete(data: any) {
  return request({
    url: "/admin/resume/project/delete",
    method: "DELETE",
    data,
    params: data,
  });
}

// 我的简历项目经历添加接口
export function addProjectExper(data: any) {
  return request({
    url: "/admin/resume/project/add",
    method: "POST",
    data,
  });
}

// 我的简历项目经历修改接口
export function editProjectExper(data: any) {
  return request({
    url: "/admin/resume/project/edit",
    method: "PUT",
    data,
  });
}

// 我的简历教育经历保存接口
export function editEdu(data: any) {
  return request({
    url: "/resume/edu/edit",
    method: "PUT",
    data,
  });
}

// 实名认证保存接口
export function addAuthReal(data: any) {
  return request({
    url: "/real/auth/user",
    method: "POST",
    data,
  });
}

// 意见反馈保存接口
export function addFeedback(data: any) {
  return request({
    url: "/feedback/add",
    method: "POST",
    data,
  });
}

// 身份切换保存接口
export function addRole(data: any) {
  return request({
    url: "/user/identity/switch",
    method: "POST",
    data,
  });
}

// 身份切换人才申请保存接口
export function addPartnerPerson(data: any) {
  return request({
    url: "/settlein/itEnterprise/add",
    method: "POST",
    data,
  });
}

// 企业端任务、合约、体验金数据接口
export function myAllCount() {
  return request({
    url: "/my/all/count",
    method: "GET",
    params: {},
  });
}

// 企业端我的体验金列表接口
export function couponList() {
  return request({
    url: "/experience/getList",
    method: "GET",
    params: {},
  });
}

// 企业端我的体验金领取接口
export function addMycoupon(data: any) {
  return request({
    url: "/experience/addMyList",
    method: "POST",
    data,
  });
}

// 企业端企业认证提交接口
export function companyCertification(data: any) {
  return request({
    url: "/company/certification",
    method: "PUT",
    data,
  });
}

// 企业端企业认证详情接口
export function companyDetail() {
  return request({
    url: "/company/detail",
    method: "GET",
    params: {},
  });
}

// 企业端企业入驻申请接口
export function addEnterprise(data: any) {
  return request({
    url: "/settlein/enterprise/add",
    method: "POST",
    data,
  });
}

// 管理端管理员入驻申请接口
export function addManage(data: any) {
  return request({
    url: "/settlein/manage/add",
    method: "POST",
    data,
  });
}
