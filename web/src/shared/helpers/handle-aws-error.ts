import { ToastTypes } from '../enums';
import { AwsError } from '../models';
import { displayToast } from './display-toast';

export const handleAwsError = (error: AwsError, state: any) => {
  displayToast({
    text: `${error.errorType}: ${error.errorMessage}`,
    type: ToastTypes.Warning,
  });

  return state;
}