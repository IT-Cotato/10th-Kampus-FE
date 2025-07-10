import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getSchoolStatus = async () => {
  const response = await authApi.get(API_DOMAINS.GET_SCHOOL_STATUS);
  return response.data.data;
};
