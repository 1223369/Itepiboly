<script setup lang="ts">
import { ref, inject } from "vue";
import { myStore } from "@/store/my";
import { showToast } from "vant";
import { resumeSkill } from "@/api/my";

const store = myStore();

const state = ref({
  show: false, // 自定义技能弹窗状态
  value: "", // 自定义标签内容
  skillList: <unknown>[], // 自定义标签内容列表
  sysSkill: <unknown>[], // 处理后的系统标签列表
});

// 处理用户已选标签
const setInfo = () => {
  // 处理系统标签值
  if (store.resumeInfo.sys_skill_ids) {
    let arr = [];
    // 将用户已选标签转为数组
    let skill = store.resumeInfo.sys_skill_ids.split(",");
    for (let i = 0; i < store.sysSkillList.length; i++) {
      let flag = false;
      for (let j = 0; j < skill.length; j++) {
        if (skill[j] === store.sysSkillList[i].title) {
          flag = true;
          break;
        }
      }
      arr.push({
        title: store.sysSkillList[i].title,
        active: flag,
      });
    }
    state.value.sysSkill = arr;
  }

  // 处理自定义标签值
  if (store.resumeInfo.skill_ids) {
    let arr = [];
    // 将用户已选标签转为数组
    let skill = store.resumeInfo.skill_ids.split(",");
    // 将用户已选标签添加到列表
    for (let i = 0; i < skill.length; i++) {
      arr.push({
        title: skill[i],
        active: true,
      });
    }
    state.value.skillList = arr;
  }
};

// 保存自定义标签
const skillChange = () => {
  if (state.value.value === "") {
    showToast("标签不能为空");
    return;
  }
  state.value.skillList.push({
    title: state.value.value,
    active: false,
  });

  state.value.show = false;
  state.value.value = "";
};

// 删除自定义标签
const clearSkill = (index: number) => {
  state.value.skillList.splice(index, 1);
};

// 点击状态自定义切换（active）
const setSkill = (index: number) => {
  state.value.skillList[index].active = !state.value.skillList[index].active;
};

// 点击切换系统标签状态
const setSysSkill = (index: number) => {
  state.value.sysSkill[index].active = !state.value.sysSkill[index].active;
};

// 提交保存
const submit = async () => {
  // 获取选中状态的值
  let arr: string[] = [];
  // 获取自定义标签的值
  for (let i = 0; i < state.value.skillList.length; i++) {
    if (state.value.skillList[i].active) {
      arr.push(state.value.skillList[i].title);
    }
  }

  let sysArr: string[] = [];
  // 获取系统标签的值
  for (let j = 0; j < state.value.sysSkill.length; j++) {
    if (state.value.sysSkill[j].active) {
      sysArr.push(state.value.sysSkill[j].title);
    }
  }

  if (sysArr.length === 0) {
    showToast("请选择一项非自定义标签");
  }
  console.log("String(sysArr)", String(sysArr));
  const res = await resumeSkill({
    skill_ids: String(arr),
    sys_skill_ids: String(sysArr),
  });
  if (res) {
    showToast("保存成功");
    closeChange();
  } else {
    showToast("保存失败");
  }
};

// 防止空数据
if (store.sysSkillList.length === 0) {
  (async function () {
    await store.getLabelsSkill();
    setInfo();
  })();
} else {
  setInfo();
}

const { closeChange } = inject("popup");
</script>

<template>
  <van-nav-bar
    title="技能关键词"
    left-arrow
    @click-left="closeChange()"
  />
  <dl class="skill-list">
    <dt
      v-for="(item, index) in state.sysSkill"
      :class="item.active ? 'active' : ''"
      :key="item.id"
      @click="setSysSkill(index)"
    >
      {{ item.title }}
    </dt>
    <dt
      v-for="(item, index) in state.skillList"
      :class="item.active ? 'active' : ''"
      :key="item.id"
      @click="setSkill(index)"
    >
      {{ item.title }}<van-icon name="close" @click.stop="clearSkill(index)" />
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
  <button class="wy-submit" @click="submit()">保存</button>
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
// 弹窗输入框样式
.skill-field {
  margin: 0 1rem;
}
</style>
