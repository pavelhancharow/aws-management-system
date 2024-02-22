import { AwsError } from './Aws';

export interface Auth extends AwsError {
  message: string;
  access_token?: string;
  userId?: string;
  username?: string;
  role?: string | null;
}