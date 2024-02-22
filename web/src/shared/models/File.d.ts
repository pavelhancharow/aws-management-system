import { AwsError } from './Aws';

export interface FileVersion {
  versionId: string;
  filename: string;
  lastModified: string;
}

export interface File {
  fileId: string;
  filename: string;
  fileType: string;
  versionId: string;
  versions: boolean;
  username: string;
  updatedAt: Date;
}

export interface Files extends AwsError {
  totalCount: number;
  startCount: number;
  endCount: number;
  page: number;
  pages: number;
  items: Array<File>;
}