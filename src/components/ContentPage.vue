<template>
  <div class="content">
    <LegalNav />
    <ContentPageLayout panel-class="card no-hover-card">
      <h1 class="cp-title">{{ page.title }}</h1>
      <div class="cp-body">
        <section v-for="section in normalized.sections" :key="section.heading" class="cp-section">
          <h3 class="cp-heading">{{ section.heading }}</h3>
          <template v-for="(block, index) in section.blocks" :key="index">
            <p v-if="block.type === 'p'" class="cp-paragraph">
              <InlineNodes :nodes="block.nodes" />
            </p>
            <ul v-else-if="block.type === 'list'" class="cp-list">
              <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
                <InlineNodes :nodes="item" />
              </li>
            </ul>
            <h6 v-else-if="block.type === 'h6'" class="cp-subhead">{{ block.text }}</h6>
          </template>
        </section>
        <p class="cp-updated">最后更新时间：{{ page.updatedAt }}</p>
      </div>
    </ContentPageLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ContentPageLayout from '@/components/ContentPageLayout.vue'
import LegalNav from '@/components/LegalNav.vue'
import InlineNodes from '@/components/InlineNodes.vue'

// 数据驱动的静态内容页：page 结构见 src/data/contentPages.json
// - section.blocks: { type: 'p' | 'list' | 'h6' }
// - 段落/列表项节点可为字符串，或 { to } 站内链接 / { href } 外链 / { strong } 加粗
const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
})

// 字符串节点归一化为 { text }，http(s) 外链自动添加新窗口打开
const toNode = (n) => {
  if (typeof n === 'string') return { text: n }
  if (n.href && /^https?:/.test(n.href)) {
    return { ...n, target: '_blank', rel: 'noopener noreferrer' }
  }
  return n
}

const normalized = computed(() => ({
  ...props.page,
  sections: props.page.sections.map((section) => ({
    ...section,
    blocks: section.blocks.map((block) => {
      if (block.type === 'p') {
        return { ...block, nodes: block.nodes.map(toNode) }
      }
      if (block.type === 'list') {
        // 列表项允许是字符串或内联节点数组
        return {
          ...block,
          items: block.items.map((item) => (Array.isArray(item) ? item.map(toNode) : [toNode(item)])),
        }
      }
      return block
    }),
  })),
}))
</script>

<style scoped>
.cp-title {
  margin: 0 0 var(--space-4);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
  line-height: var(--line-height-tight);
}

.cp-section {
  margin-bottom: var(--space-4);
}

.cp-heading {
  margin: 0 0 var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
}

.cp-section > *:first-child {
  margin-top: 0;
}

.cp-paragraph {
  margin: var(--space-2) 0;
  white-space: pre-line;
}

.cp-list {
  margin: var(--space-2) 0;
  padding-left: var(--space-5);
  color: var(--text);
}

.cp-list li {
  margin-top: var(--space-1);
}

.cp-subhead {
  margin: var(--space-3) 0 var(--space-2);
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
}

.cp-updated {
  margin: 0;
  color: var(--text-muted);
}
</style>