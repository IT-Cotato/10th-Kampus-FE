export const ACCESS_TOKEN_KEY = 'accessToken';

export const REFRESH_TOKEN_KEY = 'refreshToken';

export const REFRESH_TOKEN_DURATION = 24;

export const KAKAO_AUTH_API_URL = 'https://kauth.kakao.com/oauth/authorize';

export const API_DOMAINS = {
  USER: '/users/details',
  
  MYPAGE: '/mypage',

  PRODUCTS: '/products',

  CREATE_CHAT: '/chats/post',
  READ_MESSAGE: '/chats/:chatroomId/read',
  CHATLIST: '/chats/chatrooms',
  CHAT_MESSAGE: '/chats/:chatroomId/messages',
  CHATROOM_DETAIL: '/chats/chatrooms/{chatroomId}',
};

export const QUERY_KEYS = {
  POST_LOGIN: 'login',
  GET_KAKAO_LOGIN: 'kakaoLogin',
  GET_USER_ME: 'me',
  GET_CHAT_LIST: 'chatList',
};
