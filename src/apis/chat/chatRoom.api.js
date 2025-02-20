import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

//채팅방 생성
export const postChat = async ({ postId }) => {
  const response = await authApi.post(API_DOMAINS.CREATE_CHAT, {
    postId,
  });
  return response.data.data;
};

//채팅방 상세 조회
export const getChatRoom = async ({ chatroomId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.CHATROOM_DETAIL, { chatroomId }),
  );
  return response.data.data;
};

//채팅방 삭제
export const deleteChatroom = async ({ chatroomId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.CHATROOM_DETAIL, { chatroomId }),
  );
  return response.data.data;
};
