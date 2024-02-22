import { createSlice } from '@reduxjs/toolkit';
import { initialDataState, setFulfilledState, setPendingState, setRejectedState } from '../utils/common-states';
import { deleteFile, downloadFile, getFiles, updateFiles, uploadFiles } from './thunk';
import { FilesState } from './types';

export const initialState: FilesState = initialDataState({ data: null });

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    clearData: (state) => ({ ...state, data: null }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.pending, setPendingState)
      .addCase(getFiles.fulfilled, setFulfilledState)
      .addCase(getFiles.rejected, setRejectedState)

    builder
      .addCase(deleteFile.pending, setPendingState)
      .addCase(deleteFile.fulfilled, setFulfilledState)
      .addCase(deleteFile.rejected, setRejectedState)

    builder
      .addCase(uploadFiles.pending, setPendingState)
      .addCase(uploadFiles.fulfilled, setFulfilledState)
      .addCase(uploadFiles.rejected, setRejectedState)

    builder
      .addCase(downloadFile.pending, setPendingState)
      .addCase(downloadFile.fulfilled, setFulfilledState)
      .addCase(downloadFile.rejected, setRejectedState)

    builder
      .addCase(updateFiles.pending, setPendingState)
      .addCase(updateFiles.fulfilled, setFulfilledState)
      .addCase(updateFiles.rejected, setRejectedState)
  },
});

const filesActions = {
  ...filesSlice.actions,
  getFiles,
  deleteFile,
  uploadFiles,
  downloadFile,
  updateFiles
};

const filesKey = filesSlice.name;
const filesReducer = filesSlice.reducer;

export {
  filesActions,
  filesKey,
  filesReducer
}
