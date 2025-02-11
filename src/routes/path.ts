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
    }
  },
  board: {
    base: '/board',
    specific: {
      base: ':boardTitle',
      write: 'write',
      post: ':postId',
    },
  },
  home: '/home',
  search: '/search',
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
    base: '/chatlist',
  },
};
