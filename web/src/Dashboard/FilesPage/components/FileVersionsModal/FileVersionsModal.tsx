import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Modal, TableActionButton, Spinner } from '../../../../shared/components';
import { LoadingStatuses } from '../../../../shared/enums';
import { getFileVersionsSelector } from '../../../../shared/redux/file-versions/selector';
import { fileVersionsActions } from '../../../../shared/redux/file-versions/slice';
import { getFileByIdSelector } from '../../../../shared/redux/files/selector';
import { ReactComponent as DownloadFileIcon } from '../../../../shared/assets/icons/file-download-icon.svg';
import { useAppDispatch } from '../../../../shared/redux/store';
import { FileVersionsBody, FileVersionsItem } from './styles';

interface IFileVersionsModal {
  fileId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (fileId: string, fileVersionId: string) => void;
  isLoading: boolean;
}

const FileVersionsModal = ({ fileId, isOpen, onClose, onDownload, isLoading }: IFileVersionsModal) => {
  const dispatch = useAppDispatch();
  const fileVersions = useSelector(getFileVersionsSelector);
  const file = useSelector(getFileByIdSelector(fileId));

  const isPending = useMemo(() => {
    return fileVersions.loading === LoadingStatuses.Pending
  }, [fileVersions.loading])

  useEffect(() => {
    if (fileId) {
      dispatch(fileVersionsActions.getFileVersions({ fileId }));
    }

    return () => {
      dispatch(fileVersionsActions.clearData());
    }
    // eslint-disable-next-line
  }, [fileId])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={file?.filename ? `${file.filename} - versions` : 'File versions not found'}
    >
      <FileVersionsBody>
      {(isPending || isLoading) && <Spinner isLoading={isPending || isLoading} />}
      {file?.versions && !isPending && !isLoading && fileVersions.data?.map((item, idx) => {
        return (
          <FileVersionsItem key={item.versionId}>
            <span>{idx + 1}.</span>
            <span>{item.filename}</span>
            <span>{item.lastModified}</span>

            <TableActionButton onClick={() => onDownload(fileId!, item.versionId)} title="Download file" disabled={isLoading || isPending}>
              <DownloadFileIcon width={25} height={25} />
            </TableActionButton>
          </FileVersionsItem>
        );
      })}
      </FileVersionsBody>
    </Modal>
  );
};

export default FileVersionsModal;