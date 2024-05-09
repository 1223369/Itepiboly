<script setup lang="ts">
import { inject, ref } from "vue";

const state = ref({
  value: "", // 输入框内容
});
// 接收父组件方法
const { closeTalent } = inject("popup") as () => void;
</script>

<template>
  <van-nav-bar title="选择人才" left-arrow @click-left="closeTalent('')" />
  <div class="talent-small">
    <div class="talent-small-item">
      <img src="" alt="" />
      <div class="small-item-text">
        <h3>李想<i>自营</i></h3>
        <p>前端工程师 | 男 | 5年 | 本科 | 23岁</p>
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
