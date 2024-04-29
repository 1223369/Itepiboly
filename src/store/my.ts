import { userInfo, resumeDetail, resumeDict,labelsSkill } from "@/api/my";
import { defineStore } from "pinia";

export const myStore = defineStore({
  id: "my",
  state: () => {
    return {
      userInfo: {}, // 用户信息
      resumeInfo: {}, // 简历详情
      companyList: [], // 工作经历
      projectList: [], // 项目经历
      experience: [], // 工作经历类型字典
      highestEducation: <Array<any>>[], // 最高学历类型字典
      jobsType: [], // 职位类型字典
      salaryScope: <any>[], // 薪资范围字典
      sysSkillList: [], // 我的简历擅长技能
      loading: false, // 加载状态
    };
  },
  

  actions: {
    // 获取用户详情
    async getUserInfo() {
      const res = await userInfo();
      if (res) {
        this.userInfo = res;
      }
    },

    // 获取我的简历详情
    async getResumeDetail() {
      if (Object.keys({}).length === 0) await this.getUserInfo();
      // this.loading = true;
      const res = await resumeDetail(this.userInfo);
      if (res && res.data[0]) {
        this.resumeInfo = res.data[0].info[0];
        this.companyList = res.data[0].companyList;
        this.projectList = res.data[0].projectList;
      }
      // this.loading = false;
    },

    // 获取我的简历类型字典接口
    async getResumeDict() {
      const res = await resumeDict();
      if (res && res.data) {
        this.experience = res.data.experience;
        // 转换highestEducation为数组类型
        let edu = [];
        for (let i = 0; i < res.data.highestEducation.length; i++) {
          edu.push({
            name: res.data.highestEducation[i].value,
          });
        }
        this.highestEducation = edu;
        this.jobsType = res.data.jobsType;
        // 转换salaryScope为数组类型
        let arr = [];
        let scope = res.data.salary_scope;
        for (let i = 0; i < scope.length; i++) {
          arr.push({
            name: scope[i],
          });
        }
        this.salaryScope = arr;
      }
    },

    // 获取我的简历擅长技能
    async getLabelsSkill() {
      const res = await labelsSkill();
      if (res) {
        this.sysSkillList = res.data
      }
    },

     // 退出登录
    logout() {
      this.userInfo = {}
    }
    
  },
});
