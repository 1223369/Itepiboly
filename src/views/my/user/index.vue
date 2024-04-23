<script setup lang="ts">
import { reactive, provide } from "vue";
import UserInfoPage from '../components/UserInfoPage.vue'

// 关闭弹窗
const closeChange = () => {
  history.back();
}

// 向子组件传参数
provide("popup", {
  closeChange
});



</script>

<template>
  <UserInfoPage></UserInfoPage>
</template>

<style scoped lang="scss">

</style>
