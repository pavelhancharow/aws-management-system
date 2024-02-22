import { LoginFormValuesType, PreparedRegisterFormValuesType } from '../../types';
import { CommonLoadingState } from '../utils/common-states';
import { Auth } from '../../models';

export interface AuthState extends CommonLoadingState {
  data: Auth | null;
}

export interface LoginUserPayload {
  data: LoginFormValuesType;
  callback: () => void;
}

export interface CreateUserPayload {
  data: PreparedRegisterFormValuesType;
  callback: () => void;
}