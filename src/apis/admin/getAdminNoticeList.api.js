import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const getAdminNoticeList = async () => {
  const response = await authApi.get(API_DOMAINS.ADMIN_NOTICE);
  return response.data.data;
};
