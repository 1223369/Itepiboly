<script setup lang="ts">
const leftBack = () => history.back();
</script>

<template>
  <div>
    <van-nav-bar
      left-arrow
      title="使用规则"
      @click-left="leftBack"
    ></van-nav-bar>
    <div class="coupon-rule">
      <h5>10000元新人平台扶持体验金</h5>
      <p>
        1、在平台购买代招代聘服务可使用
        <br />2、在平台选择驻场或远程人才三个月以上可使用
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coupon-rule {
  margin: 0.61rem;

  h5 {
    font-size: 0.8rem;
    font-weight: 500;
    color: #333333;
    line-height: 1.3rem;
  }
  p {
    font-size: 0.75rem;
    font-weight: 400;
    color: #333333;
    line-height: 1.3rem;
  }
}
</style>
