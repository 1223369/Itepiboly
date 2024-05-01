<!-- 人才详情教育经历组件 -->
<script setup lang="ts">

 // 接收父组件传过来的数据
 const props = defineProps({
    item: {
      type: Object,
    }
  })

</script>

<template>
  <div class="resume-label">
    <h3>教育经历</h3>
    <div v-if="props.item.school_name">
      <h4>
        {{ props.item.school_name
        }}
      </h4>
      <p>
        {{ props.item.teach_start_time }} -
        {{ props.item.teach_end_time }}
      </p>
      <h5>
        {{ props.item.major }} | {{ props.item.highest_education }}
      </h5>
    </div>

  </div>
</template>

<style scoped lang="scss"></style>
