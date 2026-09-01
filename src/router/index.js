import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于' },
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: { title: '隐私政策' },
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: () => import('@/views/DisclaimerView.vue'),
    meta: { title: '免责声明' },
  },
  {
    path: '/postsite',
    name: 'PostSite',
    component: () => import('@/views/PostSiteView.vue'),
    meta: { title: '投稿&反馈' },
  },
  {
    path: '/announcements',
    name: 'Announcements',
    component: () => import('@/views/AnnouncementsListView.vue'),
    meta: { title: '公告' },
  },
  {
    path: '/announcements/:id',
    name: 'AnnouncementDetail',
    component: () => import('@/views/AnnouncementDetailView.vue'),
    meta: { title: '公告详情' },
  },
  {
    path: '/sites/detail',
    name: 'SiteDetail',
    component: () => import('@/views/SiteDetailView.vue'),
    // 由 SiteDetailView 内部用 usePageTitle 设置动态站点名标题
  },
  {
    path: '/sitetrash',
    name: 'SiteTrash',
    component: () => import('@/views/SiteTrashView.vue'),
    meta: { title: '失效归档' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面未找到' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
