import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../enums';

export type CommonLoadingState = {
  loading: LoadingStatuses;
  error: { message: string; status: number } | null;
}

export type CommonDataState<T> = CommonLoadingState & {
  data: T | null;
};

type CommonCaseReducer<T> = CaseReducer<CommonDataState<T>, PayloadAction<T>>;

export const setPendingState: CommonCaseReducer<any> = (state, action) => {
  state.loading = LoadingStatuses.Pending;
  state.error = null;
};

export const setFulfilledState: CommonCaseReducer<any> = (state, action) => {
  state.loading = LoadingStatuses.Fulfilled;
  state.error = null;

  if (action.payload) {
    state.data = action.payload;
  }
};

export const setRejectedState: CommonCaseReducer<any> = (state, action) => {
  state.loading = LoadingStatuses.Rejected;
  state.error = action.payload;
};

export const initialDataState = <T>(data: T): T & CommonLoadingState => ({
  loading: LoadingStatuses.Idle,
  error: null,
  ...data
});