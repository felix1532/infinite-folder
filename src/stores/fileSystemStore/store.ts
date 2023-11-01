import { defineStore } from 'pinia';
import { UIUniqid } from '@/utils/UIUniqid';
import { reactive, readonly } from 'vue';

import {
  getAppendModelNode,
  getEmptyNodeByType,
} from '@/stores/fileSystemStore/helpers';
import type { AtLeastOne } from '@/utils/object';
import { mapStrictNodeData } from '@/stores/fileSystemStore/mappers';
import type {
  IVirtualNodeModelFileSystem,
  TVirtualModelFileSystem,
} from '@/stores/fileSystemStore/models/nodeVirtualModel';
import type {
  IUpdateFileSystem,
  TGetNodeByType,
  TItemFileSystem,
} from '@/stores/fileSystemStore/models/nodeData';
import {
  folderTypeFileSystem,
  type TItemFileSystemType,
} from '@/stores/fileSystemStore/models/nodeTypes';
import type { TInitSchemeFileSystem } from '@/stores/fileSystemStore/models/initScheme';

export const useFileSystemStore = defineStore('fileSystem', () => {
  /* Хранилище узлов, в котором можно хранить необходимые данные.
   В зависимости от любого типа файла можно расширять поддерживаемые типы файловой системы будь то pdf word или video файл, сам ресурс будет храниться в
  этом хранилище ,а виртуальная модель узлов дает методы для CRUD операций над ними.*/
  const nodes = reactive(new Map());

  /* Виртуальная модель файловой системы необходима для отрисовки дерева,
   каждый элемент содержит в себе имплементацию необходимых методов для работы с файлами и папками */
  const virtualModelFileSystem = reactive<TVirtualModelFileSystem>(new Map());

  const createNodeFileSystem = <T extends TItemFileSystemType>(type: T) => {
    const nodeKey = UIUniqid();
    const node = getEmptyNodeByType(type);

    const createNode = (newNode: TGetNodeByType<IUpdateFileSystem, T>) => {
      nodes.set(nodeKey, { ...node, ...newNode });
    };

    const updateNode = (
      updatedNode: AtLeastOne<
        Omit<TGetNodeByType<IUpdateFileSystem, T>, 'type'>
      >
    ) => {
      nodes.set(nodeKey, { ...(getNode() || node), ...updatedNode });
    };

    const deleteNode = () => {
      nodes.delete(nodeKey);
    };

    const getNode = (): TGetNodeByType<TItemFileSystem, T> | null => {
      const node = nodes.get(nodeKey);

      if (!node) {
        return null;
      }

      return node;
    };

    return { nodeKey, updateNode, deleteNode, getNode, createNode };
  };

  const createVirtualNodeFileSystem = <T extends TItemFileSystemType>(
    data: TGetNodeByType<IUpdateFileSystem, T>,
    currentContext: TVirtualModelFileSystem = virtualModelFileSystem
  ) => {
    const { nodeKey, updateNode, getNode, deleteNode, createNode } =
      createNodeFileSystem<T>(data.type);

    const getCurrentContext = (): TVirtualModelFileSystem => {
      return currentContext;
    };

    const getCurrentVirtualNode = () => {
      const node = getCurrentContext().get(nodeKey);

      if (!node) {
        return null;
      }

      return node;
    };

    const deleteCurrentNode = (): void => {
      const currentContext = getCurrentContext();
      const currentVirtualNode = getCurrentVirtualNode();

      if (!currentContext || !currentVirtualNode) {
        return void 0;
      }

      //Удаление узла из хранилища
      deleteNode();

      //Удаление узла из виртуальной модели
      currentContext.delete(nodeKey);

      const deleteNestedNodes = (node: IVirtualNodeModelFileSystem) => {
        if (node.type === folderTypeFileSystem) {
          node.children.forEach(node => {
            deleteNestedNodes(node);
          });
        }
        node.deleteCurrentNode();
      };

      //Удаление вложенных узлов
      deleteNestedNodes(currentVirtualNode);
    };

    const editCurrentNode = (
      updatedNode: AtLeastOne<
        Omit<TGetNodeByType<IUpdateFileSystem, T>, 'type'>
      >
    ): void => {
      const node = getCurrentVirtualNode();

      if (!node) {
        return void 0;
      }

      updateNode(updatedNode);
    };

    const getNodeData = () => {
      const node = getNode();

      if (!node) {
        return null;
      }

      return mapStrictNodeData(node);
    };

    const appendProperties = getAppendModelNode(data.type, {
      getCurrentVirtualNode,
      createVirtualNodeFileSystem,
    });

    const newNode = {
      id: nodeKey,
      type: data.type,
      deleteCurrentNode,
      editCurrentNode,
      getNodeData,

      ...(appendProperties || {}),
    } as IVirtualNodeModelFileSystem;

    //Создание узла в хранилище
    createNode(data);

    //Создание узла в виртуальной моделе
    getCurrentContext().set(nodeKey, newNode);

    return getCurrentVirtualNode();
  };

  const reset = () => {
    nodes.clear();
    virtualModelFileSystem.clear();
  };

  const generateFileSystemByScheme = (initScheme: TInitSchemeFileSystem) => {
    reset();

    const createNestedNodes = (
      context: TVirtualModelFileSystem,
      children: TInitSchemeFileSystem | undefined
    ) => {
      //Создание корневых узлом и рекурсивное создание вложенных узлом при помощи createNestedNodes метода
      if (Array.isArray(children)) {
        for (const node of children) {
          const currentNode = createVirtualNodeFileSystem(node, context);

          if (!currentNode) {
            continue;
          }

          if (
            currentNode.type === folderTypeFileSystem &&
            node.type === folderTypeFileSystem &&
            node.children
          ) {
            createNestedNodes(currentNode.children, node.children);
          }
        }
      }
    };

    return createNestedNodes(virtualModelFileSystem, initScheme);
  };

  return {
    virtualModelFileSystem: readonly(virtualModelFileSystem),
    generateFileSystemByScheme,
  };
});
