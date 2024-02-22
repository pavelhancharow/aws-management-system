import { createSlice } from '@reduxjs/toolkit';
import { initialDataState, setFulfilledState, setPendingState, setRejectedState } from '../utils/common-states';
import { getFileVersions } from './thunk';
import { FileVersionsState } from './types';

export const initialState: FileVersionsState = initialDataState({ data: null });

const fileVersionsSlice = createSlice({
  name: 'file-versions',
  initialState,
  reducers: {
    clearData: (state) => ({ ...state, data: null }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFileVersions.pending, setPendingState)
      .addCase(getFileVersions.fulfilled, setFulfilledState)
      .addCase(getFileVersions.rejected, setRejectedState)
  },
});

const fileVersionsActions = {
  ...fileVersionsSlice.actions,
  getFileVersions,
};

const fileVersionsKey = fileVersionsSlice.name;
const fileVersionsReducer = fileVersionsSlice.reducer;

export {
  fileVersionsActions,
  fileVersionsKey,
  fileVersionsReducer
}
