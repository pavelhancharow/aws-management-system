import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api from '../../api';
import { ToastTypes } from '../../enums';
import { displayToast, handleAwsError, handleReduxErrors } from '../../helpers';
import { CreateUserPayload } from '../auth/types';
import { RootState } from '../store';
import { DeleteUserPayload } from './types';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (data: any, { rejectWithValue, getState }) => {
    try {
      const { data: users } = await api.UsersApi.get(data);

      if (users?.errorType) {
        const state = getState() as RootState;

        return handleAwsError(users, state.users.data);
      }

      return users;
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ userId, callback }: DeleteUserPayload, { rejectWithValue, getState }) => {
    try {
      const { data: user } = await api.UsersApi.delete(userId);

      const state = getState() as RootState;
      const userData = state.users.data?.items.find((user) => user.userId === userId)

      displayToast({
        text: `User ${userData ? userData.username : ''} is deleted`,
        type: ToastTypes.Info,
      });

      if (callback) {
        await callback();
      }

      return user;
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ data, callback }: CreateUserPayload, { rejectWithValue, getState }) => {
    try {
      const { data: user } = await api.UsersApi.post(data);

      if (user.errorType) {
        const state = getState() as RootState;

        return handleAwsError(user, state.auth.data);
      }

      displayToast({
        text: user.message,
        type: ToastTypes.Success,
      });

      if (callback && user.message === 'User is successfully created') {
        callback();
      }
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError, data.email));
    }
  },
);