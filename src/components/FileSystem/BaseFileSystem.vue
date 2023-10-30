<template>
  <div v-if="data.size">
    <div
      v-for="node of data.values()"
      :key="node.id"
    >
      <div class="file-system-container">
        <BaseNodeFileSystem v-bind="node" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TMapFileSystem } from '@/stores/fileSystemStore/model';
  import BaseNodeFileSystem from '@/components/FileSystem/BaseNodeFileSystem/BaseNodeFileSystem.vue';

  defineProps<{ data: TMapFileSystem }>();
</script>

<style scoped>
  .file-system-container {
    display: flex;
    padding: 4px 0;
    gap: 10px;
  }
</style>
