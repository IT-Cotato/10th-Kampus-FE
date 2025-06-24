import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

//채팅 메시지 데이터
export const getChatMessages = async ({ chatroomId, page }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.CHAT_MESSAGE, { chatroomId }),
    { params: { page } },
  );
  return response.data.data;
};

//채팅 읽음 처리
export const postReadMessage = async ({ chatroomId }) => {
  const response = await authApi.post(
    generateApiPath(API_DOMAINS.READ_MESSAGE, { chatroomId }),
  );
  return response.data.data;
};

//채팅 이미지 전송
export const postChatImage = async ({ chatroomId, images }) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await authApi.post(
    generateApiPath(API_DOMAINS.CHAT_IMAGE, { chatroomId }),
    formData,
    {
      'Content-Type': 'multipart/form-data',
    },
  );
  return response.data.data;
};
