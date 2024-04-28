<script setup lang="ts">
  import SwitchList from '../components/SwitchList.vue'

  const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar title="切换身份" left-arrow @click-left="leftBack" />

  <div class="switch-page">
    <SwitchList></SwitchList> 
  </div>
</template>

<style scoped lang="scss"> 
.switch-page {
  height: calc(100vh - 4.8rem);
  padding: 0.91rem 0.64rem;
  background: #f9f9f9;
}
</style>
