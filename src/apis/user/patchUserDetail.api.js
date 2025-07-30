import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const patchUserDetail = async ({ data }) => {
  const response = await authApi.patch(API_DOMAINS.PATCH_USER, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};
