export const path = {
  login: '/login',
  signup: {
    base: '/signup',
    terms: 'terms',
    profile: 'profile',
    school: 'school',
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
      articles: 'articles',
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
