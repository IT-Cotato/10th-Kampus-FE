import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getDraftCount = async () => {
  const response = await authApi.get(API_DOMAINS.GET_DRAFT_COUNT);
  return response.data.data;
};
