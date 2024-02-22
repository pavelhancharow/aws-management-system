import { FocusEventHandler } from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormWatch } from 'react-hook-form';
import { RegisterFormValuesType } from '../../../../shared/types';
import { ReactComponent as EmailOpenIcon } from '../../../../shared/assets/icons/email-open-icon.svg';
import { ReactComponent as EmailIcon } from '../../../../shared/assets/icons/email-icon.svg';
import { ReactComponent as UserPenIcon } from '../../../../shared/assets/icons/user-pen-icon.svg';
import { ReactComponent as UserCheckIcon } from '../../../../shared/assets/icons/user-check-icon.svg';
import { ReactComponent as LockIcon } from '../../../../shared/assets/icons/lock-icon.svg';
import { ReactComponent as LockEnterIcon } from '../../../../shared/assets/icons/lock-enter-icon.svg';
import { ReactComponent as UserQuestionIcon } from '../../../../shared/assets/icons/user-question-icon.svg';
import { FormButtons } from '../../../../shared/ui-components';
import { AddUserFormWrapper } from './styles';

interface IRegisterForm {
  register: UseFormRegister<RegisterFormValuesType>;
  watch: UseFormWatch<RegisterFormValuesType>
  handleSubmit: UseFormHandleSubmit<RegisterFormValuesType>;
  formSubmit: (data: RegisterFormValuesType) => void;
  errors: FieldErrors<RegisterFormValuesType>;
  reset: UseFormReset<RegisterFormValuesType>;
  isLoading: boolean;
  focused: string;
  onFocus: FocusEventHandler<HTMLInputElement>
  onBlur: () => void;
}

const AddUserForm = ({ register, handleSubmit, formSubmit, watch, errors, reset, isLoading, focused, onFocus, onBlur }: IRegisterForm) => {
  return (
    <AddUserFormWrapper onSubmit={handleSubmit(formSubmit)}>
      <div>
        <label
          htmlFor="username"
          className={errors?.username ? 'danger' : ''}
          data-error={errors?.username ? errors.username.message : ''}
        >
          <span>
            {focused === 'username'
              ? <UserPenIcon width={20} height={20} />
              : <UserCheckIcon width={20} height={20} />
            }
          </span>

          <input
            id="username"
            placeholder="Username"
            {...register("username", {
              required: {
                value: true,
                message: 'This field is required'
              },
              onBlur: onBlur,
            })}
            type="text"
            className={errors?.username ? 'danger' : ''}
            disabled={isLoading}
            onFocus={onFocus}
          />
        </label>
      </div>

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
            className={errors?.email ? 'danger' : ''}
            disabled={isLoading}
            onFocus={onFocus}
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="password"
          className={errors?.password ? 'danger' : ''}
          data-error={errors?.password ? errors.password.message : ''}
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
              onBlur: onBlur,
            })}
            type="password"
            className={errors?.password ? 'danger' : ''}
            disabled={isLoading}
            onFocus={onFocus}
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className={errors?.confirmPassword ? 'danger' : ''}
          data-error={errors?.confirmPassword ? errors.confirmPassword.message : ''}
        >
          <span>
            {focused === 'confirmPassword'
              ? <LockEnterIcon width={20} height={20} />
              : <LockIcon width={20} height={20} />
            }
          </span>

          <input
            id="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: 'This field is required'
              },
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return "Your passwords do no match";
                }
              },
              onBlur: onBlur,
            })}
            type="password"
            className={errors?.confirmPassword ? 'danger' : ''}
            disabled={isLoading}
            onFocus={onFocus}
          />
        </label>
      </div>

      <div>
        <label htmlFor="role">
          <span>
            <UserQuestionIcon width={20} height={20} />
          </span>

          <select
            id="role"
            {...register("role", {
              onBlur: onBlur
            })}
            disabled={isLoading}
          >
            <option value="">Please choose a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
      </div>

      <FormButtons>
        <input type="submit" value={"Register"} disabled={isLoading} />
        <input type="reset" value={"Reset"} onClick={() => reset()} disabled={isLoading} />
      </FormButtons>
    </AddUserFormWrapper>
  );
};

export default AddUserForm;