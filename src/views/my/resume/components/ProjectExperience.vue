<!-- 个人优势组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import ProjectExperiencePopup from "./ProjectExperiencePopup.vue";
import { myStore } from "@/store/my";
import { projectDelete } from "@/api/my";
import { showToast } from "vant";

const store = myStore();

const state = ref({
  show: false, // 弹窗显示状态
  item: {}, // 弹窗里的数据
});

const props = defineProps({
  page: {
    type: String,
  }
})

// 关闭弹窗
const closeChange = () => {
  state.value.show = false;
  store.getResumeDetail();
};

// 添加工作
const addWork = () => {
  state.value.item = {
    uuid: store.resumeInfo.id,
  };
  state.value.show = true;
};

// 编辑工作经历
const editWork = (item: any) => {
  state.value.item = item;
  state.value.show = true;
};

// 删除工作经历
const submitDelect = async (id: number) => {
  const res = await projectDelete({
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
    <h3>项目经历<van-icon name="add-o" v-if="props.page!=='preview'" @click="addWork"></van-icon></h3>
    <van-swipe-cell
      v-if="store.projectList.length > 0"
      v-for="item in store.projectList"
      :key="item.id"
    >
      <h4>
        {{ item.project_name }}<van-icon name="arrow" v-if="props.page!=='preview'" @click="editWork(item)" />
      </h4>
      <p>{{ item.project_start_time }} - {{ item.project_end_time }}</p>
      <h5>工作职责</h5>
      <van-cell-group inset>
        <van-field
          v-model="item.project_duty"
          autosize
          readonly
          label=""
          type="textarea"
        />
      </van-cell-group>

      <template #right>
        <img
          @click="submitDelect(item.project_id)"
          src="@/assets/img/icon/icon-delete.png"
          class="delete"
          v-if="props.page!=='preview'"
        />
      </template>
    </van-swipe-cell>
    <label v-else>请您填写项目经历</label>
  </div>

  <!-- 编辑个人优势弹窗 -->
  <van-popup
    v-model:show="state.show"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <ProjectExperiencePopup :item="state.item"></ProjectExperiencePopup>
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
