import { defineStore } from 'pinia'
export const taskStore = defineStore({
    id: 'task',
    state: () => {
        return {
            //当前城市值
            cityValue: localStorage.getItem('cityValue') || '北京',
            cityList: [],
            // 轮播图
            bannerList: [],
            // 职位类型
            positionList: [],
        }
    },
    actions: {
        setCityValue(value: string){
            this.cityValue = value
        },
        setCityList(data: any){
            this.cityList = data
        },
        setBannerList(data: any){
            this.bannerList = data
        },
        setPositionList(data: any){
            this.positionList = data
        }
    }
})