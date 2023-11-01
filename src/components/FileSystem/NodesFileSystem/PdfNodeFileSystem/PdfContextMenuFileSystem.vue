<template>
  <BaseDropdown
    prevent
    closeOnClick
  >
    <template #trigger="{ toggleDropdown }">
      <div
        class="node-file-system"
        @click.right.prevent="toggleDropdown()"
      >
        <slot />
      </div>
    </template>
    <template #content="{ toggle }">
      <menu
        v-if="hideMenu"
        class="node-file-ctx-menu"
        @click.capture="toggle()"
      >
        <li @click.stop="$emit('editName')">Переименовать</li>
        <li @click.stop="$emit('delete')">Удалить</li>
      </menu>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import BaseDropdown from '@/components/common/BaseDropdown.vue';

  withDefaults(defineProps<{ hideMenu: boolean }>(), {
    hideMenu: false,
  });

  defineEmits<{
    (e: 'editName'): void;
    (e: 'delete'): void;
  }>();
</script>

<style scoped>
  .node-file-ctx-menu {
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }

  .node-file-system {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 0;
    position: relative;
  }

  .node-file-ctx-menu li {
    padding: 10px;
    transition: 0.1s ease-in;
  }

  .node-file-ctx-menu li:hover {
    background-color: dimgrey;
  }

  .node-file-ctx-menu li:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .node-file-ctx-menu li:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
</style>
