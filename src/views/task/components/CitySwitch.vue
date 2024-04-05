<script setup lang="ts">
import { inject } from "vue";
import { cityList } from "@/api/task";
import { taskStore } from "@/store/task";
import { showToast } from "vant";

const store = taskStore();
// 获取父组件传递的方法
const { closeCitySwitch } = inject('popup')

const getCityList = async () => {
        const res = await cityList()
        if(res){
            store.setCityList(res)
        }else{
            showToast(res.msg)
        }
    }
  if(store.cityList.length <= 0) getCityList();

const leftBack = () => closeCitySwitch();
</script>

<template>
  <van-nav-bar title="城市切换" left-arrow @click-left="leftBack" />
  <div class="city-switch">
    <h3>当前城市</h3>
    <div class="city-switch-text">
      <span @click="leftBack(store.cityValue)">{{ store.cityValue }}</span>
    </div>
    <h3>其他城市</h3>
    <div class="city-switch-text">
      <span v-for="(item, index) in store.cityList" :key="index" @click="closeCitySwitch(item.name)">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.city-switch {
  padding: 0 0.7rem;

  h3 {
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #000000;
    margin: 0.7rem 0 0.96rem;
  }

  .city-switch-text {
    span {
      width: 4.01rem;
      height: 1.6rem;
      line-height: 1.6rem;
      background: #ffffff;
      border: 1px solid #ebebeb;
      border-radius: 0.11rem;
      font-size: 0.64rem;
      text-align: center;
      font-weight: 400;
      color: #333333;
      margin: 0 0.7rem 0.8rem 0;
      display: inline-block;
    }
    span:nth-child(4n){
      margin-right: 0px;
    }
  }
}
</style>
