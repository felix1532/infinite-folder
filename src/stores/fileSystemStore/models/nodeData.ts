import type {
  TFolderFileSystem,
  TPDFFileSystem,
} from '@/stores/fileSystemStore/models/nodeTypes';

export interface IFolderFileSystem {
  name: string;
  isShow: boolean;
  readonly type: TFolderFileSystem;
}

export interface IPdfFileSystem {
  name: string;
  value: string;
  extension: 'pdf';
  readonly type: TPDFFileSystem;
}

// Типы узлов находящихся в хранилище
export type TItemFileSystem = IFolderFileSystem | IPdfFileSystem;

//Типы используемые при обновлении узлов
export type IUpdateFolderFileSystem = Pick<
  IFolderFileSystem,
  'isShow' | 'name' | 'type'
>;

export type IUpdatePdfFileSystem = Pick<
  IPdfFileSystem,
  'value' | 'name' | 'type'
>;

export type IUpdateFileSystem = IUpdateFolderFileSystem | IUpdatePdfFileSystem;

export type TGetNodeByType<
  T extends { type: string },
  K extends T['type'],
> = T extends {
  type: K;
}
  ? T
  : never;
