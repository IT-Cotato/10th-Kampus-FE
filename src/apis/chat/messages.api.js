import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

//채팅 메시지 데이터
export const getChatMessages = async ({ chatRoomId, page }) => {
  const response = await authApi.get(API_DOMAINS.CHAT_MESSAGE, {
    params: { chatRoomId, page },
  });
  return response.data.data;
};
