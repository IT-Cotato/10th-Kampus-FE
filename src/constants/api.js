export const ACCESS_TOKEN_KEY = 'accessToken';

export const REFRESH_TOKEN_KEY = 'refreshToken';

export const REFRESH_TOKEN_DURATION = 24;

export const KAKAO_AUTH_API_URL = 'https://kauth.kakao.com/oauth/authorize';

export const API_DOMAINS = {
  USER: '/users/details',
  PATCH_USER: '/users/info',
  MYPAGE: '/mypage',
  POST_ACCESS_TOKEN: '/auth/reissue',

  GET_MY_POSTS: '/posts/my',
  GET_MY_COMMENTED_POST: '/my/commented-post',
  GET_MY_MARKETS: '/products/my',
  GET_MY_SCRAPED_POST: '/posts/my/scrap',

  POST_INQUIRY: '/support/inquiry',

  DUPLICATE_CHECK: '/users/check-nickname',
  VERIFY_SCHOOL_PHOTO: '/users/verify/document',
  SEND_SCHOOL_EMAIL_CODE: '/cert/email/send',
  VERIFY_SCHOOL_EMAIL_CODE: '/cert/email/verify',
  GET_SCHOOL_STATUS: '/cert/status',

  PRODUCTS: '/products',

  CREATE_CHAT: '/chats/chatrooms',
  READ_MESSAGE: '/chats/:chatroomId/read',
  CHATLIST: '/chats/chatrooms',
  CHAT_MESSAGE: '/chats/:chatroomId/messages',
  CHATROOM_DETAIL: '/chats/chatrooms/:chatroomId',
  CHAT_IMAGE: '/chats/chatrooms/:chatroomId/images',

  BOARD_PUBLIC: '/boards/public',
  BOARD_FAVORITE_TOGGLE: '/boards/favorite/:boardId',
  BOARD_UNIV: '/boards/university',
  BOARD_CATEGORIES: '/boards/:boardId/categories',
  BOARD_DETAIL: '/boards/:boardId',
  BOARD_FAVORITE: '/boards/favorite',

  POST_CREATE: '/posts',
  POST_SAVE_DRAFT: '/posts/draft',
  HANDLE_DRAFT_DETAILS: '/posts/draft/:postDraftId',
  POST_GET_DRAFTS: '/posts/draft',
  DELETE_ALL_DRAFT: '/posts/draft/all',
  DELETE_SELECTED_DRAFT: '/posts/draft/select',
  POST_HANDLE: '/posts/:postId',
  POST_GET_LIST: '/posts/boards/:boardId',
  POST_WRITE: '/posts',
  GET_DRAFT_COUNT: '/posts/draft/count',
  POST_WRITE_DRAFT: '/posts/draft/:postDraftId',
  POST_SCRAP_TOGGLE: '/posts/:postId/scrap',
  POST_LIKE_TOGGLE: '/posts/:postId/likes',
  POST_GET_CARDNEWS: '/posts/cardNews',
  POST_GET_TRENDING: '/posts/trending',

  COMMENT_HANDLE: '/posts/:postId/comments',
  COMMENT_DELETE: '/comments/:commentId',
  COMMENT_LIKE_TOGGLE: '/comments/:commentId/like',

  TRANSLATE_CREATE_POST: '/translations/posts',
  TRANSLATE_POST: '/translations/posts/:postId',
  TRANSLATE_PRODUCT: '/translations/products/:productId',
  TRANSLATE_TEXT: '/translations/texts',

  MARKET_CATEGORIES: '/products/categories',
  MARKET_PRODUCT_LIST: '/products',
  MARKET_POST_PRODUCT: '/products',
  MARKET_HANDLE_PRODUCT: '/products/:productId',
  MARKET_PATCH_PRODUCT_STATUS: '/products/:productId/status',

  ADMIN_CATEGORY: '/categories',
  ADMIN_BOARD: '/admin/boards',
  ADMIN_BOARD_DETAIL: '/admin/boards/:boardId',
  ADMIN_ACTIVE_BOARD: '/admin/boards/:boardId/active',
  ADMIN_INACTIVE_BOARD: '/admin/boards/:boardId/inactive',

  ADMIN_CARDNEWS: '/admin/cardNews',
  ADMIN_CARDNEWS_DETAIL: '/admin/cardNews/:postId',

  HOME_UNIVERSITY: '/boards/university',
  HOME_TRENDING: '/boards/trending',
  HOME_FAVORITE: '/boards/favorite',

  SEARCH_TOTAL: '/posts/search',
  SEARCH_BOARD: '/posts/search/:boardId',
  SEARCH_KEYWORD: '/posts/search/keywords',
  SEARCH_DELETE: '/posts/search/keywords/:keywordId',

  NOTICE: '/notices',
  ADMIN_NOTICE_DETAILS: '/notices/:noticeId',
  INQUIRY: '/support/inquiry',
  GET_INQUIRY_DETAILS: '/support/inquiry/:inquiryId',

  ADMIN_USER: '/admin/users/details',
  ADMIN_STUDENT_VERIFICATIONS: '/admin/student-verifications',
  ADMIN_VERIFICATION_DETAILS:
    '/admin/student-verifications/:verificationRecordId',
  ADMIN_VERIFICATION_REJECT:
    '/admin/student-verifications/:verificationRecordId/reject',
  ADMIN_VERIFICATION_APPROVE:
    '/admin/student-verifications/:verificationRecordId/approve',
};

