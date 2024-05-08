<script setup lang="ts">
import { ref } from "vue";
import { taskStore } from "@/store/task";
import { addEnterprise } from "@/api/my";
import { showToast } from "vant";

const tsStore = taskStore();
if (!tsStore.areaList.length) tsStore.getCityList();

const showCity = ref(false); // 城市选择弹窗
const state = ref({
  city: "", // 城市
  area: "", // 区域
  management: "", // 经营时长
  team_nums: "", // 团队人数
  project_name: "", // 经营项目
  enterprise_name: "", // 企业名称
  name: "", // 姓名
  phone: "", // 电话
  age: "", // 年龄
  introduce: "", // 企业介绍
});

// 确认选择城市
const cityConfirm = (value: any) => {
  state.value.city = value.selectedOptions[0].text;
  state.value.area = value.selectedOptions[1].text;
  showCity.value = false;
};

// 提交申请
const submit = async () => {
  if (
    !state.value.city ||
    !state.value.management ||
    !state.value.team_nums ||
    !state.value.project_name ||
    !state.value.enterprise_name ||
    !state.value.name ||
    !state.value.phone ||
    !state.value.age ||
    !state.value.introduce
  ) {
    showToast("请完善信息");
    return;
  }
  const res = await addEnterprise(state.value);
  if(res){
    showToast('您的申请已收到，我们会尽快为您审核')
  }
  // 清空表单
  let ays = Object.keys(state.value);
  ays.map((k) => {
    state.value[k] = "";
  });
};
</script>

<template>
  <!-- 头部 -->
  <div class="company-top">
    <h3>申请企业入驻</h3>
    <h4>全国中小型企业免费入驻</h4>
  </div>

  <!-- 我们的优势 -->
  <div class="company-page">
    <h5>我们的优势</h5>
    <p class="company-adv">
      全国中小型企业都可申请入驻我们平台，平台将给予技术扶持、企业经营指导、企业入驻将获取收益的10%
    </p>
    <h5>服务流程</h5>
    <div class="company-service">
      <img src="@/assets/img/my/partner/company-service-process.png" />
    </div>
    <h5>申请企业入驻</h5>
    <!-- 表单部分 -->
    <div class="company-settled">
      <!-- 城市选择 -->
      <van-form @submit="submit">
        <van-field
          v-model="state.city"
          label="您所在的城市:"
          placeholder="请选择城市"
          readonly
          is-link
          @click="showCity = true"
        />

        <van-action-sheet v-model:show="showCity">
          <van-picker
            :columns="tsStore.areaList"
            @confirm="cityConfirm"
            @cancel="showCity = false"
          />
        </van-action-sheet>

        <!-- 公司经营时长 -->
        <div class="wy-radio">
          <label>您的公司经营了多久？</label>
          <van-radio-group v-model="state.management" direction="horizontal">
            <van-radio name="1年">1年</van-radio>
            <van-radio name="1-3年">1-3年</van-radio>
            <van-radio name="3年以上">3年以上</van-radio>
          </van-radio-group>
        </div>

        <!-- 团队人数 -->
        <div class="wy-radio">
          <label>您的团队有多少人？</label>
          <van-radio-group v-model="state.team_nums" direction="horizontal">
            <van-radio name="5-10人">5-10人</van-radio>
            <van-radio name="15-20人">15-20人</van-radio>
            <van-radio name="20人以上">20人以上</van-radio>
          </van-radio-group>
        </div>

        <!-- 经营项目 -->
        <div class="wy-radio">
          <label>公司经营项目？</label>
          <van-radio-group v-model="state.project_name" direction="horizontal">
            <van-radio name="教育">教育</van-radio>
            <van-radio name="it">it</van-radio>
            <van-radio name="其他">其他</van-radio>
          </van-radio-group>
        </div>

        <p class="company-p">请填写您的联系方式</p>
        <van-field
          v-model="state.enterprise_name"
          label="企业名称:"
          placeholder="请输入企业名称"
        />
        <van-field
          v-model="state.name"
          label="您的姓名:"
          placeholder="请输入您的姓名"
        />
        <van-field
          v-model="state.phone"
          label="您的电话:"
          placeholder="请输入您的电话"
        />
        <van-field
          v-model="state.age"
          label="您的年龄:"
          placeholder="请输入您的年龄"
        />
        <van-field
          v-model="state.introduce"
          class="field-last"
          type="textarea"
          rows="8"
          label="企业介绍:"
          placeholder="请输入企业介绍"
        />
        <p class="company-tip">
          注：必须填写真实信息，发现填写造假，一律取消应
          聘资格。如果您的资料符合要求，我们会尽快与您取 得联系，谢谢！
        </p>
        <button native-type="submit">提交申请</button>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-cell:first-child .van-field__label) {
  width: 5rem;
  font-size: 0.8rem;
}
:deep(.van-cell .van-field__label) {
  width: 3.5rem;
  font-size: 0.8rem;
}
.field-last {
  display: block;
}
.field-last :deep(.van-field__label) {
  margin-bottom: 1rem;
}

