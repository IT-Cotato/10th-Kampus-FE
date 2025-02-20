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
  CHATROOM_DETAIL: '/chats/chatrooms/:chatroomId',

  BOARD_PUBLIC: '/boards/public',
  BOARD_FAVORITE_TOGGLE: '/boards/favorite/:boardId',
  BOARD_UNIV: '/boards/university',
  BOARD_DETAIL: '/boards/:boardId',
  BOARD_FAVORITE: '/boards/favorite',

  POST_CREATE: '/posts',
  POST_HANDLE: '/posts/:postId',
  POST_GET_LIST: '/posts/boards/:boardId',
  POST_WRITE: '/posts',
  POST_SCRAP_TOGGLE: '/posts/:postId/scrap',
  POST_LIKE_TOGGLE: '/posts/:postId/likes',
  POST_GET_CARDNEWS: '/posts/cardNews',

  COMMENT_HANDLE: '/posts/:postId/comments',
  COMMENT_DELETE: '/comments/:commentId',
  COMMENT_LIKE_TOGGLE: '/comments/:commentId/like',

  TRANSLATE_CREATE_POST: '/translations/posts',
  TRANSLATE_POST: '/translations/:postId',
  TRANSLATE_TEXT: '/translations/texts',


  ADMIN_BOARD: '/admin/boards',
  ADMIN_BOARD_DETAIL: '/admin/boards/:boardId',
  ADMIN_ACTIVE_BOARD: '/admin/boards/:boardId/active',
  ADMIN_INACTIVE_BOARD: '/admin/boards/:boardId/inactive',

  NOTICE: '/notices',
  ADMIN_NOTICE_DETAILS: '/notices/:noticeId',
};

export const QUERY_KEYS = {
  POST_LOGIN: 'login',
  GET_KAKAO_LOGIN: 'kakaoLogin',
  GET_USER_ME: 'me',
  GET_CHAT_LIST: 'getChatList',
  POST_CHAT_ROOM: 'postChatroom',
  GET_CHAT_ROOM: 'getChatroom',
  POST_CHAT_READ: 'postChatRead',
  GET_PUBLIC_BOARD_LIST: 'publicBoard',
  GET_BOARD_DETAIL: 'boardData',
  GET_POST_DETAIL: 'postData',
  GET_POST_LIST: 'postList',

  GET_COMMENT_LIST: 'commentList',
  GET_TRANSLATE_POST: 'postTranslated',
  GET_TRANSLATE_POST_LIST: 'postTranslatedList',
  GET_TRANSLATE_TEXT: 'textTranslated',
  
  GET_BOARD_LIST: 'status',
  GET_BOARD: 'boardId',
  POST_NOTICE: 'postNotice',
  GET_NOTICE: 'getNotice',
  NOTICE_DETAIL: 'noticeId',
};

