import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as AddUserIcon } from '../../shared/assets/icons/user-plus-icon.svg';
import { Modal, Table, TableActionButton } from '../../shared/components';
import { LoadingStatuses, ModalImgTypes } from '../../shared/enums';
import { useFilter } from '../../shared/hooks';
import { User } from '../../shared/models';
import { authUserSelector } from '../../shared/redux/auth/selector';
import { useAppDispatch } from '../../shared/redux/store';
import { getUsersStateSelector } from '../../shared/redux/users/selector';
import { usersActions } from '../../shared/redux/users/slice';
import UsersPageComponents from './components';
import { ReactComponent as DeleteUserIcon } from '../../shared/assets/icons/user-xmark-icon.svg';

const { AddUserModal } = UsersPageComponents;
const columnHelper = createColumnHelper<User & { actions: ReactNode }>();

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const authUser = useSelector(authUserSelector);
  const usersState = useSelector(getUsersStateSelector);
  const [modal, setModal] = useState(false);

  const getUsersCallback = async (filterData: any) => {
    await dispatch(usersActions.getUsers(filterData));
  };

  const { filters, handleChangeFilters, handleChangePagination, handleClearFilters } = useFilter(getUsersCallback);

  const isLoading = useMemo(() => usersState.loading === LoadingStatuses.Pending, [usersState.loading]);
  const isAdmin = useMemo(() => authUser?.role === 'admin', [authUser?.role]);

  useEffect(() => {
    return () => {
      dispatch(usersActions.clearData());
    };
    // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    await dispatch(usersActions.getUsers(filters));
  };

  const handleRemoveUser = async (userId: string) => {
    if (userId) {
      await dispatch(usersActions.deleteUser({ userId, callback: getUsers }))
    }
  };

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  return (
    <>
      <Table
        data={usersState.data?.items || []}
        emptyDataMessage="No users found"
        filters={filters}
        isLoading={isLoading}
        onChangeFilters={handleChangeFilters}
        onChangePagination={handleChangePagination}
        onClearFilters={handleClearFilters}
        pagination={{
          totalCount: usersState.data?.totalCount || 0,
          startCount: usersState.data?.startCount || 0,
          endCount: usersState.data?.endCount || 0,
          page: usersState.data?.page || 1,
          pages: usersState.data?.pages || 1,
        }}
        renderButtons={
          isAdmin && (
            <button onClick={handleOpenModal} disabled={isLoading}>
              <AddUserIcon width={20} height={20} />
              Add User
            </button>
          )
        }
        columns={[
          columnHelper.accessor('userId', {
            header: () => 'ID',
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor('username', {
            header: () => 'Username',
            cell: (info) => info.getValue(),
            meta: {
              sortable: true,
              filterable: true
            }
          }),
          columnHelper.accessor('email', {
            header: () => 'E-mail',
            cell: (info) => info.getValue(),
            meta: {
              sortable: true,
              filterable: true
            }
          }),
          columnHelper.accessor('role', {
            header: () => 'Role',
            cell: (info) => info.getValue(),
            meta: {
              sortable: true,
              filterable: true
            }
          }),
          columnHelper.accessor('createdAt', {
            header: () => 'Register Date',
            cell: (info) => info.getValue(),
            meta: {
              sortable: true,
            }
          }),
          ...(isAdmin
             ? [
                columnHelper.accessor('actions', {
                  header: () => 'Actions',
                  cell: (info) => {
                    const userId = info.row.original.userId;

                    return authUser?.userId !== userId && (
                      <TableActionButton onClick={() => handleRemoveUser(userId)} title={'Delete user'} disabled={isLoading}>
                        <DeleteUserIcon width={25} height={25} />
                      </TableActionButton>
                    );
                  },
                })
              ]
            : []
          )
        ] as Array<ColumnDef<User>>}
      />

      <Modal isOpen={modal} onClose={handleCloseModal} title="Create User Account" image={ModalImgTypes.Register}>
        <AddUserModal
          onClose={handleCloseModal}
          isLoading={isLoading}
          getUsers={getUsers}
        />
      </Modal>
    </>
  )
};

export default UsersPage;