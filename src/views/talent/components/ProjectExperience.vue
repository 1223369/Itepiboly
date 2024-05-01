<!-- 人才详情项目经历组件 -->
<script setup lang="ts">

const props = defineProps({
  projectList: {
    type: Array,
  }
})


</script>

<template>
  <div class="resume-label">
    <h3>项目经历</h3>
    <div
      v-if="props.projectList.length > 0"
      v-for="item in props.projectList"
      :key="item.id"
    >
      <h4>
        {{ item.project_name }}
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
    </div>
  </div>

</template>

<style scoped lang="scss">
</style>
