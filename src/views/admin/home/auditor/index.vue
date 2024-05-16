<script setup lang="ts">
import { reactive } from "vue";
import { adminAuditorTaskList, adminAuditorTalentList,adminAuditorCompanyList } from "@/api/admin";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import Tabs from "@/components/Tabs.vue";

const tabs = [
  {
    type: 0,
    text: "任务审核",
  },
  {
    type: 1,
    text: "个人认证",
  },
  {
    type: 2,
    text: "企业认证",
  },
];
const router = useRouter();

const state = reactive({
  type: 0, // tab类型
  loading: false,
  bool: false, // 是否展示弹窗
  selectType: 0, // 合约状态：4合约完成 5合约终止
  selectId: 0, // 选择的合约id
  taskList: [], // 任务列表
  talentList: [], // 人才列表
  companyList: [], // 企业列表
});

// 获取审核任务列表
const getAdminAuditorTaskList = async () => {
  state.loading = true;
  const res = await adminAuditorTaskList({
    is_contract_type: state.type,
  });

  if (res) {
    state.taskList = res.records;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 获取人才审核列表
const getAdminAuditorTalentList = async () => {
  state.loading = true;
  const res = await adminAuditorTalentList({});

  if (res) {
    state.talentList = res as any;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};
// 获取企业审核列表
const getAdminAuditorCompanyList = async () => {
  state.loading = true;
  const res = await adminAuditorCompanyList({});

  if (res) {
    state.companyList = res as any;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 切换tab--接受自子组件
const setTabList = (type: number) => {
  if (state.type === type) return;
  state.type = type;
  if (state.type === 0) getAdminAuditorTaskList();
  if (state.type === 1) getAdminAuditorTalentList();
  if (state.type === 2) getAdminAuditorCompanyList();
};

// 跳转详情页
const gotoDetail = (id: number) => {
  switch (true) {
    case state.type === 0:
      router.push("/admin/home/auditor/task/" + id);
      break;
    case state.type === 1:
      router.push("/admin/home/auditor/talent/" + id);
      break;
    case state.type === 2:
      router.push("/admin/home/auditor/company/" + id);
      break;
    default:
      break;
  }
};

// 返回上一级路由
const leftBack = () => history.back();

// 方法调用
getAdminAuditorTaskList();
</script>

<template>
  <div class="wy-admin-page">
    <van-nav-bar title="审核管理" left-arrow @click-left="leftBack" />
    <Tabs :tabs="tabs" @tabsCall="setTabList"></Tabs>

    <!-- 任务审核列表 -->
    <div v-if="state.type === 0">
      <van-pull-refresh
        class="task-list"
        v-model="state.loading"
        success-text="刷新成功"
        @refresh="getAdminAuditorTaskList"
      >
        <dl
          v-for="(item, index) in state.taskList"
          :key="index"
          @click="gotoDetail((item as any).task_id)"
        >
          <!-- 合约名称 -->
          <dt>
            <h3>
              {{ item.task_name }}
              <i v-if="item.is_check === 0">未审核</i>
              <i v-if="item.is_check === 1">审核通过</i>
              <i v-if="item.is_check === 2">审核失败</i>
              <i v-if="item.is_check === 3">已关闭</i>
            </h3>
          </dt>

          <dt>
            <label for="">任务预算：</label>
            <span>{{ item.task_budget }}</span>
          </dt>
          <dt>
            <label for="">任务周期：</label>
            <span>{{ item.task_cycle }}/个</span>
          </dt>
          <dt>
            <label for="">服务方式：</label>
            <span>{{ item.service_mode }} </span>
          </dt>
          <dt>
            <label for="">任务要求：</label>
            <span>{{ item.task_ask }}</span>
          </dt>
          <dd>
            <button>操作审核</button>
          </dd>
        </dl>

        <van-loading v-if="state.loading">加载中...</van-loading>
        <div
          class="wy-no-data"
          v-if="!state.loading && state.taskList.length == 0"
        >
          暂无数据
        </div>
      </van-pull-refresh>
    </div>

    <!-- 个人认证列表 -->
    <div v-if="state.type === 1">
      <van-pull-refresh
        v-model="state.loading"
        success-text="刷新成功"
        @refresh="getAdminAuditorTalentList"
      >
        <dl
          v-for="(item, index) in state.talentList"
          :key="index"
          @click="gotoDetail((item as any).id)"
        >
          <dt class="auditor-flex">
            <div>
              <img :src="item.it_head" />
            </div>
            <div class="auditor-flex-right">
              <h3>
                {{ item.real_name }}
                <i v-if="item.is_check === 0">未审核</i>
                <i v-if="item.is_check === 1">审核通过</i>
                <i v-if="item.is_check === 2">审核失败</i>
              </h3>
              <span
                >{{ item.sex }} ｜ {{ item.age }} ｜ {{ item.work_year }} ｜
                {{ item.city }}</span
              >
            </div>
          </dt>

          <dd>
            <button>操作审核</button>
          </dd>
        </dl>

        <van-loading v-if="state.loading">加载中...</van-loading>
        <div
          class="wy-no-data"
          v-if="!state.loading && state.taskList.length == 0"
        >
          暂无数据
        </div>
      </van-pull-refresh>
    </div>

    <!-- 企业认证列表 -->
    <div v-if="state.type === 2">
      <van-pull-refresh
        v-model="state.loading"
        @refresh="getAdminAuditorCompanyList"
      >
        <dl
          v-for="(item, index) in state.companyList"
          :key="index"
          @click="gotoDetail(item.id)"
        >
          <dt>
            <h3>
              {{ item.company_name }}
              <i v-if="item.is_check === 0">未审核</i>
              <i v-if="item.is_check === 1">审核通过</i>
              <i v-if="item.is_check === 2">审核失败</i>
            </h3>
          </dt>
          <dt>
            <label>企业法人:</label>
            <span>{{ item.contacts }}</span>
          </dt>
          <dd>
            <button>操作审核</button>
          </dd>
        </dl>
        <van-loading v-if="state.loading">加载中...</van-loading>
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
  height: calc(100vh - 46px - 5rem);
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
        margin-bottom: 0.83rem;

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
        padding-right: 0.48rem;
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

  .auditor-flex {
    display: flex;
    align-items: center;

    img {
      width: 2.67rem;
      height: 2.67rem;
      border-radius: 50%;
      margin-right: 0.8rem;
    }

    .auditor-flex-right {
      flex: 1;
    }
  }
}
</style>
