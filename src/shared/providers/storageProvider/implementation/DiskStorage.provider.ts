import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import { createWriteStream, promises } from 'fs';
import { resolve } from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorage.provider';

@Injectable()
class DiskStorageProvider implements IStorageProvider {
  public async saveFile({
    createReadStream,
    filename,
  }: FileUpload): Promise<string> {
    await new Promise(async (resolved, rejected) =>
      createReadStream().pipe(
        createWriteStream(resolve(uploadConfig.uploadFolder, filename))
          .on('finish', () => resolved(true))
          .on('error', () => rejected(false)),
      ),
    );

    return filename;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadFolder, file);

    // verifica se o aqrquivo existe
    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
