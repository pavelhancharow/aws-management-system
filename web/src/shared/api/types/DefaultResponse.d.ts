import { AxiosResponse } from 'axios';

interface DefaultResponse<T> extends Promise<AxiosResponse<T>> {}

export default DefaultResponse;
