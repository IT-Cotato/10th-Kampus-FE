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
      base: '/my/contactUs',
      faq: 'faq',
      inquiry: 'inquiry',
      inquiryDetails: ':inquiryId',
      writeInquiry: 'write',
      notice: 'notice',
    },
    block: {
      base: 'my/block',
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
