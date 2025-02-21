import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postCreateCardnews = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.ADMIN_CARDNEWS, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};
