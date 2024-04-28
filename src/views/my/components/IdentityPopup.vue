<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  role: {
    type: Number,
  },
});
const emits = defineEmits(["back"]);
const gotoPage = () => {
  if (props.role === 1) router.push("/my/partner/person");
  if (props.role === 2) router.push("/my/partner/admin");
  if (props.role === 3) router.push("/my/partner/company");
};
</script>
<template>
  <div class="switch-popup">
    <div class="switch-top">
      <strong>!</strong>
      <p>温馨提示</p>
    </div>
    <p class="switch-p">您当时尚未申请身份 <br />暂无身份切换</p>
    <div class="switch-btn">
      <button class="active" @click="emits('back')">想一想</button>
      <button @click="gotoPage">去申请</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.switch-popup {
  width: 13.07rem;
  height: 15.42rem;
  background: url(@/assets/img/my/manager-back.png) no-repeat;
  background-size: 100%;
  text-align: center;

  .switch-top {
    padding-top: 1.63rem;
    color: #ffffff;

    strong {
      width: 2.03rem;
      height: 2.03rem;
      background: #ffffff;
      border-radius: 50%;
      display: inline-block;
      color: #ff6f00;
      line-height: 2.03rem;
      font-size: 1.5rem;
      margin-bottom: 0.72rem;
    }
    p {
      margin-bottom: 2.9rem;
      font-size: 0.8rem;
    }
  }
  .switch-p {
    font-size: 0.8rem;
    font-weight: 400;
    color: #333333;
    line-height: 1.28rem;
    margin-bottom: 1.6rem;
  }
  .switch-btn {
    padding: 0 1.25rem;
    display: flex;
    justify-content: space-between;

    button {
      width: 5.1rem;
      height: 1.92rem;
      background: #fe9215;
      border: 1px solid #ff6f00;
      border-radius: 0.16rem;
      color: #ffffff;
    }
    button.active {
      background: #ffffff;
      color: #fe9215;
    }
  }
}
</style>
