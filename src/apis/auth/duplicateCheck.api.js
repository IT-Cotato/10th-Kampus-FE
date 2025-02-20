import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const postDuplicateCheck = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.DUPLICATE_CHECK, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};
