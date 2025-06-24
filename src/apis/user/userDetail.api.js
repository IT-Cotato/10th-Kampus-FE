import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getUser = async () => {
  const response = await authApi.get(API_DOMAINS.ADMIN_USER);
  return response.data.data;
};
