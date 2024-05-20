<script setup lang="ts">
import { reactive } from "vue";
import { addManage } from "@/api/my";
import { taskStore } from "@/store/task";
import { showToast } from "vant";
const tsStore = taskStore();
if (!tsStore.areaList.length) tsStore.getCityList();
const state = reactive({
  city: "",
  area: "",
  work_team: "",
  undergo: "",
  bond: "",
  lead: "",
  name: "",
  sex: "",
  phone: "",
  age: "",
  introduce: "",
  showCity: false,
});
const cityConfirm = (value: any) => {
  state.city = value.selectedOptions[0].text;
  state.area = value.selectedOptions[1].text;
  state.showCity = false;
};
const submit = async () => {
  if (!state.city) {
    showToast("请选择城市");
    return;
  }
  if (!state.work_team) {
    showToast("请选择是否有团队管理经验");
    return;
  }
  if (!state.undergo) {
    showToast("请选择是否有教育经历");
    return;
  }
  if (!state.bond) {
    showToast("请选择保证金");
    return;
  }
  if (!state.lead) {
    showToast("请选择团队人数");
    return;
  }
  const res = await addManage({
    city: state.city,
    area: state.area,
    work_team: state.work_team === "是" ? 0 : 1,
    undergo: state.work_team === "是" ? 0 : 1,
    bond: state.bond,
    lead: state.enterprise_name,
    name: state.name,
    sex: state.sex === "男" ? 1 : 2,
    phone: state.phone,
    age: state.age,
    introduce: state.introduce,
  });
  if (res) {
    showToast("您的申请已收到，我们会尽快为您审核");
    state.city = "";
    state.work_team = "";
    state.undergo = "";
    state.bond = "";
    state.lead = "";
    state.name = "";
    state.sex = "";
    state.phone = "";
    state.age = "";
    state.introduce = "";
  }
};
const sexList = [
  {
    name: "男",
  },
  {
    name: "女",
  },
];
const setSelect = (value) => {
  state.sex = value.name;
};
</script>
<template>
  <div class="company-top">
    <h3>寻找城市合伙人</h3>
    <h4>这是你的创业时代</h4>
  </div>
  <div class="company-page">
    <div class="admin-adv">
      <h5>我们的优势</h5>
      <p class="company-adv">
        全国寻找城市合伙人，全新的职业高校教育商业模式，招生提成高达20%。
      </p>
      <dl>
        <dd>
          <span>专业</span>
          <p>
            10+年的技术服务经验积累，能够深入理解各个行业和企业的产品功能需求，提供定制化的技术服务解决方案。
          </p>
        </dd>
        <dd>
          <span>灵活</span>
          <p>
            多种形式为企业提供灵活的技术人才解决方案，包括：驻场服务、劳务外派、业务外包远程、全职等，降低企业用人成本。
          </p>
        </dd>
        <dd>
          <span>高效</span>
          <p>
            具有丰富经验的技术开发团队支持，确保整体规划、敏捷开发、快速迭代，提高开发管理效能，最快速度交付产品。
          </p>
        </dd>
        <dd>
          <span>卓越</span>
          <p>
            配备一对一客户经理专属服务，提供电话支持、在线沟通及现场技术支持相结合的全方位售后服务。
          </p>
        </dd>
      </dl>
    </div>
    <div class="company-settled">
      <h5>申请成为城市合伙人</h5>
      <van-form @submit="submit">
        <van-field
          v-model="state.city"
          label="您所在的城市:"
          placeholder="请选择城市"
          readonly
          is-link
          @click="state.showCity = true"
        />
        <van-action-sheet v-model:show="state.showCity">
          <van-picker
            :columns="tsStore.areaList"
            @confirm="cityConfirm"
            @cancel="state.showCity = false"
          />
        </van-action-sheet>
        <div class="wy-radio">
          <label>您是否有过团队管理经验？</label>
          <van-radio-group v-model="state.work_team" direction="horizontal">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
          </van-radio-group>
        </div>
        <div class="wy-radio">
          <label>您是否从事过教育行业？</label>
          <van-radio-group v-model="state.undergo" direction="horizontal">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
          </van-radio-group>
        </div>
        <div class="wy-radio">
          <label>您愿意缴纳多少的保证金？</label>
          <van-radio-group v-model="state.bond" direction="horizontal">
            <van-radio name="1000元">1000元</van-radio>
            <van-radio name="5000元">5000元</van-radio>
            <van-radio name="其他">其他</van-radio>
          </van-radio-group>
        </div>
        <div class="wy-radio">
          <label>您曾经带领过多少人团队？</label>
          <van-radio-group v-model="state.lead" direction="horizontal">
            <van-radio name="5-10人">5-10人</van-radio>
            <van-radio name="10-20人">10-20人</van-radio>
            <van-radio name="20人以上">20人以上</van-radio>
          </van-radio-group>
        </div>
        <p class="company-p">请标准编写您的联系方式</p>
        <van-field
          v-model="state.name"
          label="您的姓名:"
          placeholder="请输入您的姓名"
        />
        <van-field
          v-model="state.sex"
          @click="state.showSex = true"
          readonly
          label="您的性别:"
          placeholder="请选择您的性别"
        />
        <van-action-sheet
          v-model:show="state.showSex"
          :actions="sexList"
          cancel-text="取消"
          close-on-click-action
          @select="setSelect"
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
          label="具体介绍:"
          placeholder="请简单填写个人介绍和工作内容"
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
:deep(.van-radio__icon--checked) :deep(.van-icon) {
  background-color: #fe9527;
  border-color: #fe9527;
}
:deep(.van-cell:first-child) :deep(.van-field__label) {
  width: 5rem;
}
:deep(.van-cell) :deep(.van-field__label) {
  width: 3.5rem;
}
.field-last {
  display: block;
}
.field-last :deep(.van-field__label) {
  margin-bottom: 1rem;
}
.company-top {
  background: url("@/assets/img/my/partner/admin-bg-top.png") no-repeat;
  height: 19.04rem;
  width: 100%;
  background-size: 100%;
  h3 {
    font-size: 2.45rem;
    line-height: 2.45rem;
    font-family: Lantinghei SC;
    font-weight: 800;
    font-style: italic;
    color: #ffffff;
    text-align: center;
    padding: 3.68rem 0 0.91rem;
  }
  h4 {
    font-size: 1.68rem;
    line-height: 1.68rem;
    font-family: PingFang SC;
    font-weight: 600;
    font-style: italic;
    color: #ffffff;
    text-align: center;
  }
}

