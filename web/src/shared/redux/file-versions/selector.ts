import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const fileVersionsState = (state: RootState) => state['file-versions'];

export const getFileVersionsSelector = createSelector(
  fileVersionsState,
  (filesState) => filesState,
);