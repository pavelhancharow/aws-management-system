import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React, { MouseEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as AddFileIcon } from '../../shared/assets/icons/file-plus-icon.svg';
import { Modal, Table, TableActionButton } from '../../shared/components';
import { LoadingStatuses, ModalImgTypes } from '../../shared/enums';
import { useFilter } from '../../shared/hooks';
import { File } from '../../shared/models';
import { authUserSelector } from '../../shared/redux/auth/selector';
import { getFilesStateSelector } from '../../shared/redux/files/selector';
import { filesActions } from '../../shared/redux/files/slice';
import { useAppDispatch } from '../../shared/redux/store';
import { ReactComponent as DeleteFileIcon } from '../../shared/assets/icons/trash-icon.svg';
import { ReactComponent as DownloadFileIcon } from '../../shared/assets/icons/file-download-icon.svg';
import { ReactComponent as FilesListIcon } from '../../shared/assets/icons/list-icon.svg';
import { ReactComponent as UpdateFileIcon } from '../../shared/assets/icons/file-update-icon.svg';
import FilesPageComponents from './components';

const { AddUpdateFileModal, FileVersionsModal } = FilesPageComponents;
const columnHelper = createColumnHelper<File & { actions: ReactNode, versions: boolean }>();

const FilesPage = () => {
  const dispatch = useAppDispatch();
  const authUser = useSelector(authUserSelector);
  const filesState = useSelector(getFilesStateSelector);
  const [modal, setModal] = useState<{open: boolean | string, fileId: string | null}>({ open: false, fileId: null });

  const getFilesCallback = async (filterData: any) => {
    await dispatch(filesActions.getFiles(filterData));
  };

  const { filters, handleChangeFilters, handleChangePagination, handleClearFilters } = useFilter(getFilesCallback);

  const isLoading = useMemo(() => filesState.loading === LoadingStatuses.Pending, [filesState.loading]);
  const isAdmin = useMemo(() => authUser?.role === 'admin', [authUser?.role]);

  useEffect(() => {
    return () => {
      dispatch(filesActions.clearData());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filesState.error?.status === 404) {
      dispatch(filesActions.clearData());
    }
    // eslint-disable-next-line
  }, [filesState.error]);

  const getFiles = async () => {
    await dispatch(filesActions.getFiles(filters));
  };

  const handleDeleteFile = async (fileId: string) => {
    if (fileId) {
      await dispatch(filesActions.deleteFile({ fileId, callback: getFiles }))
    }
  };

  const handleDownloadFile = async (fileId: string, fileVersionId?: string) => {
    if (fileId) {
      await dispatch(filesActions.downloadFile({ fileId, fileVersionId }))
    }
  };

  const handleUploadFile = async (fileId: string | MouseEvent<HTMLButtonElement>) => {
    const value = typeof fileId === 'string' ? fileId : null;

    handleOpenModal(value);
  };

  const handleFileVersions = async (fileId: string) => {
    setModal({ open: 'list', fileId })
  };

  const handleOpenModal = (fileId: string | null) => setModal({ open: 'upload', fileId });
  const handleCloseModal = () => setModal({ open: false, fileId: null });

  return (
    <>
      <Table
        data={filesState.data?.items || []}
        isLoading={isLoading}
        emptyDataMessage="No files found"
        filters={filters}
        onChangeFilters={handleChangeFilters}
        onChangePagination={handleChangePagination}
        onClearFilters={handleClearFilters}
        pagination={{
          totalCount: filesState.data?.totalCount || 0,
          startCount: filesState.data?.startCount || 0,
          endCount: filesState.data?.endCount || 0,
          page: filesState.data?.page || 1,
          pages: filesState.data?.pages || 1,
        }}
        renderButtons={
          isAdmin && (
            <button onClick={handleUploadFile} disabled={isLoading}>
              <AddFileIcon width={20} height={20} />
              Add File
            </button>
          )
        }
        columns={[
          ...(isAdmin
              ? [
                columnHelper.accessor('fileId', {
                  header: () => 'ID',
                  cell: (info) => info.getValue(),
                }),
              ]
              : []
          ),
          columnHelper.accessor('versionId', {
            header: () => 'File version',
            cell: info => info.getValue(),
          }),
          columnHelper.accessor('filename', {
            header: () => 'File name',
            cell: info => info.getValue(),
            meta: {
              sortable: true,
              filterable: true
            }
          }),
          columnHelper.accessor('fileType', {
            header: () => 'File type',
            cell: info => info.getValue(),
            meta: {
              sortable: true,
              filterable: true
            }
          }),
          columnHelper.accessor('updatedAt', {
            header: () => 'Last modified',
            cell: (info) => info.getValue(),
            meta: {
              sortable: true
            }
          }),
          columnHelper.accessor('username', {
            header: () => 'Author',
            cell: info => info.getValue(),
            meta: {
              sortable: true,
              filterable: true
            }
          }),
          columnHelper.accessor('actions', {
            header: () => 'Actions',
            cell: (info) => {
              const fileId = info.row.original.fileId;

              return (
                <>
                  <TableActionButton onClick={() => handleDownloadFile(fileId)} title="Download file" disabled={isLoading}>
                    <DownloadFileIcon width={25} height={25} />
                  </TableActionButton>

                  {isAdmin && (
                    <>
                      <TableActionButton
                        onClick={() => handleUploadFile(fileId)}
                        title="Update file"
                        disabled={isLoading}
                      >
                        <UpdateFileIcon width={25} height={25} />
                      </TableActionButton>
                      <TableActionButton
                        onClick={() => handleDeleteFile(fileId)}
                        title="Delete file"
                        disabled={isLoading}
                      >
                        <DeleteFileIcon width={25} height={25} />
                      </TableActionButton>
                    </>
                  )}

                  {!!info.row.original?.versions && (
                    <TableActionButton onClick={() => handleFileVersions(fileId)} title="File versions" disabled={isLoading}>
                      <FilesListIcon width={25} height={25} />
                    </TableActionButton>
                  )}
                </>
              );
            },
          }),
        ] as Array<ColumnDef<File>>}
      />

      <Modal
        isOpen={modal.open === 'upload'}
        onClose={handleCloseModal}
        title={modal.fileId ? ModalImgTypes.UpdateFile : ModalImgTypes.UploadFile}
        image={modal.fileId ? ModalImgTypes.UpdateFile : ModalImgTypes.UploadFile}
      >
        <AddUpdateFileModal
          onClose={handleCloseModal}
          isLoading={isLoading}
          fileId={modal.fileId}
          getFiles={getFiles}
        />
      </Modal>

      <FileVersionsModal
        isOpen={modal.open === 'list'}
        fileId={modal.fileId || null}
        onClose={handleCloseModal}
        onDownload={handleDownloadFile}
        isLoading={isLoading}
      />
    </>
  )
}

export default FilesPage;