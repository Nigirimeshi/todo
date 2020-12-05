import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Dashboard from '@/views/Dashboard.vue'
import Projects from "@/views/Projects";
import Team from "@/views/Team";
import Login from "@/views/Login";
import Signup from "@/views/Signup";

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// ⚠ 得在挂载 VueRouter 之前使用 beforeEach
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.name !== 'Login' && !store.state.auth.loggedIn) next({
      name: 'Login',
      query: {redirect: to.fullPath},
    })
    else next()
  } else next()
})

Vue.use(VueRouter)

export default router
