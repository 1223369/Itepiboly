<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

//接收父组件传过来的参数
const props = defineProps({
  contractList: {
    type: Array,
    default: () => [],
  },
});

//跳转对应页面
const gotoDetail = (id: number) => {
  router.push("/contract/details" + id);
};
</script>

<template>
  <dl v-for="(item, index) in contractList" :key="index" @click="gotoDetail((item as any).id)">
    <!-- 合约头部 -->
    <dd>
      <h3>移动端小程序开发工程师</h3>
      <span>履约中</span>
      <van-icon name="arrow" />
    </dd>

    <!-- 合约内容 -->
    <dt>
      <label for="">公司名称</label>
      <span>北京主场互联网科技有限公司</span>
    </dt>
    <dt>
      <label for="">合约类型</label>
      <span>技术服务</span>
    </dt>
    <dt>
      <label for="">合约周期</label>
      <span></span>
    </dt>
    <dt>
      <label for="">签约时间</label>
      <span></span>
    </dt>
    <dt>
      <label for="">合约进度</label>
      <span></span>
    </dt>
    <!-- 进度条 -->
    <dt class="contract-progress">
      <i ></i>
      <i class="green"></i>
      <i class="orange"></i>
      <i class="red"></i>
    </dt>
  </dl>
</template>

<style scoped lang="scss">
dl {
  font-size: 0.64rem;
  color: #666666;
  padding: 1rem 0.7rem;
  border-bottom: 1px solid #eeeeee;

  dd {
    display: flex;
    margin-bottom: 0.9rem;
    align-items: center;

    h3 {
      font-size: 0.8rem;
      font-weight: 500;
      color: #333333;
      flex: 1;
    }

    span {
      text-align: right;
      font-size: 0.75rem;
      color: #ff9415;
    }

    i {
      font-size: 0.75rem;
    }
  }

  dt {
    display: flex;
    margin-bottom: 0.72rem;
    label {
      flex: 1;
    }
    span {
      text-align: right;
    }
  }
  //选择最后一个dt标签
  dt:last-child {
    margin-bottom: 0;
  }

  .contract-progress {
    display: flex;
    height: 0.53rem;
    width: 100%;

    i{
      flex: 1;
      background: #f3f3f3;
      margin: 0 1px;
    }

    i.green {
      background: #50D400;
    }
    i.orange {
      background: #FE9215;
    }
    i.red {
      background: #FF4800;
    }
  }
}
</style>
