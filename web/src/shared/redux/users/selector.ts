import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const usersState = (state: RootState) => state.users;

export const getUsersStateSelector = createSelector(
  usersState,
  (usersState) => usersState,
);