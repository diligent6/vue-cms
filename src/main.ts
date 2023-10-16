import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores'
import router from '@/router'

//进行样式重置
import 'normalize.css'
import './assets/css/index.css'
import registerIcons from './global/register-icons'

const app = createApp(App)
//plugin 可以是一个对象，可以是一个接受app的函数
//如果是函数，会自动将app作为参数传递
app.use(registerIcons)
app.use(pinia)

app.use(router)

app.mount('#app')
