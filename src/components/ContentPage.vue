<template>
  <PageContent>
    <LegalNav />
    <Card>
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
    </Card>
  </PageContent>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import Card from '@/components/Card.vue'
import PageContent from '@/components/PageContent.vue'
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
        h('li', { key: index, class: 'cp-list-item' }, h(InlineNodes, { nodes: toNodes(item) }))
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
  margin: 0 0 16px;
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--text-heading);
  line-height: 1.2;
}

.cp-section {
  margin-bottom: 16px;
}

.cp-heading {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-heading);
}

.cp-section > *:first-child {
  margin-top: 0;
}

.cp-paragraph {
  margin: 8px 0;
  white-space: pre-line;
}

.cp-list {
  margin: 8px 0;
  padding-left: 20px;
  color: var(--text);
}

.cp-list-item {
  margin-top: 4px;
}

.cp-subhead {
  margin: 12px 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-heading);
}

.cp-updated {
  margin: 0;
  color: var(--text-muted);
}
</style>
