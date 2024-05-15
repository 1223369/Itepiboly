<script setup lang="ts">
import { reactive } from "vue";
import { adminAuditorTaskDetail, adminAuditorTaskEdit } from "@/api/admin";
import { showToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const id = router.currentRoute.value.params.id;
const state = reactive({
  loading: false,
  item: {},
});

// 获取审核任务列表
const getDetail = async () => {
  state.loading = true;
  const res = await adminAuditorTaskDetail({
    id: id,
  });

  if (res) {
    state.item = res;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// TODO: 统一处理审核任务
const audiotorEdit = async (type: number) => {
  const res = await adminAuditorTaskEdit({
    task_id: id,
    is_check: type,
  });

  if (res) {
    showToast('操作成功');
    leftBack();
  }
};

// 审核通过
const audiotorEditPass = () => {
  audiotorEdit(1);
};

// 审核失败
const auditorEditFail = () => {
  audiotorEdit(2);
};

// 关闭任务
const auditorEditClose = () => {
  audiotorEdit(3);
};

// 返回上一级路由
const leftBack = () => history.back();

// 方法调用
getDetail();
</script>

<template>
  <van-nav-bar title="任务详情" left-arrow @click-left="leftBack" />
  <dl>
    <dt>
      <label>任务名称</label>
      <span>{{ state.item.task_name }}</span>
    </dt>
    <dt>
      <label>任务预算</label>
      <span>{{ state.item.task_budget }}元</span>
    </dt>
    <dt>
      <label>任务周期</label>
      <span>{{ state.item.task_cycle }}天</span>
    </dt>
    <dt>
      <label>服务方式</label>
      <span>{{ state.item.service_mode }}</span>
    </dt>
    <dt>
      <label>任务来源</label>
      <span>{{ state.item.company_name }}</span>
    </dt>
    <dt>
      <label>任务需求</label>
    </dt>
    <dt>
      <p>{{ state.item.task_ask }}</p>
    </dt>
  </dl>
  <div class="detail-btn">
    <button v-debounce="audiotorEditPass">审核通过</button>
    <button v-debounce="auditorEditClose">关闭任务</button>
    <button v-debounce="auditorEditFail">审核失败</button>
  </div>
</template>

<style scoped lang="scss">
// 解决下拉刷新高度不够
.van-pull-refresh {
  height: calc(100vh - 46px - 5rem);
  overflow: auto;
}

dl {
  padding: 0.64rem;

  dt {
    margin-bottom: 1rem;

    label {
      font-size: 0.69rem;
      line-height: 0.69rem;
      font-weight: 400;
      color: #666666;
      margin-right: 0.77rem;
    }

    span {
      font-size: 0.69rem;
      line-height: 0.69rem;
      font-weight: 400;
      color: #000000;
    }

    p {
      font-size: 0.69rem;
      font-weight: 300;
      color: #333333;
      line-height: 1.23rem;
    }
  }
}

.detail-btn {
  position: fixed;
  bottom: 0.64rem;
  display: flex;
  left: 0.54rem;
  right: 0.54rem;
  button {
    height: 2.35rem;
    background: #fe9215;
    border-radius: 0.27rem;
    font-size: 0.8rem;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
    border: none;
    flex: 1;
    margin: 0 0.2rem;
  }
}
</style>
