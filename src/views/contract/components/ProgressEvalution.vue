<script setup lang="ts">
import { ref, inject } from "vue";
import { showToast } from "vant";
import { contractGradeEdit } from "@/api/constract";

const state = ref({
  value: "",
  evalType: 1, // 当前评估阶段
});

// 处理阿拉伯数字
const numText = ["零", "一", "二", "三", "四"]

// 接收父组件参数
const props = defineProps({
  num: {
    type: Number,
  },
  id: {
    type: String,
  },
});

// 接受父组件方法
const { closeEvaluation } = inject("popup");

// 点击评估状态
const evalTypeClick = (type: number) => {
  state.value.evalType = type;
};



// 提交评估
const setProgressGrade = async () => {
  if (!state.value.evalType) {
    showToast("请选择评估状态");
    return;
  }
  if (!state.value.value) {
    showToast("请输入具体描述");
    return;
  }
  const res = await contractGradeEdit({
    contract_state: state.value.evalType,
    contract_stage: state.value.value,
    contract_id: props.id,
    num: props.num,
  });
  if (res) {
    showToast("评估成功");
    closeEvaluation(true);
  } else {
    showToast("评估失败");
  }
};
</script>

<template>
  <van-nav-bar
    title="进度评估"
    left-arrow
    @click-left="closeEvaluation(false)"
  />
  <div class="eval-cont">
    <h3>第{{ numText[props.num] }}阶段</h3>
    <p>
      <span @click="evalTypeClick(1)" :class="state.evalType === 1 ? 'active' : ''">通过</span>
      <span @click="evalTypeClick(2)" :class="state.evalType === 2 ? 'active' : ''">有风险</span>
      <span @click="evalTypeClick(3)" :class="state.evalType === 3 ? 'active' : ''">问题严重</span>
    </p>

    <!-- 输入框 -->
    <van-field
      v-model="state.value"
      rows="8"
      autosize
      label=""
      type="textarea"
      maxlength="500"
      placeholder="具体描述"
      show-word-limit
      class="eval-field"
    />
  </div>
  <button class="wy-submit" @click="setProgressGrade()">提交评估</button>
</template>

<style scoped lang="scss">
.wy-submit {
  position: static;
}
.eval-cont {
  padding: 1.28rem 0.56rem;

  h3 {
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #333333;
    margin-bottom: 0.88rem;
  }
  p {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;

    span {
      width: 5.92rem;
      height: 1.41rem;
      text-align: center;
      line-height: 1.41rem;
    }
    span:nth-child(1) {
      background: #ffffff;
      border: 1px solid #50d400;
      color: #50d400;
    }
    span:nth-child(1).active {
      background: #50d400;
      color: #ffffff;
    }
    span:nth-child(2) {
      background: #ffffff;
      border: 1px solid #fe9215;
      color: #fe9215;
    }
    span:nth-child(2).active {
      background: #fe9215;
      color: #ffffff;
    }
    span:nth-child(3) {
      background: #ffffff;
      border: 1px solid #ff0000;
      color: #ff0000;
    }
    span:nth-child(3).active {
      background: #ff0000;
      color: #ffffff;
    }
  }
  .eval-field {
    border: 1px solid #d5d3d3;
    margin-bottom: 1.49rem;
  }
}
</style>
