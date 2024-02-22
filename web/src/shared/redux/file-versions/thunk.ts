import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api from '../../api';
import { handleReduxErrors } from '../../helpers';
import { GetFileVersionsPayload } from './types';

export const getFileVersions = createAsyncThunk(
  'file-versions/getFileVersions',
  async ({ fileId }: GetFileVersionsPayload, { rejectWithValue }) => {
    try {
      const { data: fileVersions } = await api.FileVersionsApi.get(fileId);

      return fileVersions;
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);