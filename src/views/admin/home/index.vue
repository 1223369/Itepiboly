<script setup lang="ts">
import { ref } from "vue";
import FooterTabbar from "@/components/FooterTabbar.vue";
import CharLine from "./components/CharLine.vue";
import CharBar from "./components/CharBar.vue";
import CharPie from "./components/CharPie.vue";
import { adminHomeChart } from "@/api/admin";

const state = ref({
  chartData: {}, // 图表数据
});

// 获取图表数据
const getAdminHomeChart = async () => {
  const res = await adminHomeChart({});
  if (res) {
    state.value.chartData = res;
  }
};

// 函数调用
getAdminHomeChart();
</script>

<template>
  <div class="admin-page">
    <van-nav-bar title="首页" />

    <!-- 轮播图 -->
    <div class="admin-banner">
      <img src="@/assets/img/admin/home/banner.png" />
      <p>轻松管理项目进度，提高审核效率</p>
    </div>

    <!-- 工作管理 -->
    <div class="admin-title">
      <h3>工作管理<i></i></h3>
    </div>
    <div class="admin-job">
      <router-link to="/admin/home/contract">
        <img src="@/assets/img/admin/home/icon-contract.png" />
        <h4>合约管理<span>合约进度管理</span></h4>
      </router-link>
      <router-link to="/admin/home/auditor">
        <img src="@/assets/img/admin/home/icon-auditor.png" />
        <h4>审核管理<span>任务/认证管理</span></h4>
      </router-link>
      <router-link to="/admin/home/pay">
        <img src="@/assets/img/admin/home/icon-pay.png" />
        <h4>发薪管理<span>合约薪资管理</span></h4>
      </router-link>
      <router-link to="/admin/home/user">
        <img src="@/assets/img/admin/home/icon-user.png" />
        <h4>用户管理<span>入驻用户/企业</span></h4>
      </router-link>
    </div>

    <!-- 合约数据(周) -->
    <div class="admin-title">
      <h3>合约数据(周)<i></i></h3>
      <dl>
        <dt>上周</dt>
        <dd>下周</dd>
      </dl>
    </div>
    <CharLine v-if="state.chartData.line" :data="state.chartData.line" />

    <!-- 新增入驻(周) -->
    <div class="admin-title">
      <h3>新增入驻(周)<i></i></h3>
      <dl>
        <dt>人才</dt>
        <dd>企业</dd>
      </dl>
    </div>
    <CharBar v-if="state.chartData.bar" :data="state.chartData.bar" />

    <!-- 人才年龄比例 -->
    <div class="admin-title">
      <h3>人才年龄比例<i></i></h3>
    </div>
    <CharPie v-if="state.chartData.pie" :data="state.chartData.pie" />
  </div>

  <!-- 底部导航栏 -->
  <FooterTabbar />
</template>

<style scoped lang="scss">
.admin-page {
  padding: 0 0.64rem 4rem;
  background: #f6f6f6;
  min-height: 100vh;

  .admin-banner {
    position: relative;
    img {
      width: 100%;
    }
    p {
      position: absolute;
      top: 60%;
      left: 6%;
      font-size: 0.69rem;
      font-weight: 300;
      color: #ffffff;
    }
  }

  .admin-title {
    display: flex;
    align-items: center;
    margin-bottom: 0.67rem;
    margin-top: 1.44rem;
    h3 {
      flex: 1;
      font-size: 0.96rem;
      line-height: 0.96rem;
      font-weight: bold;
      color: #333333;
      position: relative;
      margin-bottom: 0.4rem;
      i {
        width: 1.87rem;
        height: 0.64rem;
        background: linear-gradient(90deg, #fe8f27, #ffffff);
        opacity: 0.46;
        border-radius: 0.32rem;
        position: absolute;
        left: -0.1rem;
        top: 0.4rem;
        opacity: 0.4;
      }
    }

    dl {
      display: flex;
      font-size: 0.59rem;
      line-height: 0.59rem;
      font-weight: 400;
      color: #666666;
      dt {
        margin-right: 0.77rem;
      }
      dt::before {
        content: "";
        width: 0.37rem;
        height: 0.37rem;
        background: #6da6ea;
        border-radius: 50%;
        margin-right: 0.24rem;
        display: inline-block;
      }
      dd::before {
        content: "";
        width: 0.37rem;
        height: 0.37rem;
        background: #fbc605;
        border-radius: 50%;
        margin-right: 0.24rem;
        display: inline-block;
      }
    }
  }

  .admin-job {
    overflow: hidden;

    a {
      width: 49%;
      height: 4.45rem;
      background: #ffffff;
      border-radius: 0.53rem;
      margin-right: 2%;
      margin-bottom: 0.56rem;
      float: left;
      display: flex;
      align-items: center;

      img {
        width: 2.45rem;
        height: 2.45rem;
        margin: 0 0.56rem 0 0.72rem;
      }
      h4 {
        font-size: 0.8rem;
        line-height: 0.8rem;
        font-weight: 400;
        color: #333333;
        span {
          font-size: 0.64rem;
          line-height: 0.64rem;
          font-weight: 300;
          color: #333333;
          margin-top: 0.45rem;
          display: block;
        }
      }
    }
    a:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
