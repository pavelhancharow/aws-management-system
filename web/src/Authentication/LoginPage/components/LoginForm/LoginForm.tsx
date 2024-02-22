import { FocusEventHandler } from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
import { LoginFormValuesType } from '../../../../shared/types';
import { ReactComponent as EmailIcon } from '../../../../shared/assets/icons/email-icon.svg';
import { ReactComponent as EmailOpenIcon } from '../../../../shared/assets/icons/email-open-icon.svg';
import { ReactComponent as LockIcon } from '../../../../shared/assets/icons/lock-icon.svg';
import { ReactComponent as LockEnterIcon } from '../../../../shared/assets/icons/lock-enter-icon.svg';
import { LoginFormSubmit, LoginFormWrapper } from './styles';

interface ILoginForm {
  register: UseFormRegister<LoginFormValuesType>;
  handleSubmit: UseFormHandleSubmit<LoginFormValuesType>;
  formSubmit: (data: LoginFormValuesType) => void;
  errors: FieldErrors<LoginFormValuesType>;
  reset: UseFormReset<LoginFormValuesType>;
  isLoading: boolean;
  focused: string;
  onFocus: FocusEventHandler<HTMLInputElement>
  onBlur: () => void;
}

const LoginForm = ({ register, handleSubmit, formSubmit, errors, reset, isLoading, focused, onBlur, onFocus }: ILoginForm) => {
  return (
    <>
      <LoginFormWrapper id="login-form" onSubmit={handleSubmit(formSubmit)}>
        <div>
          <label
            htmlFor="email"
            className={errors?.email ? 'danger' : ''}
            data-error={errors?.email ? errors.email.message : ''}
          >
          <span>
            {focused === 'email'
              ? <EmailOpenIcon width={20} height={20} />
              : <EmailIcon width={20} height={20} />
            }
          </span>

            <input
              id="email"
              placeholder="Email"
              {...register("email", {
                required: {
                  value: true,
                  message: 'This field is required'
                },
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
                onBlur: onBlur,
              })}
              type="email"
              disabled={isLoading}
              onFocus={onFocus}
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="password"
            className={errors?.password ? 'danger' : ''}
            data-error={errors.password ? errors.password.message : ''}
          >
          <span>
            {focused === 'password'
              ? <LockEnterIcon width={20} height={20} />
              : <LockIcon width={20} height={20} />
            }
          </span>

            <input
              id="password"
              placeholder="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: 'This field is required'
                },
                minLength: {
                  value: 4,
                  message: 'Minimum password length = 4'
                },
                onBlur: onBlur
              })}
              type="password"
              disabled={isLoading}
              onFocus={onFocus}
            />
          </label>
        </div>
        <input type="reset" value={"Reset form?"} onClick={() => reset()} disabled={isLoading} />
      </LoginFormWrapper>

      <LoginFormSubmit type="submit" form="login-form" value={"Login"} disabled={isLoading} />
    </>
  );
};

export default LoginForm;