import { toast, ToastOptions } from 'react-toastify';
import { ToastTypes } from '../enums';

type displayToastDataType = {
  text: string;
  type: ToastTypes;
}

export const ToastOptionsData: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 3000,
  closeOnClick: false,
};

export const displayToast = ({
  text = '',
  type = ToastTypes.Info,
}: displayToastDataType, options: ToastOptions = ToastOptionsData) => {
  switch (type) {
    case ToastTypes.Error:
      toast.error(<span>{text}</span>, options);
      break;
    case ToastTypes.Success:
      toast.success(<span>{text}</span>, options);
      break;
    case ToastTypes.Warning:
      toast.warn(<span>{text}</span>, options);
      break;
    default:
      toast.info(<span>{text}</span>, options);
      break;
  }
};
