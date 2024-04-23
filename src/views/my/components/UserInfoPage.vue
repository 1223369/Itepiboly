<script setup lang="ts">
import { reactive, inject } from "vue";
import { systemDetails } from "@/api/message";
import { uploadImage, userModify } from "@/api/my";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { taskStore } from "@/store/task";
import { myStore } from "@/store/my";
import { formatGender } from "@/utils/common";

const router = useRouter();

const store = myStore();

const tsStore = taskStore();
if (!tsStore.areaList.length) tsStore.getCityList();

// 性别列表
const sexList = [
  { name: "男", value: "male" },
  { name: "女", value: "female" },
];

// 日期选择器展示方式
const columnsType = ["year", "month"];

// 将路由携带的任务id赋值
const id = router.currentRoute.value.params.id;
const state = reactive({
  fileList: [], // 头像文件
  loading: false,
  userName: "", // 用户名
  sex: "", // 当前性别
  showSex: false, // 性别弹窗是否显示
  showBirthday: false, // 生日弹窗是否显示
  birthday: "", // 生日
  minDate: new Date(1970, 0, 1), // 最小日期
  maxDate: new Date(), // 最大日期
  showWorkTime: false, // 参加工作时间弹窗是否显示
  workTime: "", // 参加工作时间
  showCity: false, // 城市弹窗是否显示
  city: "", // 城市
  area: "", // 区域
});

// 接收父组件传的值
const { closeChange } = inject("popup");

// 初始化数据
const setInfo = () => {
  state.userName = store.userInfo.user_name;
  state.sex = formatGender.sex(store.userInfo.sex);
  state.birthday = store.userInfo.birthday;
  state.workTime = store.userInfo.work_time;
  state.city = store.userInfo.city;
  state.area = store.userInfo.area;
  if (store.userInfo.it_head) {
    state.fileList = [
      {
        url: store.userInfo.it_head,
      },
    ];
  }
};

// 获取任务详情
const getSystemDetails = async () => {
  state.loading = true;
  const res = await systemDetails({
    id: id,
  });
  if (res) {
    state.item = res[0];
  } else {
    showshowToast(res.msg);
  }
  state.loading = false;
};

// 上传图片
const afterRead = async (file: File) => {
  file.status = "uploading";
  file.message = "上传中...";
  let param = new FormData();
  param.append("user", "test");
  param.append("file", file.file);
  const res = await uploadImage(param);
  console.log("res", res);
  file.url = res.imageUrl;
  file.status = "done";
  file.message = "上传成功";
  state.fileList = [file];
};

// 删除图片
const deleteFile = () => {
  state.fileList = [];
};

// TODO:选择性别
const sexSelect = (value: any) => {
  state.sex = value.name;
};

// TODO:选择日期
const birthdayConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.birthday = date.getFullYear() + "-" + (date.getMonth() + 1);
  state.showBirthday = false;
};

// TODO:选择参加工作时间
const workTimeConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.workTime = date.getFullYear() + "-" + (date.getMonth() + 1);
  state.showWorkTime = false;
};

// TODO:选择城市
const cityConfirm = (value: any) => {
  console.log("value", value.selectedOptions);
  state.city = value.selectedOptions[0].text;
  state.area = value.selectedOptions[1].text;
  state.showCity = false;
};

// TODO:提交修改
const setUserModiFy = async () => {
  if (state.fileList.length === 0) {
    showToast("请上传头像");
    return;
  }
  if (!state.userName) {
    showToast("请填写姓名");
    return;
  }
  if (!state.sex) {
    showToast("请选择性别");
    return;
  }
  if (!state.birthday) {
    showToast("请选择出生年月");
    return;
  }
  if (!state.workTime) {
    showToast("请选择参加工作时间");
    return;
  }
  if (!state.city) {
    showToast("请选择城市");
    return;
  }
  state.loading = true;
  const res = await userModify({
    user_name: state.userName,
    sex: state.sex === "男" ? 1 : state.sex === "女" ? 2 : "",
    birthday: state.birthday,
    work_time: state.workTime,
    city: state.city,
    area: state.area,
    it_head: state.fileList[0].url,
    type: 1,
  });
  if (res) {
    store.getUserInfo();
  }
  showToast(res.msg);
  state.loading = false;
};

// const leftBack = () => history.back();

// 执行函数
getSystemDetails();

// 闭包
if (!store.userInfo.user_name) {
  // 匿名函数
  (async function () {
    await store.getUserInfo();
    setInfo();
  })();
} else {
  setInfo();
}
</script>

<template>
  <van-nav-bar title="个人信息" left-arrow @click-left="closeChange" />

  <div class="user-page">
    <van-form @submit="setUserModiFy">
      <div class="user-pic">
        <van-uploader
          v-model="state.fileList"
          :after-read="(afterRead as any)"
          :before-delete="deleteFile"
          accept=".jpg,.png,.jpeg"
          max-count="1"
        />
      </div>

      <div class="user-item">
        <h5>姓名</h5>
        <van-field
          v-model="state.userName"
          label=""
          placeholder="请输入您的姓名"
        />
      </div>

      <div class="user-item">
        <h5>性别</h5>
        <van-field
          v-model="state.sex"
          readonly
          is-link
          @click="state.showSex = true"
          placeholder="请选择您的性别"
        />
        <van-action-sheet
          v-model:show="state.showSex"
          :actions="sexList"
          cancel-text="取消"
          close-on-click-action
          @select="sexSelect"
        />
      </div>

      <div class="user-item">
        <h5>出生年月</h5>
        <van-field
          v-model="state.birthday"
          readonly
          is-link
          @click="state.showBirthday = true"
          placeholder="请选择您的出生年月"
        />
        <van-action-sheet v-model:show="state.showBirthday">
          <van-date-picker
            title="选择日期"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :columnsType="columnsType"
            @confirm="birthdayConfirm"
            @cancel="state.showBirthday = false"
          />
        </van-action-sheet>
      </div>

      <div class="user-item">
        <h5>参加工作时间</h5>
        <van-field
          v-model="state.workTime"
          readonlyime
          is-link
          @click="state.showWorkTime = true"
          placeholder="请选择您的参加工作时间"
        />
        <van-action-sheet v-model:show="state.showWorkTime">
          <van-date-picker
            title="选择日期"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :columnsType="columnsType"
            @confirm="workTimeConfirm"
            @cancel="state.showWorkTime = false"
          />
        </van-action-sheet>
      </div>

      <div class="user-item">
        <h5>所在城市</h5>
        <van-field
          v-model="state.city"
          label=""
          placeholder="请选择您的所在城市"
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
      </div>
      <button class="wy-confirm-btn" native-type="submit">完成</button>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-image__img) {
  border-radius: 50%;
}
:deep(.van-uploader__upload) {
  margin: 0;
  border-radius: 50%;
}
.user-page {
  margin: 0 0.6rem;

  // 头像部分
  .user-pic {
    text-align: center;
    padding: 0.67rem;
    margin-bottom: 1.47rem;
    border-bottom: 1px solid #f3f3f3;

    img {
      width: 3.7rem;
      height: 3.7rem;
      border-radius: 50%;
    }
  }

  // 表单部分
  .user-item {
    margin-bottom: 1.47rem;
    border-bottom: 1px solid #f3f3f3;

    h5 {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 300;
      color: #666666;
    }
  }
  .wy-confirm-btn {
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #fea829, #fe8f27);
    border-radius: 0.27rem;
    width: calc(100vw - 1.2rem);
    border: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0 0.6rem 0.6rem;
    font-size: 0.8rem;
    color: #ffffff;
  }
}
</style>