export const QUERY_KEYS = {
  POST_LOGIN: 'login',
  GET_KAKAO_LOGIN: 'kakaoLogin',
  GET_ADMIN_USER_ME: 'adminUser',
  GET_USER_DETAIL: 'userDetail',
  GET_SCHOOL_EMAIL_CODE_SEND: 'schoolEmailSend',
  GET_SCHOOL_EMAIL_CODE_CONFIRM: 'schoolEmailCode',
  CHAT_LIST: 'chatList',
  POST_CHAT_ROOM: 'postChatroom',
  GET_CHAT_ROOM: 'getChatroom',
  POST_CHAT_READ: 'postChatRead',

  GET_PUBLIC_BOARD_LIST: 'publicBoard',
  GET_UNIV_BOARD: 'univBoard',
  GET_BOARD_DETAIL: 'boardData',
  GET_POST_DETAIL: 'postData',
  GET_POST_LIST: 'postList',
  GET_DRAFT_ID: 'draftId',
  GET_DRAFT: 'draftData',
  GET_DRAFT_LIST: 'draftList',
  GET_DRAFT_COUNT: 'draftCount',

  GET_COMMENT_LIST: 'commentList',
  GET_TRANSLATE_POST: 'postTranslated',
  GET_TRANSLATE_PROUDCT: 'productTranslated',
  GET_TRANSLATE_TEXT: 'textTranslated',

  GET_SEARCH_KEYWORD: 'searchKeyword',
  GET_SEARCH_RESULT: 'searchResult',
  GET_SEARCH_RESULT_BOARD: 'searchBoardResult',

  GET_HOME_UNIVERISTY: 'homeUniversity',
  GET_HOME_TRENDING: 'homeTrend',
  GET_HOME_FAVORITE: 'homeFavorite',
  GET_HOME_CARDNEWS: 'homeCardNews',

  GET_BOARD_LIST: 'status',
  GET_BOARD: 'boardId',
  GET_BOARD_CATEGORIES: 'boardCategories',
  POST_NOTICE: 'postNotice',
  GET_NOTICE: 'getNotice',
  NOTICE_DETAIL: 'noticeId',
  GET_INQUIRY: 'getInquiry',
  GET_INQUIRY_DETAILS: 'getInquiryDetails',

  GET_MY_SCHOOL_VERIFICATION: 'mySchoolVerification',
  MY_POST_LIST: 'myPostList',
  MY_COMMENTED_POST_LIST: 'myCommentedPostList',
  MY_MARKET_LIST: 'myMarketList',
  MY_SCRAPED_POST_LIST: 'scrapedPostList',
  USER_INFO: 'userInfo',

  GET_MARKET_CATEGORIES: 'marketCategories',
  GET_MARKET_PRODUCT_LIST: 'marketProductList',
  POST_MARKET_PRODUCT: 'postMarketProduct',
  GET_MARKET_PRODUCT: 'getMarketProduct',
  PATCH_MARKET_PRODUCT_STATUS: 'patchMarketProductStatus',
  DELETE_MARKET_PRODUCT: 'deleteMarketProduct',

  ADMIN_GET_VERIFICATION_LIST: 'getVerficationList',
  ADMIN_GET_VERIFICATION: 'getVerficationList',
  ADMIN_POST_VERIFICATION: 'postVerficationList',
  ADMIN_GET_CATEGORY: 'getCategory',
};
