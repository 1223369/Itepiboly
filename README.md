# Vue 3 + TypeScript + Vite

# 项目公共组件
components
   list                                // 列表文件
      TaskList.vue                     // 任务列表组件
      ContractList.vue                 // 合约列表组件
      MessageList.vue                  // 消息列表组件
      TalentList.vue                   // 人才列表组件
   FooterTabbar.vue                    // 底部导航组件

# 静态资源
assets
    img              // 图片资源
        icon         // icon图标类图片
    css              // 样式资源
        style.css    // 公用样式

# api接口
api
    user.ts          // 登录模块api
    task.ts          // 任务模块api
    contract.ts      // 合约模块api
    message.ts       // 消息模块api
    my.ts            // 我的模块api
    talent.ts        // 人才模块api

# 路由
router
   index.ts          // 路由配置


# 项目页面结构
views
   login
      index.vue             //登录页
      serviceAgree.vue      //服务协议页
      privacyPolicy.vue     //隐私政策页
   task
      index.vue             //任务页
      search.vue            //任务搜索页
      detail.vue            //任务详情页
      companySource.vue     //公司任务主页
   contract
      index.vue             //合约主页
      details.vue            //合约详情页
      progress.vue           //合约进度页
   message
      index.vue             //消息中心页
      systemList.vue        //系统消息列表
      systemDetails.vue      //系统消息详情页
      talk.vue              //对话消息页
   my
      index.vue             //我的主页
      user                  //个人中心页
         index.vue          //个人信息主页
         authReal.vue       //实名认证页
         certified.vue      //已完成实名认证
         identitySwitch.vue //切换身份
      set                   //我的设置页
         index.vue          //设置主页
      feedback              //意见反馈
         index.vue          //意见反馈主页
      account                // 我的账户
            index.vue       // 账户主页
            advance.vue     // 账户提现
            coinExplain.vue // 无忧币说明
            depositExplain.vue// 押金说明
      resume                // 我的简历
            index.vue       // 简历主页
            preview.vue     // 简历预览
      collect               // 我的收藏
            index.vue       // 收藏主页
   talent
        index.vue           // 人才主页
        details.vue         // 人才详情
