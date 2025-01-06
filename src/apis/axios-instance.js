import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';
const token = localStorage.getItem('token');

const axiosInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    //그 외
    ...options,
  });
  return instance;
};

export const authApi = axiosInstance(BASE_URL);
