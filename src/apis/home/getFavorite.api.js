import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getFavorite = async () => {
  const response = await authApi.get(API_DOMAINS.HOME_FAVORITE);
  return response.data.data;
};
