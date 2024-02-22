import queryString from 'query-string';
import api from './api';
import { FilesResponse } from './types/FilesApi';

const FilesUrl = '/files';

type QueryParamsType = {
  fileId: string;
  fileMime: string;
  fileType: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: async (query: any): Promise<FilesResponse> => {
    const params = queryString.stringify(query);

    return await api.get(`${FilesUrl}?${params}`)
  },
  delete: async (fileId: string) => await api.delete(`${FilesUrl}?fileId=${fileId}`),
  upload: async (files: FormData, queryParams: Omit<QueryParamsType, 'fileId'>) => {
    const params = queryString.stringify(queryParams);

    return await api.post(`${FilesUrl}?${params}`, files, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  patch: async (files: FormData, queryParams: QueryParamsType) => {
    const params = queryString.stringify(queryParams);

    return await api.patch(`${FilesUrl}?${params}`, files, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  download: async (fileId: string, fileVersionId?: string) => {
    const params = queryString.stringify({ fileId, fileVersionId });

    return await api.get(`${FilesUrl}/download?${params}`, { responseType: 'blob' });
  },
};

