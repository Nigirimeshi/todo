import Vue from 'vue';
import VueRouter from 'vue-router';
import { UserModule } from '@/store/modules/user';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Index.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup/Index.vue')
  },
  {
    path: '/todo-list',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "todo-list" */ '@/views/TodoList/Index.vue'),
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
    if (to.name !== 'Login' && !UserModule.signedIn)
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      });
    else next();
  } else next();
});

Vue.use(VueRouter);

export default router;
