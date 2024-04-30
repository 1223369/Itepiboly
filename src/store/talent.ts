import { defineStore } from "pinia";

export const talenetStore = defineStore({
  id: "talenet",
  state: () => {
    return {
      highestList: [], // 学历要求
      salaryList: [], // 薪资范围
      experienceList: [], // 经验要求
      hotSearchList: [], // 热门搜索
    };
  },

  actions: {
    setScreen(data: any) {
      this.highestList = data.highest;
      this.salaryList = data.salary;
      this.experienceList = data.experience;
    }
  },
});
