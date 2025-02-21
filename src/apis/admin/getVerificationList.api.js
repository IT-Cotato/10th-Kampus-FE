import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const getVerificationList = async () => {
  const response = await authApi.get(API_DOMAINS.ADMIN_STUDENT_VERIFICATIONS);
  return response.data.data;
};
