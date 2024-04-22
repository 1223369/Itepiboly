import { cityList } from "@/api/task";
import { defineStore } from "pinia";
export const taskStore = defineStore({
  id: "task",
  state: () => {
    return {
      //当前城市值
      cityValue: localStorage.getItem("cityValue") || "北京",
      cityList: [],
      areaList: [], // 区域列表
      // 轮播图
      bannerList: [],
      // 职位类型
      positionList: [],
      // 筛选数据
      screenList: [],
      // 热门搜索
      hotSearchList: [],
      // 任务列表滚动位置
      taskScroll: 0,
      // 搜索列表滚动位置
      searchScroll: 0,
    };
  },
  actions: {
    setCityValue(value: string) {
      this.cityValue = value;
    },
    setCityList(data: any) {
      this.cityList = data;
    },
    setBannerList(data: any) {
      this.bannerList = data;
    },
    setPositionList(data: any) {
      this.positionList = data;
    },
    setScreenList(data: any) {
      this.screenList = data;
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

    // 保存城市列表
    async getCityList() {
      const res: any = await cityList({});
      if (res) {
        this.cityList = res;
        let city: any = [];
        for (var i = 0; i < res.length; i++) {
          city.push({
            text: res[i].name,
            children: [],
          });
          if (res[i].children && res[i].children.length) {
            for (var j = 0; j < res[i].children.length; j++) {
              city[i].children.push({
                text: res[i].children[j].name,
              });
            }
          }
        }
        this.areaList = city;
      }
    },
  },
});
