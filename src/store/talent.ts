import { defineStore } from "pinia";

export const talentStore = defineStore({
  id: "talent",
  state: () => {
    return {
      highestList: [], // 学历要求
      salaryList: [], // 薪资范围
      experienceList: [], // 经验要求
      hotSearchList: [], // 热门搜索
      // 任务列表滚动位置
      taskScroll: 0,
      // 搜索列表滚动位置
      searchScroll: 0,
    };
  },

  actions: {
    setScreen(data: any) {
      this.highestList = data.highest;
      this.salaryList = data.salary;
      this.experienceList = data.experience;
    },

    setHotSearchList(data: any) {
      this.hotSearchList = data;
    },
    setTaskScroll(data: any) {
      this.taskScroll = data;
    },
    setSearchScrolll(data: any) {
      this.searchScroll = data;
    },
  },
});
