import api from './api';
import { FilesResponse } from './types/FilesApi';

const FileVersionsUrl = '/file-versions';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: async (fileId: string): Promise<FilesResponse> => {
    return await api.get(`${FileVersionsUrl}?fileId=${fileId}`)
  },
};

