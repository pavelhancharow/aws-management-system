import { AwsError } from './Aws';

export interface User {
  userId: string;
  email: string;
  username: string;
  role: string | null;
  createdAt: Date,
  updatedAt: Date
}

export interface Users extends AwsError {
  totalCount: number;
  startCount: number;
  endCount: number;
  page: number;
  pages: number;
  items: Array<User>;
}