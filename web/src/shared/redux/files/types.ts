import { Files } from '../../models';
import { CommonLoadingState } from '../utils/common-states';

export interface FilesState extends CommonLoadingState {
  data: Files | null;
}

export interface DeleteFilePayload {
  fileId: string;
  callback: () => Promise<void>;
}
export interface UploadFilesPayload {
  data: {
    formData: FormData;
    filename: string;
    queryParams: {
      fileMime: string;
      fileType: string;
    }
  };
  callback: () => Promise<void>;
}

export interface DownloadFilePayload {
  fileId: string;
  fileVersionId?: string;
}

export interface UpdateFilesPayload {
  data: {
    formData: FormData;
    queryParams: {
      fileId: string;
      fileMime: string;
      fileType: string;
    }
  };
  callback: () => Promise<void>;
}