import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CoursesPage from '../pages/CoursesPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'דף הבית',
    components: {
      default: HomePage,
    },
  },
  {
    path: '/courses',
    name: 'קורסים',
    components: {
      default: CoursesPage,
    },
  },
  {
    path: '/register',
    name: 'הרשמה',
    components: {
      default: SignUpPage,
    },
  },
  {
    path: '/login',
    name: 'התחברות',
    components: {
      default: LoginPage,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
