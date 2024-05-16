<script setup lang="ts">
import { reactive } from "vue";
import {
  adminUserUserList,
  adminUserUserConfirm,
  adminUserCompanyList,
  adminUserCompanyConfirm,
} from "@/api/admin";
import { showToast } from "vant";
import Tabs from "@/components/Tabs.vue";
import { useRouter } from "vue-router";

const tabs = [
  {
    type: 0,
    text: "人才管理",
  },
  {
    type: 1,
    text: "企业管理",
  },
];

const state = reactive({
  loading: false,
  type: 0, // 0: 人才管理 1: 企业管理
  userList: [],
  companyList: [],
});

// 切换tab栏
const setTabList = (type: number) => {
  if (type === state.type) return;
  state.type = type;
  if (state.type === 0) getAdminUserUserList();
  if (state.type === 1) getAdminUserCompanyList();
};

// 获取用户列表
const getAdminUserUserList = async () => {
  state.loading = true;
  const res = await adminUserUserList({});
  if (res) {
    state.userList = res as any;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};
// 获取企业列表
const getAdminUserCompanyList = async () => {
  state.loading = true;
  const res = await adminUserCompanyList({});
  if (res) {
    state.companyList = res as any;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 用户恢复/禁用
const userConfirm = async (item: any, type: number) => {
  const res = await adminUserUserConfirm({
    id: item.id,
    type: type,
  });
  if (res) {
    showToast("操作成功");
    getAdminUserUserList();
  }
};

// 企业恢复/禁用
const companyConfirm = async (item: any, type: number) => {
  const res = await adminUserCompanyConfirm({
    id: item.id,
    type: type,
  });
  if (res) {
    showToast("操作成功");
    getAdminUserCompanyList();
  }
};

// 返回上一页
const leftBack = () => history.back();

// 函数调用
getAdminUserUserList();
</script>

<template>
  <div class="wy-admin-page">
    <van-nav-bar title="用户管理" left-arrow @click-left="leftBack" />
    <Tabs :tabs="tabs" @tabsCall="setTabList"></Tabs>

    <!-- 人才管理列表 -->
    <div v-if="state.type === 0">
      <van-pull-refresh v-model="state.loading" @refresh="getAdminUserUserList">
        <dl v-for="(item, index) in state.userList" :key="index">
          <dt>
            <h3>
              {{ item.real_name }}
              <i v-if="item.isdelete === 1">正常</i>
              <i v-if="item.isdelete === 0">禁用</i>
            </h3>
          </dt>
          <dt>
            <label>账号：</label>
            <span>{{ item.accounts }}</span>
          </dt>
          <dt>
            <label>性别：</label>
            <span>{{ item.sex }}</span>
          </dt>
          <dd>
            <button v-if="item.isdelete == 1" @click="userConfirm(item, 0)">
              禁用
            </button>
            <button v-if="item.isdelete == 0" @click="userConfirm(item, 1)">
              恢复
            </button>
          </dd>
        </dl>
        <van-loading v-if="state.loading">加载中...</van-loading>
        <div
          class="wy-no-data"
          v-if="!state.loading && state.userList.length == 0"
        >
          暂无数据
        </div>
      </van-pull-refresh>
    </div>

    <!-- 企业管理列表 -->
    <div v-if="state.type === 1">
      <van-pull-refresh
        v-model="state.loading"
        @refresh="getAdminUserCompanyList"
      >
        <dl v-for="(item, index) in state.companyList" :key="index">
          <dt>
            <h3>
              {{ item.company_name }}
              <i v-if="item.isdelete == 0">禁用</i>
              <i v-if="item.isdelete == 1">启用</i>
            </h3>
          </dt>
          <dt>
            <label>企业法人：</label>
            <span>{{ item.contacts }}</span>
          </dt>
          <dt>
            <label>机构代码：</label>
            <span>{{ item.organization_code }}</span>
          </dt>
          <dt>
            <label>联系电话：</label>
            <span>{{ item.phone }}</span>
          </dt>
          <dd>
            <button v-if="item.isdelete == 0" @click="companyConfirm(item, 1)">
              恢复
            </button>
            <button v-if="item.isdelete == 1" @click="companyConfirm(item, 0)">
              禁用
            </button>
          </dd>
        </dl>
        <div
          class="wy-no-data"
          v-if="!state.loading && state.companyList.length == 0"
        >
          暂无数据
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 解决下拉刷新高度不够
.van-pull-refresh {
  height: calc(100vh - 4.8rem);
  overflow: auto;
}
.wy-admin-page {
  background: #f6f6f6;
  height: 100vh;
  overflow: auto;

  dl {
    background: #ffffff;
    border-radius: 0.53rem;
    margin: 0 0.59rem 0.53rem;
    padding: 0.88rem 0.48rem 0.64rem;

    dt {
      margin-bottom: 0.48rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      h3 {
        font-size: 0.91rem;
        line-height: 0.91rem;
        font-weight: 400;
        color: #333333;
        margin-bottom: 0.4rem;
        i {
          font-style: normal;
          font-size: 0.64rem;
          line-height: 0.64rem;
          font-weight: 400;
          color: #fe9215;
          float: right;
        }
      }
      label {
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 300;
        color: #666666;
      }
      span {
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 300;
        color: #333333;
      }
    }

    dd {
      border-top: 1px solid #f5f5f5;
      overflow: hidden;
      padding: 0.53rem 0rem 0 0;
      margin-top: 0.68rem;

      button {
        border: none;
        width: 4rem;
        height: 1.39rem;
        background: #fe9215;
        border-radius: 0.16rem;
        font-size: 0.69rem;
        font-weight: 100;
        color: #ffffff;
        text-align: center;
        float: right;
      }
    }
  }
}
</style>
