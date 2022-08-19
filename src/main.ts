import { createApp } from 'vue'
// 导入antd组件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'


import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

// createApp(App).use(store).use(router).mount('#app')
// 注册使用
const app = createApp(App);
app.use(Antd)
app.use(ElementPlus)
app.use(router)
app.use(store)
// app.use(axios)
app.mount('#app')