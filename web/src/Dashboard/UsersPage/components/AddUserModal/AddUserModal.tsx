import { FocusEvent, useState } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../shared/redux/store';
import { usersActions } from '../../../../shared/redux/users/slice';
import { RegisterFormValuesType } from '../../../../shared/types';
import AddUserForm from '../AddUserForm/AddUserForm';

interface IAddUserModal {
  onClose: () => void;
  getUsers: () => void;
  isLoading: boolean;
}

const AddUserModal = ({ onClose, getUsers, isLoading }: IAddUserModal) => {
  const dispatch = useAppDispatch();
  const [focused, setFocused] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<RegisterFormValuesType>({
    defaultValues: { email: '', password: '', username: '', confirmPassword: '', role: '' },
    mode: 'onBlur'
  });

  const formSubmit = async ({ confirmPassword, ...data }: RegisterFormValuesType) => {
    const prepareData = { ...data };

    if (prepareData.role === 'null' || !prepareData.role) {
      prepareData.role = 'user';
    }

    const callback = async () => {
      onClose();
      reset();
      await getUsers();
    };

    await dispatch(usersActions.createUser({ data: prepareData, callback }));
  };


  const onFocus = (event: FocusEvent<HTMLInputElement>) => setFocused(event.target['id']);
  const onBlur = () => setFocused('');

  return (
    <AddUserForm
      formSubmit={formSubmit}
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      errors={errors}
      reset={reset}
      isLoading={isLoading}
      focused={focused}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default AddUserModal;