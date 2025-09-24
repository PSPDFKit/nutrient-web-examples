import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import BasicViewerPage from './pages/BasicViewerPage.vue'
import MagazineModePage from './pages/MagazineModePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/basic-viewer', component: BasicViewerPage },
  { path: '/magazine-mode', component: MagazineModePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')