import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const getAdminBoardList = async ({ status }) => {
  const response = await authApi.get(API_DOMAINS.ADMIN_BOARD, {
    params: { status },
  });
  return response.data.data;
};
