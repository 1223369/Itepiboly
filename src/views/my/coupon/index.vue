<!-- 体验价主页 -->
<script setup lang="ts">
import { ref } from "vue";
import { couponList, addMycoupon } from "@/api/my";
import { showToast } from "vant";

const state = ref({
  list: [], // 体验金列表
  btn: [], // 按钮状态
});

// 获取体验金列表
const getCouponList = async () => {
  const res = await couponList();
  console.log("res", res);
  if (res) {
    state.value.list = res.data;
  }
};

// 领取体验金
const couponSubmit = async (item: any) => {
  const res = await addMycoupon({
    experience_id: item.id,
    experience_days: item.experience_days,
  });
  if (res) {
    showToast("领取成功");
    getCouponList();
  } else {
    showToast("领取失败");
  }
};

// 方法调用
getCouponList();

const leftBack = () => history.back();
</script>

<template>
  <div class="coupon-page">
    <van-nav-bar fixed left-arrow title="我的体验金" @click-left="leftBack">
      <template #right>
        <router-link to="/my/coupon/rule">
          <van-icon>使用规则</van-icon>
        </router-link>
      </template>
    </van-nav-bar>
    <img src="@/assets/img/my/coupon/banner.png" />
    <dl>
      <dt
        v-for="item in state.list"
        :key="item.id"
        :id="item.is_check == 2 || item.is_check == 3 ? 'link' : 'active'"
      >
        <div class="list-coupon-left">
          <strong>{{ item.price }}</strong>
          <span>体验金</span>
        </div>

        <div class="list-coupon-center">
          <h5>{{ item.title }}</h5>
          <p v-if="item.is_check == null">
            有效期：{{ item.experience_days }}天
          </p>
          <p v-else>有效期至：{{ item.effective_days }}</p>
        </div>

        <div class="list-coupon-right">
          <button v-if="item.is_check == null" @click="couponSubmit(item)">
            领取
          </button>
          <router-link to="/my/coupon/rule">
            <button v-if="item.is_check == 1" class="btn-type-2">去使用</button>
          </router-link>
          <button
            v-if="item.is_check == 2 || item.is_check == 3"
            class="btn-type-3"
          >
            去使用
          </button>

          <i v-if="item.is_check == 2 || item.is_check == 3"></i>
          <em v-if="item.is_check == 2">已使用</em>
          <em v-if="item.is_check == 3">已过期</em>
        </div>
      </dt>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.coupon-page {
  margin-top: 2.9rem;
  background: #f6f6f6;
  height: 100vh;

  img {
    width: 100%;
    margin-bottom: 0.83rem;
  }

  dl {
    margin: 0 0.8rem;
    overflow: hidden;

    dt {
      width: 21.8rem;
      height: 5.33rem;
      margin-bottom: 0.56rem;
      display: flex;
      position: relative;
      align-items: center;
      border-radius: 0.27rem;
      overflow: hidden;

      .list-coupon-left {
        width: 29%;
        text-align: center;

        strong {
          font-size: 1.28rem;
          font-weight: 500;
          color: #f19638;
          display: block;
        }

        span {
          font-size: 0.59rem;
          font-weight: 400;
          color: #f19638;
          border: 1px solid #f19638;
          border-radius: 0.11rem;
          padding: 0 0.21rem;
        }
      }

      .list-coupon-center {
        width: 49%;
        text-align: center;

        h5 {
          font-size: 0.8rem;
          line-height: 0.8rem;
          font-weight: 400;
          color: #282828;
          margin-bottom: 0.64rem;
        }

        p {
          font-size: 0.64rem;
          line-height: 0.64rem;
          font-weight: 400;
          color: #909090;
        }
      }

      .list-coupon-right {
        width: 22%;

        button {
          width: 3.31rem;
          height: 1.23rem;
          background: #ff9415;
          border-radius: 0.61rem;
          border: 1px solid #ff9415;
          font-size: 0.64rem;
          color: #ffffff;
        }

        .btn-type-2 {
          background: #ffffff;
          border: 1px solid #ff9415;
          color: #ff9415;
        }

        .btn-type-3 {
          background: #ffffff;
          border: 1px solid #999999;
          color: #999999;
        }

        i {
          position: absolute;
          border-bottom: 2rem solid #c9c9c9;
          border-radius: 0rem 0rem 0rem 0rem;
          border-left: 2rem solid transparent;
          border-right: 2rem solid transparent;
          -webkit-transform: rotate(45deg);
          padding-left: 0px;
          right: -1.4rem;
          top: -0.4rem;
        }
        em {
          font-size: 0.56rem;
          font-weight: 400;
          color: #ffffff;
          position: absolute;
          top: 0.5rem;
          right: 0rem;
          -webkit-transform: rotate(45deg);
          padding-left: 0rem;
          font-style: normal;
        }
      }
    }

    #link {
      background: url(@/assets/img/my/coupon/list-link.png) no-repeat;
      background-size: 100%;
    }
    #active {
      background: url(@/assets/img/my/coupon/list-active.png) no-repeat;
      background-size: 100%;
    }

    #link 
    strong,
    h5,
    p {
      
      color: #c4c4c4;
    }
    #link span {
      color: #999999;
      border-color: #999999;
    }
  }
}
</style>
