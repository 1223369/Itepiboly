<script setup lang="ts">
import { myStore } from "@/store/my";
import { useRouter } from "vue-router";

const router = useRouter();
const store = myStore();
if (!store.userInfo.user_name) store.getUserInfo();

// 路由跳转
const gotoPage = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="account-info">
    <p>
      <label
        >账户余额(Out币)<van-icon
          name="question-o"
          @click="gotoPage('/my/account/coinExplain')"
      /></label>
      <span @click="gotoPage('/my/account/advance')"
        >提现<van-icon name="arrow"
      /></span>
    </p>

    <!-- 余额 -->
    <h3>
      ￥{{
        store.userInfo.account_price && store.userInfo.account_price.toFixed(2)
      }}
    </h3>
    <!-- 企业端余额 -->
    <dl v-if="store.userInfo.role == 3">
      <dt>
        <h5>
          ￥{{
            store.userInfo.account_price &&
            (store.userInfo.account_price-store.userInfo.frozen_amount).toFixed(2)
          }}
        </h5>
        <h6>可用余额</h6>
      </dt>
      <dt>
        <h5>
          ￥{{
            store.userInfo.frozen_amount &&
            store.userInfo.frozen_amount.toFixed(2)
          }}
        </h5>
        <h6>
          签约押金(不可用)<van-icon
            name="question-o"
            @click="gotoPage('/my/account/depositExplain')"
          />
        </h6>
      </dt>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.account-info {
  background: #ff8e00;
  width: 100%;

  p {
    padding: 1rem 0.67rem 3.57rem;
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    justify-content: space-between;

    label {
      i {
        margin-left: 0.3rem;
      }
    }
  }

  h3 {
    font-size: 1.6rem;
    line-height: 1.6rem;
    font-weight: 400;
    color: #ffffff;
    padding-bottom: 2.13rem;
    text-align: center;
  }

  dl {
    display: flex;
    dt {
      flex: 1;
      text-align: center;

      h5 {
        font-size: 0.8rem;
        font-weight: bold;
        color: #ffffff;
        line-height: 1.07rem;
      }

      h6 {
        font-size: 0.69rem;
        font-weight: 400;
        color: #ffffff;
        line-height: 1.07rem;
        margin: 0.53rem 0 1.09rem;
      }
    }
  }
}
</style>