.company-page {
  background: linear-gradient(90deg, #035bdb, #1373fd, #0051c7);
  padding: 0.48rem;
  .admin-adv {
    background: url("@/assets/img/my/partner/admin-bg-center.png") no-repeat;
    background-size: 100%;
    position: relative;
    top: -2rem;
    height: 24.53rem;
    .company-adv {
      font-size: 0.8rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #0152c9;
      line-height: 1.28rem;
      padding: 0.8rem 1.87rem 0.3rem;
    }
  }
  .company-settled {
    background: url("@/assets/img/my/partner/admin-bg-bottom.png") no-repeat;
    background-size: 100%;
    padding: 0.1rem 0.8rem;
    margin-top: -1.5rem;
    height: 56.77rem;
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
    .wy-radio:after {
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
      background: #4e90ef;
      border-radius: 0.2rem;
      font-size: 0.8rem;
      font-weight: 400;
      color: #ffffff;
      line-height: 2.1rem;
      text-align: center;
      border: 0;
      margin: 0.5rem auto;
      display: block;
    }
  }
  h5 {
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 1.2rem;
    text-align: center;
    position: relative;
    padding-top: 0.5rem;
  }
  dl {
    dd {
      border-bottom: 1px solid #bed0dd;
      display: flex;
      align-items: center;
      padding: 0.64rem 0;
      margin: 0 1.12rem;
      span {
        width: 3.12rem;
        height: 3.12rem;
        line-height: 3.12rem;
        text-align: center;
        background: #2c92ff;
        border-radius: 50%;
        font-size: 0.96rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      p {
        font-size: 0.69rem;
        font-family: PingFang SC;
        font-weight: 300;
        color: #000000;
        line-height: 0.96rem;
        flex: 1;
        margin-left: 0.45rem;
      }
    }
    dd:last-child {
      border-bottom: 0;
    }
  }
}
</style>
