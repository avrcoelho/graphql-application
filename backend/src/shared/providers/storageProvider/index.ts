import uploadConfig from '@config/upload';

import DiskStorageProvider from './implementation/DiskStorage.provider';

const providers = {
  disk: DiskStorageProvider,
};

export default providers[uploadConfig.driver];
