import { AxiosResponse } from 'axios';
import getFilename from './get-filename';

export const downloadRetrievedFile = (response: AxiosResponse) => {
  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');

  link.href = url;
  link.download = getFilename(response.headers['content-disposition']);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}