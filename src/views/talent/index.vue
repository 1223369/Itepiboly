<script setup lang="ts">
import {reactive} from "vue";
import FooterTabbar from "@/components/FooterTabbar.vue";
import TalentList from "@/components/list/TalentList.vue";

const talentList = reactive([
  {id :1},
  {id:2}
]);

</script>

<template>
  <TalentList :talentList="talentList"></TalentList>
  <FooterTabbar></FooterTabbar>
</template>



<style scoped lang="less">

</style>