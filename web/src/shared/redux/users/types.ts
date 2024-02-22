import { CommonLoadingState } from '../utils/common-states';
import { Users } from '../../models';

export interface UsersState extends CommonLoadingState {
  data: Users | null;
}

export interface DeleteUserPayload {
  userId: string;
  callback: () => void;
}