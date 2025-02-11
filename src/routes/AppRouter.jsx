import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { path } from './path';
import { Layout } from '@/components/layout/layout';
import {
  AllBoard,
  SplashScreen,
  Login,
  Terms,
  NotFound,
  Board,
  MyArticle,
  DeleteAccount,
  Home,
  Scrap,
  Search,
  Write,
  ProfileSettings,
  ChatList,
  ChatId,
  MyPage,
  MyInfo,
  SchoolVerification,
  Notification,
  FAQ,
  Inquiry,
  Notice,
  InquiryDetail,
  WriteInquiry,
  NoticeDetail,
  Post,
  BlockChat,
  BlockSecondhand,
  Welcome,
  SchoolSearch,
  SchoolEmail,
  SchoolPhoto,
  SecondhandScrap,
  CommunityScrap,
  MyComments,
  MyArticles
} from '@/pages';
import { ContactUs } from '@/components/layout/ContactUs';
import { BlockingManagement } from '@/components/layout/BlockingManagement';

const AppRouter = createBrowserRouter([
  {
    path: '',
    element: (
      <Layout>
        <SplashScreen />
      </Layout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: path.login,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: path.login,
        element: <Login />,
      },
    ],
  },
  {
    path: path.signup.base,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <Navigate to={path.signup.terms} replace />,
      },
      {
        path: path.signup.terms,
        element: <Terms />,
      },
      {
        path: path.signup.profile,
        element: <ProfileSettings />,
      },
      {
        path: path.signup.welcome,
        element: <Welcome />,
      },
      {
        path: path.signup.school,
        element: <SchoolSearch />,
      },
      {
        path: path.signup.verify.base,
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <SchoolVerification />,
          },
          {
            path: path.signup.verify.email,
            element: <SchoolEmail />,
          },
          {
            path: path.signup.verify.file,
            element: <SchoolPhoto />,
          },
        ]
      },
    ],
  },
  {
    path: path.home,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: path.search,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <Search />,
      },
    ],
  },
  {
    path: path.board.base,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <AllBoard />,
      },
      {
        path: path.board.specific.base, // title에 따라 동적 할당
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Board />,
          },
          {
            path: path.board.specific.write,
            element: <Write />,
          },
          {
            path: path.board.specific.post,
            element: <Post />,
          },
        ],
      },
    ],
  },
  {
    path: path.market.base,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
  },
  {
    path: path.chatList.base,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <ChatList />,
      },
      {
        path: ':id',
        element: <ChatId />,
      },
    ],
  },
  {
    path: path.mypage.base,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <MyPage />,
      },
      {
        path: path.mypage.settings.info,
        element: <MyInfo />,
      },
      {
        path: path.mypage.settings.notification,
        element: <Notification />,
      },
      {
        path: path.mypage.delete,
        element: <DeleteAccount />,
      },
      {
        path: path.mypage.community.secondhand,
        element: <Home />,
      },
      {
        path: path.mypage.service.base,
        element: (
          <ContactUs>
            <Outlet />
          </ContactUs>
        ),
        children: [
          {
            path: '',
            element: <Navigate to={path.mypage.service.faq} replace />,
          },
          {
            path: path.mypage.service.faq,
            element: <FAQ />,
          },
          {
            path: path.mypage.service.inquiry,
            element: <Inquiry />,
          },
          {
            path: path.mypage.service.notice,
            element: <Notice />,
          },
        ],
      },
      {
        path: path.mypage.community.scrap.base,
        element: (
          <Scrap>
            <Outlet />
          </Scrap>
        ),
        children: [
          {
            path: '',
            element: <Navigate to={path.mypage.community.scrap.community} replace />,
          },
          {
            path: path.mypage.community.scrap.community,
            element: <CommunityScrap />,
          },
          {
            path: path.mypage.community.scrap.secondhand,
            element: <SecondhandScrap />,
          },
        ]
      },
      {
        path: path.mypage.community.article.base,
        element: (
          <MyArticle>
            <Outlet />
          </MyArticle>
        ),
        children: [
          {
            path: '',
            element: <Navigate to={path.mypage.community.article.articles} replace />,
          },
          {
            path: path.mypage.community.article.articles,
            element: <MyArticles />,
          },
          {
            path: path.mypage.community.article.comments,
            element: <MyComments />,
          },
        ]
      },
      {
        path: path.mypage.block.base,
        element: (
          <BlockingManagement>
            <Outlet />
          </BlockingManagement>
        ),
        children: [
          {
            path: '',
            element: <Navigate to={path.mypage.block.chat} replace />,
          },
          {
            path: path.mypage.block.chat,
            element: <BlockChat />,
          },
          {
            path: path.mypage.block.secondhand,
            element: <BlockSecondhand />,
          },
        ]
      },
      {
        path: path.mypage.service.base,
        element: <Outlet />,
        children: [
          {
            path: `${path.mypage.service.inquiry}/${path.mypage.service.inquiryDetails}`,
            element: <InquiryDetail />,
          },
          {
            path: `${path.mypage.service.inquiry}/${path.mypage.service.writeInquiry}`,
            element: <WriteInquiry />,
          },
          {
            path: `${path.mypage.service.notice}/${path.mypage.service.noticeDetails}`,
            element: <NoticeDetail />,
          },
        ],
      },
    ],
  },
]);

export default AppRouter;
