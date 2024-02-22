import axios, { InternalAxiosRequestConfig } from 'axios';
import { authActions } from '../redux/auth/slice';
import store from '../redux/store';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth?.data?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      store.dispatch(authActions.logout())
    }

    if (response && response.status !== 200) {
      throw error;
    }
  },
)

export default api;
