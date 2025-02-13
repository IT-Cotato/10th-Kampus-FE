import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getChatMessages = async ({ chatRoomId, page }) =>
  await authApi.get(API_DOMAINS.CHATMESSAGE, {
    params: { chatRoomId, page },
  });
