<script setup lang="ts">
import ContractPage from "../../contract/components/ContractPage.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 获取router中的参数
const type = router.currentRoute.value.params.id;

const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar fiext title="我的合约" left-arrow @click-left="leftBack" />
  <Suspense>
    <ContractPage :type="type"></ContractPage>
  </Suspense>
</template>

<style scoped lang="scss"></style>
