<script setup lang="ts">
import { inject, ref } from "vue";
import { getTalent } from '@/api/talent'

const state = ref({
  list: [], // 人才列表
});

// 获取人才列表
const getTalentList = async () => {
  const res = await getTalent({});
  console.log('res', res)
  if (res) {
    state.value.list = res.records;
  }
}

// 方法调用
getTalentList();

// 接收父组件方法
const { closeTalent } = inject("popup") as () => void;
</script>

<template>
  <van-nav-bar title="选择人才" left-arrow @click-left="closeTalent('')" />
  <div class="talent-small">
    <div class="talent-small-item" v-for="item in state.list" :key="item.id" @click="closeTalent(item)">
      <img :src="item.it_head" alt="" />
      <div class="small-item-text">
        <h3>{{ item.user_name }}<i>自营</i></h3>
        <p>{{ item.position_name }} | {{ item.sex == 1 ? '男' : '女' }} | {{ item.work_year }} | {{ item.highest_education }} | {{ item.age }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.talent-small-item {
  border-bottom: 1px solid #eeeeee;
  display: flex;
  padding: 0.88rem 0.93rem;

  img {
    width: 2.67rem;
    height: 2.67rem;
    background: #f6f5f5;
    border-radius: 50%;
    margin-right: 0.75rem;
  }
  h3 {
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 300;
    color: #333333;
    margin-bottom: 0.48rem;

    i {
      width: 1.97rem;
      height: 0.85rem;
      line-height: 0.85rem;
      display: inline-block;
      background: linear-gradient(90deg, #fea829, #fe8f27);
      border-radius: 1.5rem 1rem 1rem 1rem;
      font-size: 0.59rem;
      font-weight: normal;
      color: #ffffff;
      font-style: normal;
      text-align: center;
      margin-left: 0.64rem;
    }
  }
  p {
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 100;
    color: #333333;
  }
}
</style>
