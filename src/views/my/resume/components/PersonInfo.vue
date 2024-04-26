<!-- 个人信息组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import UserInfoPage from "../../components/UserInfoPage.vue";
import { myStore } from "@/store/my";


const store = myStore()

// 接收父组件传参
const props = defineProps({
  item: {
    type: Object,
  },
  page: {
    type: String,
  }
});

const state = ref({
  show: false,
});

// 关闭弹窗
const closeChange = () => {
  state.value.show = false;
  store.getResumeDetail();
};

// 向子组件传参数
provide("popup", {
  closeChange,
});
</script>

<template>
  <div class="person-info" >
    <div class="info-left">
      <h3>
        {{ props.item.user_name
        }}<img src="@/assets/img/my/icon-feedback.png" v-if="props.page!=='preview'" @click="state.show = true"/>
      </h3>
      <p>
        {{ props.item.work_year }} | {{ props.item.highest_education }} |
        {{ props.item.ago }}
      </p>
    </div>
    <img :src="props.item.it_head" alt="" />
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
    img {
      width: 1rem;
      height: 1rem;
      margin-left: 0.32rem;
    }
  }

  img {
    width: 3.19rem;
    height: 3.19rem;
    border-radius: 50%;
  }
}
</style>
