import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const getAdminBoardList = async ({ params }) => {
  const response = await authApi.get(API_DOMAINS.ADMIN_BOARD, params);
  return response.data.data;
};
