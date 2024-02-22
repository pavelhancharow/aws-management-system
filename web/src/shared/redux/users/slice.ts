import { createSlice } from '@reduxjs/toolkit';
import { initialDataState, setFulfilledState, setPendingState, setRejectedState } from '../utils/common-states';
import { createUser, deleteUser, getUsers } from './thunk';
import { UsersState } from './types';

export const initialState: UsersState = initialDataState({ data: null });

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearData: (state) => ({ ...state, data: null }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, setPendingState)
      .addCase(getUsers.fulfilled, setFulfilledState)
      .addCase(getUsers.rejected, setRejectedState)

    builder
      .addCase(deleteUser.pending, setPendingState)
      .addCase(deleteUser.fulfilled, setFulfilledState)
      .addCase(deleteUser.rejected, setRejectedState)

    builder
      .addCase(createUser.pending, setPendingState)
      .addCase(createUser.fulfilled, setFulfilledState)
      .addCase(createUser.rejected, setRejectedState)
  },
});

const usersActions = {
  ...usersSlice.actions,
  createUser,
  deleteUser,
  getUsers
};

const usersKey = usersSlice.name;
const usersReducer = usersSlice.reducer;

export {
  usersActions,
  usersKey,
  usersReducer
}
