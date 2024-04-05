<script setup lang="ts">
import { inject,reactive } from "vue";
import { positionTypeList } from "@/api/task";
import { taskStore } from "@/store/task";
import { showToast } from "vant";

const store = taskStore();
// 获取父组件传递的方法
const { closeCitySwitch } = inject('popup')

const state = reactive({
    // 职位类型默认值
    typeKey: 0
});

const getPositionList = async () => {
        const res = await positionTypeList()
        if(res){
            store.setPositionList(res)
        }else{
            showToast(res.msg)
        }
    }
  if(store.positionList.length <= 0) getPositionList();

const leftBack = () => closeCitySwitch();
</script>

<template>
  <van-nav-bar title="职位类型" left-arrow @click-left="leftBack" />
  <!-- 职位类型 -->
  <div class="position-type">
    <div class="position-type-left">
      <h5  v-for="(item, index) in store.positionList" :key="index" @click="closeCitySwitch(item.name)">{{ item.name }}</h5>
    </div>

    <!-- 职位类型右侧 -->
    <div class="position-type-right">
      <span v-for="(item, index) in store.positionList[state.typeKey]?.children" :key="index" @click="closeCitySwitch(item.name)">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.position-type {
  display: flex;

  .position-type-left{
      width: 4.77rem;
      height: calc(100vh - 46px);
      background: #F6F6F6;
      h5{
        width: 4.77rem;
        height: 2.4rem;
        line-height: 2.4rem;
        background: #F6F6F6;
        border-bottom: 1px solid #ffffff;
        font-size: 0.75rem;
        font-weight: 300;
        color: #333333;
        text-align: center;
      }
      h5.active{
        background: #EFEFEF;
      }
    }

    .position-type-right {
      padding: 0.8rem 0 0 0.6rem;
      span {
        width: 6.61rem;
        height: 2.03rem;
        line-height: 2.03rem;
        background: #FFFFFF;
        border: 1px solid #E9E9E9;
        border-radius: 0.11rem;
        font-size: 0.75rem;
        font-weight: 300;
        color: #666666;
        text-align: center;
        margin-right: 0.59rem;
        margin-bottom: 0.64rem;
        display: inline-block;
        span:nth-child(2n){
          margin-right: 0;
        }
      }
    }
}
</style>
