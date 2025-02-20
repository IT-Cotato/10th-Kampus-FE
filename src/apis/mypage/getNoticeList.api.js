import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const getNoticeList = async () => {
  const response = await authApi.get(API_DOMAINS.NOTICE);
  return response.data.data;
};
