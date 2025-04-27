export const routes = [
  {
    path: '/',
    name: '/',
    meta: {
      layout: 'default'
    },
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/pages/index.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/pages/about.vue')
      }
    ]
  },
  {
    path: '/:path(.*)',
    name: '/[...path]',
    meta: {
      layout: 404
    },
    component: () => import('@/layouts/404.vue')
  }
]
