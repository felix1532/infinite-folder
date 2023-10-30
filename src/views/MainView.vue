<template>
  <div class="main-container">
    <BaseFileSystem
      :data="fileSystem"
      class="file-system"
    />
  </div>
</template>

<script setup lang="ts">
  import { useFileSystemStore } from '@/stores/fileSystemStore/store';
  import BaseFileSystem from '@/components/FileSystem/BaseFileSystem.vue';

  const { createNodeFileSystem, fileSystem } = useFileSystemStore();

  //TODO: create method for generate initial system folders
  createNodeFileSystem('Folder 1');
  createNodeFileSystem('Folder 2');
</script>

<style scoped>
  .main-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .file-system {
    width: 500px;
    height: fit-content;
  }
</style>
