import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getChatList = async (page) =>
  await authApi.get(API_DOMAINS.CHATLIST, {
    params: { page },
  });
