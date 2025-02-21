import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

//채팅방 리스트
export const getChatList = async (page) => {
  const response = await authApi.get(API_DOMAINS.CHATLIST, {
    params: { page },
  });
  return response.data.data;
};
