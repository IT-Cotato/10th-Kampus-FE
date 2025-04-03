export const path = {
  login: '/login',
  signup: {
    base: '/signup',
    terms: 'terms',
    welcome: 'welcome',
    profile: 'profile',
    school: 'school',
    verify: {
      base: 'verify',
      email: 'email',
      file: 'file',
    },
  },
  board: {
    base: '/board',
    specific: {
      base: ':boardId',
      write: 'write',
      post: ':postId',
      report: 'report',
      draft: 'draft',
    },
  },
  home: '/home',
  search: '/search',
  boardGuide: '/boardGuide',
  notificationList: '/notificationList',
  mypage: {
    base: '/my',
    settings: {
      info: 'settings/info',
      verification: 'settings/verification',
      notification: 'settings/notification',
    },
    community: {
      base: 'community',
      scrap: {
        base: 'scrap',
        community: 'community',
        secondhand: 'secondhand',
      },
      article: {
        base: 'article',
        articles: 'articles',
        comments: 'comments',
      },
      secondhand: 'secondhand',
    },
    service: {
      base: 'contactUs',
      faq: 'faq',
      inquiry: 'inquiry',
      inquiryDetails: ':inquiryId',
      writeInquiry: 'write',
      notice: 'notice',
      noticeDetails: ':noticeId',
    },
    block: {
      base: 'block',
      chat: 'chat',
      secondhand: 'secondhand',
    },
    delete: 'leave',
  },
  market: {
    base: '/market',
    writeId: ':writeId',
  },
  chatList: {
    base: '/chat',
    report: 'report',
  },
  admin: {
    base: '/admin',
    login: 'login',
    dashboard: 'dashboard',
    userManagement: 'userManagement',
    signupManagement: {
      base: 'signupManagement',
      studentVertifications: ':verificationRecordId',
    },
    boardManagement: {
      base: 'boardManagement',
      create: 'create',
      boardId: ':boardId',
      edit: 'edit',
    },
    cardnews: {
      base: 'cardnews',
      create: 'create',
      cardnewsId: ':cardnewsId',
      edit: 'edit',
    },
    reportMangement: 'reportMangement',
    statistics: 'statistics',
    notice: {
      base: 'notice',
      create: 'create',
      noticeId: ':noticeId',
      edit: 'edit',
    },
  },
};
