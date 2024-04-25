<script setup lang="ts">
import { ref, inject } from "vue";
import { myStore } from "@/store/my";
import { showToast } from "vant";

const store = myStore();
// 防止空数据
if (store.sysSkillList.length === 0) {
  (async function () {
    await store.getLabelsSkill();
  })();
} else {
}

const state = ref({
  show: false, // 自定义技能弹窗状态
  value: '', // 自定义标签内容
  skillList: <unknown>[] // 自定义标签内容列表
});

// 保存自定义标签
const skillChange = () => {
  if (state.value.value === '') {
    showToast('标签不能为空');
    return;
  }
  state.value.skillList.push({
    title: state.value.value,
    active: false
  });
  
  state.value.show = false;
  state.value.value = '';
};

const { closeServiceType } = inject("popup");
</script>

<template>
  <van-nav-bar
    title="技能关键词"
    left-arrow
    @click-left="closeServiceType('')"
  />
  <dl class="skill-list">
    <dt v-for="item in store.sysSkillList" :class="item.active?'active':'' " :key="item.id">
      {{ item.title }}<van-icon name="close" />
    </dt>
    <dt v-for="item in state.skillList" :class="item.active?'active':'' " :key="item.id">
      {{ item.title }}<van-icon name="close" />
    </dt>
    <dt @click="state.show = true">自定义+</dt>
  </dl>
  <van-dialog
    v-model:show="state.show"
    title="自定义标签"
    show-cancel-button
    @confirm="skillChange"
    @cancel="state.show = false"
  >
    <van-field
      class="skill-field"
      v-model="state.value"
      label=""
      placeholder="请输入标签"
      maxlength="10"
    />
  </van-dialog>
  <button class="wy-submit" @click="closeServiceType(state.value)">保存</button>
</template>

<style scoped lang="scss">
.skill-list {
  padding: 1.31rem 1.09rem;

  dt {
    min-width: 4.5rem;
    height: 1.17rem;
    line-height: 1.17rem;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 0.27rem;
    font-size: 0.64rem;
    font-weight: 400;
    color: #333333;
    text-align: center;
    display: inline-block;
    margin: 0 0.64rem 0.8rem 0;

    i {
      margin-left: 0.2rem;
    }
  }

  dt.active {
    border: 1px solid #ff8e00;
    color: #ff8e00;
  }
}
</style>
