export default [
  {
    path: '/',
    redirect: '/web/auth/login',
  },
  {
    path: '/web/auth/login',
    name: 'auth.login',
    meta: {
      name: '用户登录',
    },
    component: () => import('@/views/web/auth/Login.vue'),
  },
];
