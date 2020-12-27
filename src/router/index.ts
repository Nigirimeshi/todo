import Vue from 'vue';
import VueRouter from 'vue-router';
import { UserModule } from '@/store/modules/user';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "redirect" */ '@/views/Dashboard.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () =>
      import(/* webpackChunkName: "redirect" */ '@/views/Projects.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: () =>
      import(/* webpackChunkName: "redirect" */ '@/views/Team.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "redirect" */ '@/views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () =>
      import(/* webpackChunkName: "redirect" */ '@/views/Signup.vue')
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
    if (to.name !== 'Login' && !UserModule.token)
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      });
    else next();
  } else next();
});

Vue.use(VueRouter);

export default router;
