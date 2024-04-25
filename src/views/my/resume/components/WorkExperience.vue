<!-- 个人优势组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import WorkExperiencePopup from "./WorkExperiencePopup.vue";
import { myStore } from "@/store/my";
import { workDelete } from "@/api/my";
import { showToast } from "vant";

const store = myStore();

const state = ref({
  show: false, // 弹窗显示状态
  item: {}, // 弹窗里的数据
});

// 关闭弹窗
const closeChange = () => {
  state.value.show = false;
  store.getResumeDetail();
};

// 添加工作
const addWork = () => {
  state.value.item = {}
  state.value.show = true;
};

// 编辑工作经历
const editWork = (item: any) => {
  state.value.item = item;
  state.value.show = true;
};

// 删除工作经历
const submitDelect = async (id: number) => {
  const res = await workDelete({
    id: id,
  });
  if (res) {
    showToast("删除成功");
    store.getResumeDetail();
  } else {
    showToast("删除失败");
  }
};

// 向子组件传参数
provide("popup", {
  closeChange,
});
</script>

<template>
  <div class="resume-label">
    <h3>
      工作经历<van-icon name="add-o" @click="addWork"></van-icon>
    </h3>
    <van-swipe-cell
      v-if="store.companyList.length > 0"
      v-for="item in store.companyList"
      :key="item.id"
    >
      <h4>{{ item.company_name }}<van-icon name="arrow" @click="editWork(item)"/></h4>
      <h5>{{ item.work_position }}</h5>
      <p>{{ item.start_time }} - {{ item.end_time }}</p>
      <h5>工作描述</h5>
      <van-field
        v-model="item.company_describe"
        autosize
        readonly
        label=""
        type="textarea"
      />
      <template #right>
        <img
          @click="submitDelect(item.id)"
          src="@/assets/img/icon/icon-delete.png"
          class="delete"
        />
      </template>
    </van-swipe-cell>
    <label v-else>请您填写工作经历</label>
  </div>

  <!-- 编辑个人优势弹窗 -->
  <van-popup
    v-model:show="state.show"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <WorkExperiencePopup :state.item></WorkExperiencePopup>
  </van-popup>
</template>

<style scoped lang="scss">
.text-list {
  dt {
    font-size: 0.59rem;
    line-height: 0.59rem;
    font-weight: 300;
    color: #666666;
    padding: 0.4rem 0.5rem;
    margin-right: 0.27rem;
    margin-bottom: 0.3rem;
    background: #f6f7f8;
    border-radius: 0.16rem;
    display: inline-block;
  }
}
</style>
