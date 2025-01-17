import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const token = localStorage.getItem('token');

const axiosInstance = (url, params, options) => {
  const instance = axios.create({
    // baseURL: url, 로컬에서 프록시 사용으로 배포시, 사용 예정
    // headers: { Authorization: `Bearer ${token}` },
    params: params,
    //그 외
    ...options,
  });
  return instance;
};

export const authApi = axiosInstance(BASE_URL);
