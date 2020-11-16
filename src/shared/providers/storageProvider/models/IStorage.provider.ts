import { FileUpload } from 'graphql-upload';

export default interface IStorageProvider {
  saveFile(data: FileUpload): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
