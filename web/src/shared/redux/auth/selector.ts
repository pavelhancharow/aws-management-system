import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const authState = (state: RootState) => state.auth;

export const authUserStateSelector = createSelector(
  authState,
  (authState) => authState,
);

export const authUserSelector = createSelector(
  authUserStateSelector,
  (authState) => authState.data,
);