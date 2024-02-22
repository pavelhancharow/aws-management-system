import { useState, FocusEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingStatuses } from '../../shared/enums';
import { authUserStateSelector } from '../../shared/redux/auth/selector';
import { useAppDispatch } from '../../shared/redux/store';
import { authActions } from '../../shared/redux/auth/slice';
import routes from '../../shared/routes';
import { LoginFormValuesType } from '../../shared/types';
import { LoginForm } from './components';
import { ReactComponent as UserIcon } from '../../shared/assets/icons/user-icon.svg';
import { LoginPageWrapper } from './styles';

const LoginPage = () => {
  const authUserState = useSelector(authUserStateSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [focused, setFocused] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormValuesType>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur'
  });

  const onFocus = (event: FocusEvent<HTMLInputElement>) => setFocused(event.target['id']);
  const onBlur = () => setFocused('');

  const formSubmit = async (data: LoginFormValuesType) => {
    const callback = () => {
      reset();
      navigate(routes.app.basename);
    };

    await dispatch(authActions.loginUser({ data, callback }));
  };

  return (
    <LoginPageWrapper>
      <div className="radius">
        <UserIcon width={90} height={90} />
      </div>

      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        formSubmit={formSubmit}
        errors={errors}
        reset={reset}
        isLoading={authUserState.loading === LoadingStatuses.Pending}
        focused={focused}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </LoginPageWrapper>
  );
};

export default LoginPage;