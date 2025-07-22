import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useUserStore } from './stores/useUserStore'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia);
const userStore = useUserStore();
userStore.loadFromStorage();
app.mount('#app');