<script setup lang="ts">
import { useRouter } from "vue-router";
import ProgressBar from "@/components/ProgressBar.vue";

const router = useRouter();

//接收父组件传过来的参数
const props = defineProps({
  contractList: {
    type: Array<any>,
    default: () => [],
  },
});

//跳转对应页面
const gotoDetail = (id: number) => {
  router.push("/contract/details/" + id);
};
</script>

<template>
  <dl v-for="(item, index) in contractList" :key="index" @click="gotoDetail((item as any).contract_id)">
    <!-- 合约头部 --> 
    <dd>
      <h3>{{ item.contract_name }}</h3>
      <span>{{ item.is_contract_type_text }}</span>
      <van-icon name="arrow" />
    </dd>

    <!-- 合约内容 -->
    <dt>
      <label for="">公司名称</label>
      <span>{{ item.company_name }}</span>
    </dt>
    <dt>
      <label for="">合约类型</label>
      <span>{{ item.contract_type }}</span>
    </dt>
    <dt>
      <label for="">合约周期</label>
      <span>{{ item.start_cycle_time }}-{{ item.end_cycle_time }}</span>
    </dt>
    <dt>
      <label for="">签约时间</label>
      <span>{{ item.signing_time }}</span>
    </dt>
    <dt>
      <label for="">合约进度</label>
      <span></span>
    </dt>
    <!-- 进度条 -->
    <dt>
     <ProgressBar :item="item"/>
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

}
</style>
