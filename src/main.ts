import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import { i18nPlugin } from './modules/i18n'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18nPlugin)

app.mount('#app')
