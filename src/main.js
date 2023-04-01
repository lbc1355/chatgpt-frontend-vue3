import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VMdPreview from './libimprot'
createApp(App).use(store).use(ElementPlus).use(router).use(VMdPreview).mount('#app')
