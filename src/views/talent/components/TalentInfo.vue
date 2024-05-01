<!-- 人才详情头部个人信息组件 -->
<script setup lang="ts">
// 接收父组件传过来的数据
const props = defineProps({
  item: {
    type: Object,
  },
});

// 字符串转数组
const arrayList = (str: string) => {
  if (str) {
    const array = str.split(",");
    return array.map((item, index) => {
      return { id: index + 1, value: item }; // 添加一个带有唯一id的对象
    });
  } else {
    return [];
  }
};
</script>

<template>
  <div class="talent-info">
    <div class="info-left">
      <img :src="item.it_head" alt="" />
      <span>精选人才</span>
    </div>

    <div class="info-right">
      <h3>{{ item.user_name }}<span v-for="child in arrayList(item.service_mode)" :key="child.id">{{ child.value }}</span></h3>
      <p>{{ item.position_name }} | {{ item.sex === 1 ? "男" : "女" }}</p>
      <dl>
        <dt>
          <h5>{{ item.work_year }}</h5>
          <span>经验</span>
        </dt>
        <dt>
          <h5>{{ item.age }}</h5>
          <span>年龄</span>
        </dt>
        <dt>
          <h5>{{ item.porjectNum }}个</h5>
          <span>项目</span>
        </dt>
      </dl>
    </div>
  </div>
  <!-- 个人优势 -->
  <p class="info-text">
    {{ item.advantage }}
  </p>

  <!-- 个人技能 -->
  <dl class="info-skill">
    <dt v-for="child in arrayList(item.skill_ids)" :key="child.id">{{ child.value }}</dt>
  </dl>
</template>

<style scoped lang="scss">
.talent-info {
  padding: 1.23rem 1.33rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1rem 0rem rgba(49, 57, 73, 0.1);
  border-radius: 0.53rem;
  display: flex;
  margin-bottom: 1.28rem;

  .info-left {
    display: flex;
    flex-flow: column;
    margin-right: 1.41rem;
    img {
      width: 3.47rem;
      height: 3.47rem;
      border-radius: 0.27rem;
      margin-bottom: 0.72rem;
    }

    span {
      width: 3.31rem;
      height: 1.08rem;
      line-height: 1.08rem;
      background: linear-gradient(90deg, #fea829, #fe8f27);
      border-radius: 0.54rem;
      font-size: 0.59rem;
      text-align: center;
      font-weight: 300;
      color: #ffffff;
    }
  }

  .info-right {
    flex: 1;
    h3 {
      font-size: 1.12rem;
      line-height: 1.12rem;
      font-weight: 400;
      color: #333333;
      margin-bottom: 0.45rem;

      span {
        width: 1.97rem;
        height: 0.85rem;
        border-radius: 0.43rem;
        margin-left: 0.2rem;
        font-size: 0.59rem;
        line-height: 0.85rem;
        padding: 0 0.43rem;
        font-weight: 300;
        color: #ffffff;
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
      font-weight: 300;
      color: #333333;
      margin-bottom: 0.85rem;
    }

    dl {
      display: flex;
      dt {
        position: relative;
        flex: 1;
        h5 {
          font-size: 0.8rem;
          line-height: 0.8rem;
          font-weight: 400;
          color: #333333;
          margin-bottom: 0.37rem;
        }
        span {
          font-size: 0.64rem;
          line-height: 0.64rem;
          font-weight: 100;
          color: #999999;
        }
      }
      dt::before {
        border-right: 1px solid #e8e8e8;
        content: "";
        height: 100%;
        position: absolute;
        right: 30%;
        transform: skew(-15deg);
      }
    }
  }
}

.info-text {
  font-size: 0.69rem;
  font-weight: 100;
  color: #333333;
  line-height: 1.01rem;
  margin-bottom: 0.69rem;
}

.info-skill {
  dt {
    font-size: 0.59rem;
    line-height: 0.59rem;
    padding: 0.4rem 0.48rem;
    font-weight: 300;
    color: #666666;
    background: #f6f7f8;
    border-radius: 0.16rem;
    display: inline-block;
    margin-right: 0.3rem;
  }
}
</style>
