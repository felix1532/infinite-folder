<template>
  <i class="icon-wrapper">
    <slot></slot>
  </i>
</template>

<style scoped>
  .icon-wrapper {
    width: 24px;
    height: 24px;
    display: block;
    color: white;
    cursor: pointer;
  }

  .icon-wrapper :deep(svg) {
    width: 100%;
    height: 100%;
    display: block;
    color: inherit;
  }
</style>
