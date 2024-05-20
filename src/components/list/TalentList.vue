<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

//接收父组件传过来的参数
const props = defineProps({
  talentList: {
    type: Array<any>,
    default: () => [],
  },
});
//跳转对应页面
const gotoDetail = (id: number) => {
  router.push("/talent/details/" + id);
};

// 字符串转数组
const arrayList = (str: string) => {
  if (str) {
    const array =  str.split(",");
    return array.map((item, index) => {
      return { id: index + 1, value: item }; // 添加一个带有唯一id的对象
    });
  } else {
    return [];
  }
};
</script>

<template>
  <div
    class="talent-item"
    v-for="(item, index) in talentList"
    :key="index"
    @click="gotoDetail((item as any).resume_id || (item as any).id)"
  >
    <!-- 人才信息 -->
    <div class="talent-item-top">
      <!-- 左边头像 -->
      <div class="talent-item-pic">
        <img :src="item.it_head" alt="" />
      </div>
      <!-- 右边信息 -->
      <div class="talent-item-cont">
        <h3>
          {{ item.user_name }}<span  v-for="child in arrayList(item.service_mode)" :key="child.id">{{ child.value }}</span>
        </h3>
        <p>
          {{ item.position_name }} ｜ {{ item.work_year }} ｜
          {{ item.highest_education }} ｜ {{ item.age }}
        </p>
        <dl>
          <dt v-for="child in arrayList(item.skill_ids)" :key="child.id">{{ child.value }}</dt>
        </dl>
      </div>
    </div>

    <!-- 人才已做项目及地址 -->
    <div class="talent-item-bottom">
      <label for="">已做{{ item.project_count }}项目</label>
      <span><van-icon name="location-o" />{{ item.city }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.talent-item {
  margin: 0 0rem 0.53rem;
  padding: 0.77rem 0.64rem 0;
  background: #ffffff;
  border-radius: 0.53rem;
  font-size: 0.69rem;

  .talent-item-top {
    display: flex;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f5f5f5;

    .talent-item-pic {
      width: 4rem;
      height: 4rem;
      border-radius: 0.27rem;
      overflow: hidden;
      margin-right: 0.85rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .talent-item-cont {
      h3 {
        font-size: 0.91rem;
        font-weight: 400;
        color: #333333;
        display: flex;
        align-items: center;
        margin-bottom: 0.64rem;

        span {
          width: 1.97rem;
          height: 0.85rem;
          line-height: 0.85rem;
          border-radius: 0.43rem;
          font-size: 0.59rem;
          font-weight: 300;
          color: #ffffff;
          margin-left: 0.2rem;
          text-align: center;
          padding: 0.1rem 0;
        }

        span:nth-child(1) {
          background: linear-gradient(90deg, #fea829, #fe8f27);
        }
        span:nth-child(2) {
          background: linear-gradient(90deg, #55edb9, #52dea4);
        }
        span:nth-child(3) {
          background: linear-gradient(90deg, #42c3e8, #249af6);
        }
      }

      p {
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 100;
        color: #666666;
        margin-bottom: 0.56rem;
      }

      dl {
        display: flex;
        flex-flow: wrap;
        dt {
          padding: 0.3rem 0.5rem;
          font-size: 0.59rem;
          line-height: 0.59rem;
          font-weight: 300;
          color: #666666;
          margin-right: 0.27rem;
          background: #f6f7f8;
          border-radius: 0.16rem;
          margin-bottom: 0.3rem;
        }
      }
    }
  }

  .talent-item-bottom {
    display: flex;
    padding: 0.72rem 0 0.72rem;

    label {
      flex: 1;
    }
    span {
      text-align: right;

      i {
        font-size: 0.8rem;
        font-weight: 600;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
