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
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyView.vue'),
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: () => import('@/views/DisclaimerView.vue'),
  },
  {
    path: '/postsite',
    name: 'PostSite',
    component: () => import('@/views/PostSiteView.vue'),
  },
  {
    path: '/announcements',
    name: 'Announcements',
    component: () => import('@/views/AnnouncementsListView.vue'),
  },
  {
    path: '/announcements/:id',
    name: 'AnnouncementDetail',
    component: () => import('@/views/AnnouncementDetailView.vue'),
  },
  {
    path: '/sites/detail',
    name: 'SiteDetail',
    component: () => import('@/views/SiteDetailView.vue'),
  },
  {
    path: '/sitetrash',
    name: 'SiteTrash',
    component: () => import('@/views/SiteTrashView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
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
