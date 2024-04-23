<script setup lang="ts">
import { ref, watch } from "vue";
import { withdrawal } from "@/api/my";
import { showToast } from "vant";
import { myStore } from "@/store/my";

const store = myStore();
const state = ref({
  price: 0, //提现金额
  loading: false,
});

// TODO: 提现余额
const submitAdvance = async () => {
  if (state.value.price < 0.1) {
    showToast("提现金额不能小于0.1元");
    return;
  }
  const res = await withdrawal({
    price: state.value.price,
  });

  if (res) {
    store.getUserInfo();
  }
  showToast(res.msg);
};

// TODO: 全部提现
const allAdvance = () => {
  state.value.price = store.userInfo.account_price;
};

watch(
  () => state.value.price,
  (newVal, oldVal) => {
    if (parseFloat(newVal) < 0) {
      showToast("提现金额不能小于0");
      return;
    }
    if (parseFloat(newVal) > 50000) {
      showToast("每次提现金额不能超过50000");
      return;
    }
    // 处理输入框能输入超过两位小数点问题
    if (newVal) {
      newVal = newVal.toString();
      let index = newVal.indexOf(".");
      console.log('newValue.length', newVal.length)
      if (index > 0 && newVal.length - index > 3) {
        state.value.price = parseFloat(oldVal);
        return;
      }
    }
  }
);

const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar title="提现" left-arrow @click-left="leftBack" />

  <!-- 提现表单 -->
  <div class="advance">
    <van-form @submit="submitAdvance">
      <div class="advance-amount">
        <h5>提现金额</h5>
        <div>
          <span>￥</span>
          <input v-model="state.price" type="float" />
        </div>
        <p>
          <span>可提现余额￥{{ store.userInfo.account_price }}</span>
          <label @click="allAdvance">全部提现</label>
        </p>
      </div>
      <button class="advance-btn" native-type="submit">提现至支付宝</button>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-nav-bar__content) {
  background: #ff8e00;
}
:deep(.van-nav-bar__title) {
  color: #ffffff;
}
:deep(.van-icon-arrow-left:before) {
  color: #ffffff;
}
.advance {
  padding: 1.17rem 0.64rem 0;
  background: #f9f9f9;
  height: calc(100vh - 46px - 1.17rem);

  .advance-amount {
    background: #ffffff;
    border-radius: 0.27rem;
    padding: 1.31rem 0.72rem 0rem;

    h5 {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 400;
      color: #999999;
      margin-bottom: 2.43rem;
    }

    div {
      font-size: 1.28rem;
      line-height: 1.28rem;
      font-weight: 400;
      color: #333333;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid #eeeeee;
    }
    p {
      padding: 0.93rem 0;
      display: flex;
      justify-content: space-between;
      span {
        color: #999999;
      }
      label {
        color: #ff8e00;
      }
      span {
        color: #999999;
      }
    }
  }
  .advance-btn {
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #ffa400, #ff8900);
    border-radius: 0.27rem;
    font-size: 0.8rem;
    color: #ffffff;
    border: 0;
    text-align: center;
    width: calc(100vw - 1.28rem);
    margin-top: 1.33rem;
  }
}
</style>
