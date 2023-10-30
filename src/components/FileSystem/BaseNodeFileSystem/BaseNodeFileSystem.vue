<template>
  <div class="node-file-system-container">
    <div class="node-file-system">
      <div
        class="node-file-system-folder"
        @click="toggleShow"
      >
        <BaseIconWrapper class="node-icon">
          <OpenedFolderIcon v-if="isShow" />
          <ClosedFolderIcon v-else />
        </BaseIconWrapper>

        <div>{{ value }}</div>
      </div>

      <BaseNodeActionsFileSystem
        @add="addChildNode"
        @delete="deleteCurrentNode"
      />
    </div>

    <div v-show="isShow">
      <BaseFileSystem
        v-if="children.size"
        :data="children"
      />
      <div
        v-else
        class="node-file-empty"
      >
        Пусто
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { IFileSystem } from '@/stores/fileSystemStore/model';
  import BaseFileSystem from '@/components/FileSystem/BaseFileSystem.vue';
  import BaseIconWrapper from '@/components/common/BaseIconWrapper.vue';
  import OpenedFolderIcon from '@/assets/icons/OpenedFolderIcon.vue';
  import ClosedFolderIcon from '@/assets/icons/ClosedFolderIcon.vue';
  import { computed } from 'vue';
  import BaseNodeActionsFileSystem from '@/components/FileSystem/BaseNodeFileSystem/BaseNodeActionsFileSystem.vue';

  const props = defineProps<IFileSystem>();

  const isShow = computed(() => props.isShow);
</script>

<style scoped>
  .node-file-system-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }

  .node-file-system {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .node-file-system-folder {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .node-file-empty {
    padding: 4px 0;
    margin-left: 32px;
  }

  .node-icon :deep(path) {
    fill: #e3e5e8;
    stroke: #e3e5e8;
  }
</style>
