import { combineReducers } from '@reduxjs/toolkit';
import { authKey, authReducer } from './auth/slice';
import { fileVersionsKey, fileVersionsReducer } from './file-versions/slice';
import { filesKey, filesReducer } from './files/slice';
import { usersKey, usersReducer } from './users/slice';

const rootReducer = combineReducers({
  [authKey]: authReducer,
  [filesKey]: filesReducer,
  [fileVersionsKey]: fileVersionsReducer,
  [usersKey]: usersReducer,
});

export default rootReducer;