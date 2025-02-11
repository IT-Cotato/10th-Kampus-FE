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
      write: 'write'
    }
  },
  home: '/home',
  search: '/search',
  mypage: {
    base: '/my',
    settings: {
      info: '/my/settings/info',
      verification: '/my/settings/verification',
      notification: '/my/settings/notification',
    },
    community: {
      scrap: '/my/community/scrap',
      articles: '/my/community/articles',
      secondhand: '/my/community/secondhand',
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
    delete: 'my/leave',
  },
  market: {
    base: '/market',
    writeId: ':writeId',
  },
  chatList: {
    base: '/chatlist',
  },
};
