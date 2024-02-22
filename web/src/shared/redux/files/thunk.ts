import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api from '../../api';
import { ToastTypes } from '../../enums';
import { displayToast, handleAwsError, handleReduxErrors } from '../../helpers';
import { downloadRetrievedFile } from '../../helpers';
import { RootState } from '../store';
import { DeleteFilePayload, DownloadFilePayload, UpdateFilesPayload, UploadFilesPayload } from './types';

export const getFiles = createAsyncThunk(
  'files/getFiles',
  async (data: any, { rejectWithValue, getState }) => {
    try {
      const { data: files } = await api.FilesApi.get(data);

      if (files.errorType) {
        const state = getState() as RootState;

        return handleAwsError(files, state.files.data);
      }

      return files;
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);

export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async ({ fileId, callback }: DeleteFilePayload, { rejectWithValue, getState }) => {
    try {
      const { data: file } = await api.FilesApi.delete(fileId);

      const state = getState() as RootState;
      const fileData = state.files.data?.items.find((file) => file.fileId === fileId)

      displayToast({
        text: `File ${fileData ? fileData.filename : ''} is deleted`,
        type: ToastTypes.Info,
      });

      if (callback) {
        await callback();
      }

      return file;
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);

export const uploadFiles = createAsyncThunk(
  'files/uploadFiles',
  async ({ data, callback }: UploadFilesPayload, { rejectWithValue }) => {
    try {
      const {formData, filename, queryParams} = data;

      await api.FilesApi.upload(formData, queryParams);

      displayToast({
        text: `The specified file ${filename} was uploaded`,
        type: ToastTypes.Info,
      });

      if (callback) {
        await callback();
      }
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);

export const downloadFile = createAsyncThunk(
  'files/downloadFile',
  async ({ fileId, fileVersionId }: DownloadFilePayload, { rejectWithValue, getState }) => {
    try {
      const response = await api.FilesApi.download(fileId, fileVersionId);

      const state = getState() as RootState;

      if (response.data.errorType) {
        return handleAwsError(response.data, state.files.data);
      }

      downloadRetrievedFile(response)

      displayToast({
        text: 'File is downloaded',
        type: ToastTypes.Info,
      });
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);

export const updateFiles = createAsyncThunk(
  'files/updateFiles',
  async ({ data, callback }: UpdateFilesPayload, { rejectWithValue }) => {
    try {
      const { formData, queryParams } = data;
      const { data: file } = await api.FilesApi.patch(formData, queryParams);

      displayToast({
        text: file.message,
        type: ToastTypes.Info,
      });

      if (callback) {
        await callback();
      }
    } catch (error) {
      return rejectWithValue(handleReduxErrors(error as AxiosError));
    }
  },
);
