<!-- 人才详情头部个人详情组件 -->
<script setup lang="ts">

const props = defineProps({
  companyList: {
    type: Array,
  }
})

</script>

<template>
  <div class="resume-label">
    <h3>工作经历</h3>
    <div
      v-if="props.companyList.length > 0"
      v-for="item in props.companyList"
      :key="item.id"
    >
      <h4>
        {{ item.company_name }}
      </h4>
      <h5>{{ item.work_position }}</h5>
      <p>{{ item.start_time }} - {{ item.end_time }}</p>
      <h5>工作描述</h5>
      <van-cell-group inset>
        <van-field
          v-model="item.company_describe"
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
