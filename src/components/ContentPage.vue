<template>
  <div class="content">
    <LegalNav />
    <ContentPageLayout panel-class="card no-hover-card">
      <h1 class="cp-title">{{ page.title }}</h1>
      <div class="cp-body">
        <section v-for="section in page.sections" :key="section.heading" class="cp-section">
          <h3 class="cp-heading">{{ section.heading }}</h3>
          <component
            v-for="(block, index) in section.blocks"
            :key="index"
            :is="blockRenderers[block.type] || EmptyBlock"
            :block="block"
          />
        </section>
        <p class="cp-updated">最后更新时间：{{ page.updatedAt }}</p>
      </div>
    </ContentPageLayout>
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import ContentPageLayout from '@/components/ContentPageLayout.vue'
import LegalNav from '@/components/LegalNav.vue'
import InlineNodes from '@/components/InlineNodes.vue'

// 数据驱动的静态内容页：page 结构见 src/data/contentPages.json
// - section.blocks: { type: 'p' | 'list' | 'h6' }
// - nodes/列表项可为字符串、站内 { to }、外链 { href }、加粗 { strong }
// - 外链的 target/rel 已直接写在数据里，运行时不再做归一化
// - 新增块类型只需在 blockRenderers 注册一条 { type: renderer }
defineProps({
  page: {
    type: Object,
    required: true,
  },
})

const toNodes = (item) => (Array.isArray(item) ? item : [item])

const ParagraphBlock = defineComponent({
  name: 'ParagraphBlock',
  props: { block: { type: Object, required: true } },
  render() {
    return h('p', { class: 'cp-paragraph' }, h(InlineNodes, { nodes: this.block.nodes }))
  },
})

const ListBlock = defineComponent({
  name: 'ListBlock',
  props: { block: { type: Object, required: true } },
  render() {
    return h(
      'ul',
      { class: 'cp-list' },
      this.block.items.map((item, index) =>
        h('li', { key: index }, h(InlineNodes, { nodes: toNodes(item) }))
      )
    )
  },
})

const HeadingBlock = defineComponent({
  name: 'HeadingBlock',
  props: { block: { type: Object, required: true } },
  render() {
    return h('h6', { class: 'cp-subhead' }, this.block.text)
  },
})

// 未知块类型渲染为空，不产生告警
const EmptyBlock = { name: 'EmptyBlock', render: () => null }

const blockRenderers = { p: ParagraphBlock, list: ListBlock, h6: HeadingBlock }
</script>

<style>
/* 非 scoped：block 由 defineComponent 渲染，无法继承本组件 scopeId；
   cp-* 类仅用于内容页，无全局冲突风险 */
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
