<!-- 个人信息组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import UserInfoPage from "../../components/UserInfoPage.vue";

const state = ref({
  show: false,
});


// 关闭弹窗
const closeChange = () => {
  state.value.show = false;
}

// 向子组件传参数
provide("popup", {
  closeChange
});


</script>

<template>
  <div class="person-info" @click="state.show = true">
    <div class="info-left">
      <h3>测试<img src="@/assets/img/my/icon-feedback.png" /></h3>
      <p>8年 | 本科 | 22岁</p>
    </div>
    <img src="" alt="" />
  </div>

  <!-- 编辑个人信息弹窗 -->
  <van-popup
    v-model:show="state.show"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <UserInfoPage></UserInfoPage>
  </van-popup>
</template>

<style scoped lang="scss">
.person-info {
  padding: 0.99rem 0 1.41rem;
  margin: 0 0.72rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f3f3f3;

  .info-left {
    h3 {
      font-size: 1.28rem;
      line-height: 1.28rem;
      font-weight: 400;
      color: #333333;
      margin-bottom: 0.64rem;
      display: flex;
      align-items: flex-end;
    }
    p {
      font-size: 0.69rem;
      line-height: 0.69rem;
      font-weight: 300;
      color: #666666;
    }
  }

  img {
    width: 1rem;
    height: 1rem;
    margin-left: 0.32rem;
  }
}
</style>
