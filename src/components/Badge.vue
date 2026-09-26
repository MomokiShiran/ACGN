<template>
  <span class="badge badge-primary"><slot /></span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 6px;
  color: #fff;
}
.badge-primary {
  background-color: var(--primary);
}
</style>
