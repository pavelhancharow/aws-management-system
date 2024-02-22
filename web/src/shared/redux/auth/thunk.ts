import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api from '../../api';
import { ToastTypes } from '../../enums';
import { displayToast, handleAwsError, handleReduxErrors } from '../../helpers';
import { RootState } from '../store';
import { LoginUserPayload } from './types';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ data, callback }: LoginUserPayload, { rejectWithValue, getState }) => {
    try {
      const { data: auth } = await api.AuthApi.postLogin(data);

      if (auth.errorType) {
        const state = getState() as RootState;

        return handleAwsError(auth, state.auth.data);
      }

      if (auth.access_token) {
        const {message, ...auth_data} = auth;

        localStorage.setItem('auth_user', JSON.stringify({ ...auth_data }));
      }

      displayToast({
        text: auth.message,
        type: ToastTypes.Success,
      });

      if (callback && auth.message === 'Authorization successful') {
        callback();
      }

      return auth;
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);