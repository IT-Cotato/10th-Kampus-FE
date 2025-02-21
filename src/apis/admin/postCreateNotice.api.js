import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postCreateNotice = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.NOTICE, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};
