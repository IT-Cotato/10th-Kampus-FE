import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

//채팅방 리스트
export const getChatList = async (page, type) => {
  const response = await authApi.get(API_DOMAINS.CHATLIST, {
    params: { page, type },
  });
  return response.data.data;
};
