import type {
  IFolderFileSystem,
  IPdfFileSystem,
  TItemFileSystem,
} from '@/stores/fileSystemStore/models/nodeData';

export type IFolderFileSystemComponent = Readonly<
  Pick<IFolderFileSystem, 'isShow' | 'name' | 'type'>
>;

const mapStoreFolderDataToComponentData = (
  node: IFolderFileSystem
): IFolderFileSystemComponent => {
  return {
    name: node.name,
    isShow: node.isShow,
    type: node.type,
  };
};

export type IPdfFileSystemComponent = Readonly<IPdfFileSystem>;

const mapStorePdfDataToComponentData = (
  node: IPdfFileSystem
): IPdfFileSystemComponent => {
  return node;
};

export type INodeDataFileSystemComponent =
  | IFolderFileSystemComponent
  | IPdfFileSystemComponent;

export const mapStrictNodeData = (
  node: TItemFileSystem
): INodeDataFileSystemComponent => {
  switch (node.type) {
    case 'folder':
      return mapStoreFolderDataToComponentData(node);
    case 'pdf':
      return mapStorePdfDataToComponentData(node);
  }
};
