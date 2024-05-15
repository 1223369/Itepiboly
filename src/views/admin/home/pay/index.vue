<script setup lang="ts">
import { reactive } from "vue";
import { adminContractList, adminPayConfirm } from "@/api/admin";
import { showToast } from "vant";

const state = reactive({
  type: 0, // tab类型
  // 合同列表
  contractList: [],
  loading: false,
  bool: false, // 是否展示弹窗
  selectType: 0, // 合约状态：4合约完成 5合约终止
  selectId: 0, // 选择的合约id
});

// 获取列表
const getContractList = async () => {
  state.loading = true;
  const res = await adminContractList({
    is_contract_type: 4,
  });

  if (res) {
    state.contractList = res.records;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 完成合约按钮事件
const selectContract = (item: any) => {
  state.selectId = item.contract_id;
  state.bool = true;
};

// 弹窗确认事件
const contractConfirm = async () => {
  const res = await adminPayConfirm({
    "contract_id": state.selectId
  });

  if (res) {
    showToast('发薪完成')
    getContractList();
  }

  state.bool = false;
};

// 返回上一级路由
const leftBack = () => history.back();

// 方法调用
getContractList();
</script>

<template>
  <div class="wy-admin-page">
    <van-nav-bar title="发薪管理" left-arrow @click-left="leftBack" />
    <!-- 合约列表 -->
    <van-pull-refresh
      class="pay-list-top"
      v-model="state.loading"
      success-text="刷新成功"
      @refresh="getContractList"
    >
      <div
        class="home-contract-list"
        v-for="(item, index) in state.contractList"
        :key="index"
      >
        <dl>
          <!-- 合约名称 -->
          <dt>
            <h3>
              {{ item.user_name }}
              <i v-if="!item.settle_salary">审核通过</i>
              <i v-else>审核中</i>
            </h3>
          </dt>

          <!-- 合约内容 -->
          <dt>
            <label for="">合约名称：</label>
            <span>{{ item.contract_name }}</span>
          </dt>
          <dt>
            <label for="">薪资发放：</label>
            <span>{{ item.task_salary }}/个</span>
          </dt>
          <dt>
            <label for="">合约周期：</label>
            <span
              >{{ item.start_cycle_time.replaceAll("-", ".") }}-{{
                item.end_cycle_time.replaceAll("-", ".")
              }}</span
            >
          </dt>
          <dt class="wy-flex">
            <label for="">合约状态：</label>
            <span>完成</span>
          </dt>
        </dl>

        <!-- 底部状态和按钮 -->
        <div class="home-contract-bottom">
          <button v-if="!item.settle_salary" @click="selectContract(item)">
            发放薪资
          </button>
          <button v-else class="opacity">发放薪资</button>
        </div>
      </div>

      <van-loading v-if="state.loading">加载中...</van-loading>
      <div
        class="wy-no-data"
        v-if="!state.loading && state.contractList.length == 0"
      >
        暂无数据
      </div>
    </van-pull-refresh>

    <van-popup
      v-model:show="state.bool"
      closeable
      round
      :style="{ width: ' 13.07rem', height: '9.75rem' }"
    >
      <div class="admin-contract-popup">
        <h5>温馨提示</h5>
        <p >
          确定将合约薪资发放吗？
        </p>
        <button @click="contractConfirm()">确定</button>
      </div>
    </van-popup>
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

  .pay-list-top {
    margin-top: 0.64rem;
  }

  .home-contract-list {
    background: #ffffff;
    border-radius: 0.53rem;
    margin: 0 0.59rem 0.53rem;
    padding: 0.88rem 0.48rem 0.64rem;

    .wy-flex {
      display: flex;
      align-items: center;
    }
    .contract-progress {
      flex: 1;
    }
    // 合约列表
    dl {
      dt {
        margin-bottom: 0.51rem;

        h3 {
          font-size: 0.91rem;
          font-weight: 400;
          color: #333333;
          line-height: 0.91rem;
          margin-bottom: 0.83rem;

          i {
            font-size: 0.64rem;
            line-height: 0.64rem;
            font-weight: 400;
            color: #fe9215;
            font-style: normal;
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
    }

    // 合约状态和按钮样式
    .home-contract-bottom {
      border-top: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0.6rem 0 0 0.2rem;

      button {
        width: 4rem;
        height: 1.39rem;
        background: #fe9215;
        border-radius: 0.16rem;
        font-size: 0.69rem;
        line-height: 1.39rem;
        text-align: center;
        font-weight: 100;
        color: #ffffff;
        border: none;
      }
      .opacity {
        opacity: 0.3;
      }
    }
  }

  .admin-contract-popup {
    padding: 1.4rem 1rem;

    h5 {
      font-size: 0.85rem;
      line-height: 0.85rem;
      margin-bottom: 1rem;
      font-weight: 400;
      color: #333333;
      text-align: center;
    }
    p {
      font-size: 0.8rem;
      font-weight: 400;
      color: #333333;
      line-height: 1.28rem;
      text-align: center;
      margin-bottom: 1.76rem;
    }
    button {
      width: 10.99rem;
      height: 1.92rem;
      background: #fe9215;
      border: 0px solid #ff6f00;
      border-radius: 0.16rem;
      font-size: 0.85rem;
      line-height: 1.92rem;
      text-align: center;
      font-weight: 400;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
