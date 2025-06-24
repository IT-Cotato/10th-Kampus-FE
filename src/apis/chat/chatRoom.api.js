import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

//채팅방 생성
export const postChatroom = async ({ type, referenceId }) => {
  const response = await authApi.post(
    API_DOMAINS.CREATE_CHAT,
    { referenceId },
    { params: { type } },
  );
  return response.data.data;
};

//채팅방 상세 조회
export const getChatroom = async ({ chatroomId }) => {
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
