import { computed, unref } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { DEFAULT_TITLE, PAGE_TITLE_SUFFIX } from '@/constants/app'

// 统一封装页面标题逻辑：传入 ref 时使用动态标题，否则回退到 route.meta.title，
// 最终未命中则使用 DEFAULT_TITLE。除默认标题外，均拼接 PAGE_TITLE_SUFFIX。
export function usePageTitle(titleRef) {
  const route = useRoute()
  const pageTitle = computed(() => {
    const raw = titleRef ? unref(titleRef) : route.meta?.title
    if (!raw) return DEFAULT_TITLE
    return `${raw}${PAGE_TITLE_SUFFIX}`
  })
  useHead({ title: pageTitle })
  return pageTitle
}
