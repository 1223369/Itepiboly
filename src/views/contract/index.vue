<script setup lang="ts">
import FooterTabbar from "@/components/FooterTabbar.vue";
import ContractPage from "./components/ContractPage.vue";
</script>

<template>
  <van-nav-bar fixed title="合约" />
  <Suspense>
    <ContractPage></ContractPage>
  </Suspense>
  <FooterTabbar></FooterTabbar>
</template>

<style scoped lang="scss"></style>
