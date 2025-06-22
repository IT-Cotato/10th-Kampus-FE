import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getUnivBoard = async () => {
  const response = await authApi.get(API_DOMAINS.BOARD_UNIV);
  return response.data.data;
};
