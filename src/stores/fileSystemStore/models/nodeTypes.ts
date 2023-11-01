export const folderTypeFileSystem = 'folder';
export const pdfTypeFileSystem = 'pdf';

export type TFolderFileSystem = typeof folderTypeFileSystem;
export type TPDFFileSystem = typeof pdfTypeFileSystem;

// Типы файлов в файловой системе
export type TItemFileSystemType = TFolderFileSystem | TPDFFileSystem;
