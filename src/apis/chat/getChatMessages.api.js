import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getChatMessages = async ({ chatroomId, page }) =>
  await authApi.get(API_DOMAINS.CHATMESSAGE, {
    params: { chatroomId, page },
  });
