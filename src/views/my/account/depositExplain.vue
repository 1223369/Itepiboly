<script setup lang="ts">
import slotExplain from "../components/slotExplain.vue";

// 返回上一页
const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar title="详情说明" left-arrow @click-left="leftBack" />
  <slotExplain>
    <p>
      为保障双方合约期间公平公正的原则，合约履约状态中，合约
      薪资将在本平台冻结，合约完成之后平台审核发放薪资自动扣 除押金。
    </p>
  </slotExplain>
</template>

<style scoped lang="scss">
p {
  font-size: 0.69rem;
  font-weight: 500;
  color: #666666;
  line-height: 1.23rem;
  margin-bottom: 1.5rem;
}
</style>
