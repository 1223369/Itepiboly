<script setup lang="ts">
import {reactive} from "vue";
import FooterTabbar from "@/components/FooterTabbar.vue";
import TaskList from "@/components/list/TaskList.vue";

const taskList = reactive([
  {id :1},
  {id:2}
]);

</script>

<template>
  <TaskList :taskList="taskList"></TaskList>
  <FooterTabbar></FooterTabbar>
</template>



<style scoped lang="less">

</style>