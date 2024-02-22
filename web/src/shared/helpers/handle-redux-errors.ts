import { AxiosError } from 'axios';
import { ToastTypes } from '../enums';
import { displayToast } from './display-toast';
import handleErrorMessage from './handle-error-message';

export const handleReduxErrors = (error: AxiosError, additionalInfo?: string) => {
  const data = {
    message: (error.response?.data as { message: string })?.message || error.response?.statusText || 'Unknown error'
  };

  if (data.message === 'Something wrong' && error.response?.statusText) {
    data.message = error.response?.statusText;
  }
  
  displayToast({
    text: handleErrorMessage(data.message as string, additionalInfo),
    type: ToastTypes.Error,
  });
  
  return {
    status: error.response?.status || 400,
    ...(error.response?.data || { message:  'Unknown error' })
  }
}