import { createApp } from 'vue'
// 2. 引入组件样式
import 'vant/lib/index.css';
import './assets/css/style.scss'
// import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { directive } from './utils/common'
import { Button,NavBar,Tabbar,TabbarItem,Checkbox,Toast,Icon,Popup,Swipe, SwipeItem,List,PullRefresh,ActionBarIcon,Search,
  Loading,Field,SwipeCell,Uploader,Form,ActionSheet,Picker,CheckboxGroup,Dialog,Switch,RadioGroup, Radio,DatePicker  } from 'vant'


//创建vue实例
const app = createApp(App)
// 注册全局指令
directive(app)
//挂载pinia
app.use(store)
//挂载路由
app.use(router)
app.use(Button)
app.use(NavBar)
app.use(Checkbox)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Toast)
app.use(Icon)
app.use(Popup)
app.use(Swipe)
app.use(SwipeItem)
app.use(List)
app.use(PullRefresh)
app.use(ActionBarIcon)
app.use(Search)
app.use(Loading)
app.use(Field)
app.use(SwipeCell)
app.use(Uploader)
app.use(Form)
app.use(Picker)
app.use(Dialog)
app.use(CheckboxGroup)
app.use(Switch)
app.use(RadioGroup)
app.use(Radio)
app.use(ActionSheet)
app.use(DatePicker)

//挂载实例
app.mount('#app')
  