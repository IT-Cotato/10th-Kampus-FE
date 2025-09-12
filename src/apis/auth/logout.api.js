import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postLogout = async () => {
  const response = await authApi.post(API_DOMAINS.LOGOUT);
  return response.data.data;
};
