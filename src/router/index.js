import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/Team')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup')
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
    if (to.name !== 'Login' && !store.state.auth.loggedIn)
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      });
    else next();
  } else next();
});

Vue.use(VueRouter);

export default router;
