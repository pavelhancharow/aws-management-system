import routes from '../routes';
import { LoginFormValuesType } from '../types';
import api from './api';
import { AuthResponse } from './types';

const searchValue = routes.auth.basename;

const AuthLoginUrl = routes.auth.login.replace(searchValue, '');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postLogin: async (data: LoginFormValuesType): Promise<AuthResponse> => await api.post(AuthLoginUrl, data),
};