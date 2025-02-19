import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getUser = async () => {
  const response = await authApi.post(API_DOMAINS.USER);
  return response.data.data;
};
