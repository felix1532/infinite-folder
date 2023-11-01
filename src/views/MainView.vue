<template>
  <div class="main-container">
    <FileSystem
      :data="virtualModelFileSystem"
      class="file-system"
    />
  </div>
</template>

<script setup lang="ts">
  import { useFileSystemStore } from '@/stores/fileSystemStore/store';
  import FileSystem from '@/components/FileSystem/FileSystem.vue';
  import type { TInitSchemeFileSystem } from '@/stores/fileSystemStore/models/initScheme';

  const { generateFileSystemByScheme, virtualModelFileSystem } =
    useFileSystemStore();

  //Схема инициализация файловой системы
  const scheme: TInitSchemeFileSystem = [
    { type: 'folder', name: 'Folder 1', isShow: false },
    {
      type: 'folder',
      name: 'Folder 2',
      isShow: false,
      children: [
        { type: 'folder', name: 'Folder 2.1', isShow: false },
        {
          type: 'folder',
          name: 'Folder 2.2',
          isShow: false,
          children: [
            {
              type: 'folder',
              name: 'Folder 2.2.1',
              isShow: false,
            },
            {
              type: 'pdf',
              name: 'Pdf File 2.2.2',
              extension: 'pdf',
              value: 'pdf data',
            },
          ],
        },
      ],
    },
    { type: 'pdf', name: 'Pdf File 3', extension: 'pdf', value: 'pdf data' },
  ];

  //Инициалзиация узлов файловой системы соотвествии со схемой
  generateFileSystemByScheme(scheme);
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
    min-width: 500px;
    height: fit-content;
  }
</style>
