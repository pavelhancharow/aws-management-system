import { FileVersion } from '../../models';
import { CommonLoadingState } from '../utils/common-states';

export interface FileVersionsState extends CommonLoadingState {
  data: FileVersion[] | null;
}

export interface GetFileVersionsPayload {
  fileId: string;
}