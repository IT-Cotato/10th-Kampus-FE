import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

//채팅방 생성
export const postChat = async ({ postId }) => {
  const response = await authApi.post(API_DOMAINS.CREATE_CHAT, {
    params: { postId },
  });
  return response.data.data;
};

//채팅방 상세 조회
export const getChatRoom = async ({ chatRoomId }) => {
  const response = await authApi.get(API_DOMAINS.CHATROOM_DETAIL, {
    params: { chatRoomId },
  });
  return response.data.data;
};
