import axios from 'axios';
import { onError, onRequest, onRequestError } from '@/apis/interceptor';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    params: params,
    //그 외
    ...options,
  });
  return instance;
};

export const authApi = axiosInstance(BASE_URL);

// 요청 인터셉터
authApi.interceptors.request.use(onRequest, onRequestError);
// 응답 인터셉터
authApi.interceptors.response.use((error) => onError(error, authApi));
