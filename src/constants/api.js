export const ACCESS_TOKEN_KEY = 'accessToken';

export const REFRESH_TOKEN_KEY = 'refreshToken';

export const REFRESH_TOKEN_DURATION = 24;

export const KAKAO_AUTH_API_URL = 'https://kauth.kakao.com/oauth/authorize';

export const API_DOMAINS = {
  USER: '/users/details',
  MYPAGE: '/mypage',

  DUPLICATE_CHECK: '/users/check-nickname',

  PRODUCTS: '/products',

  CREATE_CHAT: '/chats/post',
  READ_MESSAGE: '/chats/:chatroomId/read',
  CHATLIST: '/chats/chatrooms',
  CHAT_MESSAGE: '/chats/:chatroomId/messages',
  CHATROOM_DETAIL: '/chats/chatrooms/{chatroomId}',


  BOARD_PUBLIC: '/boards/public',
  BOARD_FAVORITE_TOGGLE: '/boards/favorite/:boardId',
  BOARD_UNIV: '/boards/university',
  BOARD_DETAIL: '/boards/:boardId',
  BOARD_FAVORITE: '/boards/favorite',

  POST_CREATE: '/posts',
  POST_HANDLE: '/posts/:postId',
  POST_GET_LIST: '/posts/boards/:boardId',
  POST_GET_DETAIL: '/posts/:postId',
  POST_WRITE: '/posts',
  POST_SCRAP_TOGGLE: '/posts/:postId/scrap',

  ADMIN_BOARD: '/admin/boards',
  ADMIN_ACTIVE_BOARD: '/admin/boards/:boardId/active',
  ADMIN_INACTIVE_BOARD: '/admin/boards/:boardId/inactive',
};

export const QUERY_KEYS = {
  POST_LOGIN: 'login',
  GET_KAKAO_LOGIN: 'kakaoLogin',
  GET_USER_ME: 'me',
  GET_CHAT_LIST: 'chatList',
  GET_PUBLIC_BOARD_LIST: 'publicBoard',
  GET_BOARD_DETAIL: 'boardData',
  GET_POST_DETAIL: 'postData',
  GET_POST_LIST: 'postList',
};