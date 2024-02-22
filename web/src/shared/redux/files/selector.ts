import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const filesState = (state: RootState) => state.files;

export const getFilesStateSelector = createSelector(
  filesState,
  (filesState) => filesState,
);

export const getFileByIdSelector = (fileId: string | null) => createSelector(
  filesState,
  (filesState) => {
    if (!fileId) return null;

    return filesState.data?.items.find((file) => file.fileId === fileId) || null;
  },
);