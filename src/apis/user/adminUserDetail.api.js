import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getAdminUser = async () => {
  try {
    const response = await authApi.get(API_DOMAINS.ADMIN_USER);
    return response.data.data;
  } catch (err) {
    if (err.response?.status === 403) {
      throw new Error('FORBIDDEN');
    }
    throw err;
  }
};
