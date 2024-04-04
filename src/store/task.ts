import { defineStore } from 'pinia'
export const taskStore = defineStore({
    id: 'task',
    state: () => {
        return {
            cityList: []
        }
    },
    actions: {
        setCityList(data: any){
            this.cityList = data
        }
    }
})