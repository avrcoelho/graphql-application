import { resolve } from 'path';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`),
});

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface Ilimit {
  fileSize?: number;
  files?: number;
}

interface IUploadConfig {
  driver: 'S3' | 'disk';
  tmpFolder: string;
  uploadFolder: string;
  config: {
    disk: {};
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadFolder: resolve(tmpFolder, 'uploads'),
  config: {
    disk: {},
  },
} as IUploadConfig;
