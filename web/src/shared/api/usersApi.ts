import queryString from 'query-string';
import { PreparedRegisterFormValuesType } from '../types';
import api from './api';
import { AuthResponse } from './types';
import { UsersResponse } from './types/UsersApi';

const UsersUrl = '/users';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: async (query: any): Promise<UsersResponse> => {
    const params = queryString.stringify(query);

    return await api.get(`${UsersUrl}?${params}`)
  },

  delete: async (userId: string) => {
    return await api.delete(`${UsersUrl}?userId=${userId}`);
  },

  post: async (data: PreparedRegisterFormValuesType): Promise<AuthResponse> => await api.post(UsersUrl, data),
};

