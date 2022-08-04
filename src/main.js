import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import router from '@/router'
import 'virtual:svg-icons-register'

import '@/settings'

import SvgIcon from '@/components/SvgIcon/index.vue'

import 'normalize.css/normalize.css'
import '@/styles/var.css'
import '@/styles/index.css'
import '@/styles/vant/index.css'

const app = createApp(App)

app.component('SvgIcon', SvgIcon)
  .use(router)
  .use(pinia)
  .mount('#app')
