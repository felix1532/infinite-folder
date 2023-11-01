import type {
  TFolderFileSystem,
  TPDFFileSystem,
} from '@/stores/fileSystemStore/models/nodeTypes';

export type TInitSchemeFileSystem = Array<TInitSchemeFolder | TInitSchemePdf>;

export interface TInitSchemeFolder {
  readonly name: string;
  readonly isShow: boolean;
  readonly children?: Array<TInitSchemeFolder | TInitSchemePdf>;
  readonly type: TFolderFileSystem;
}

interface TInitSchemePdf {
  readonly name: string;
  readonly value: string;
  readonly extension: 'pdf';
  readonly type: TPDFFileSystem;
}