.company-top {
  background: url("@/assets/img/my/partner/company-bg-top.png") no-repeat;
  height: 20rem;
  width: 100%;
  background-size: 100%;

  h3 {
    font-size: 2.45rem;
    line-height: 2.45rem;
    font-weight: 800;
    color: #ffffff;
    text-align: center;
    padding: 3.68rem 0 0.96rem;
  }

  h4 {
    font-size: 1.28rem;
    line-height: 1.28rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
  }
}

.company-page {
  background: #f03c17;
  padding: 0.8rem;
  h5 {
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 600;
    color: #fd4919;
    background: #ffe28a;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.2rem;
    position: relative;
  }
  h5::after {
    position: absolute;
    width: 1.26rem;
    height: 0.13rem;
    background: linear-gradient(180deg, #ffe28a, #fa7911);
    content: "";
    left: 0.1rem;
    top: 1.2rem;
  }

  .company-adv {
    background: #ffffff;
    box-shadow: 0rem 0rem 0rem 0rem rgba(247, 93, 16, 0.17);
    border-radius: 0.52rem;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #f03c17;
    line-height: 1.28rem;
    padding: 0.8rem;
    margin: 0 0 1.23rem;
  }
  .company-service {
    background: #ffffff;
    box-shadow: 0rem 0rem 0rem 0rem rgba(247, 93, 16, 0.17);
    border-radius: 0.52rem;
    padding: 1.3rem 0.5rem;
    margin-bottom: 1.8rem;

    img {
      width: 100%;
    }
  }
  .company-settled {
    background: #ffffff;
    box-shadow: 0rem 0rem 0rem 0rem rgba(247, 93, 16, 0.17);
    border-radius: 0.52rem;
    padding: 0.8rem;
    .wy-radio {
      padding: var(--van-cell-vertical-padding)
        var(--van-cell-horizontal-padding);
      position: relative;
      color: var(--van-cell-text-color);
      font-size: var(--van-cell-font-size);

      label {
        margin-bottom: 0.8rem;
        display: block;
      }
    }

    .wy-radio::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: var(--van-padding-md);
      bottom: 0;
      left: var(--van-padding-md);
      border-bottom: 1px solid var(--van-cell-border-color);
      transform: scaleY(0.5);
    }

    .company-p {
      color: var(--van-cell-text-color);
      font-size: var(--van-cell-font-size);
      padding: 1.2rem var(--van-cell-horizontal-padding) 0.8rem;
    }

    .company-tip {
      font-size: 0.64rem;
      font-weight: 100;
      color: #999999;
      line-height: 0.96rem;
      padding: 1.2rem var(--van-cell-horizontal-padding) 0.8rem;
    }

    button {
      width: 13.8rem;
      height: 2.1rem;
      background: #f03c17;
      border-radius: 0.2rem;
      font-size: 0.8rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 2.1rem;
      text-align: center;
      border: 0;
      margin: 0.5rem auto;
      display: block;
    }
  }
}
</style>
