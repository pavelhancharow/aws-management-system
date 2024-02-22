import { createSlice } from '@reduxjs/toolkit';
import { initialDataState, setFulfilledState, setPendingState, setRejectedState } from '../utils/common-states';
import { loginUser } from './thunk';
import { AuthState } from './types';

export const initialState: AuthState = initialDataState({ data: null });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.data = action.payload
    },
    logout: () => {
      localStorage.removeItem('auth_user');
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, setPendingState)
      .addCase(loginUser.fulfilled, setFulfilledState)
      .addCase(loginUser.rejected, setRejectedState)
  },
});

const authActions = {
  ...authSlice.actions,
  loginUser
};

const authKey = authSlice.name;
const authReducer = authSlice.reducer;

export {
  authActions,
  authKey,
  authReducer
}
