<!-- 人才详情头部个人信息组件 -->
<script></script>

<template>
  <div class="talent-info">
    <div class="info-left">
      <img src="@/assets/img/my/icon-controller.png" alt="" />
      <span>精选人才</span>
    </div>

    <div class="info-right">
      <h3>李想<span>驻场</span></h3>
      <p>前端工程师 | 男</p>
      <dl>
        <dt>
          <h5>八年</h5>
          <span>经验</span>
        </dt>
        <dt>
          <h5>23岁</h5>
          <span>年龄</span>
        </dt>
        <dt>
          <h5>2个</h5>
          <span>项目</span>
        </dt>
      </dl>
    </div>

    <!-- 个人优势 -->
    <p>
      熟练掌握React,vue,angular等前端技术栈，有丰富的项目经验，有良好的沟通能力，有较强的学习能力，有较强的团队合作精神。
    </p>

    <!-- 个人技能 -->
    <dl>
      <dt>vue</dt>
    </dl>
  </div>
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
  }
}
</style>
