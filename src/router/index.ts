import Vue from 'vue';
import VueRouter from 'vue-router';
import { UserModule } from '@/store/modules/user';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup/index.vue')
  },
  {
    path: '/todo-list',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "todo-list" */ '@/views/TodoList.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// ⚠ 得在挂载 VueRouter 之前使用 beforeEach
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.name !== 'index.vue' && !UserModule.token)
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      });
    else next();
  } else next();
});

Vue.use(VueRouter);

export default router;
