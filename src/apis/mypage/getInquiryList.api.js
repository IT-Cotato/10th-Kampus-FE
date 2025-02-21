import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const getInquiryList = async () => {
  const response = await authApi.get(API_DOMAINS.INQUIRY);
  return response.data.data;
};
