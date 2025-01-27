import { createBrowserRouter, Outlet } from 'react-router-dom';
import { path } from './path';
import { Layout } from '@/components/layout/layout';
import { ProfileSettings } from '@/pages/auth/profileSettings';
import {
  AllBoard,
  LandingPage,
  Login,
  Terms,
  NotFound,
  ChatId,
  ChatList,
  Service,
  Inquiry,
  Board,
  MyPage,
} from '@/pages';
import { Signup } from '@/pages/auth/signup';
import { MyInfo } from '@/pages/my/settings/MyInfo';
import { SchoolVerification } from '@/pages/my/settings/SchoolVerification';
import { Notification } from '@/pages/my/settings/Notification';

const AppRouter = createBrowserRouter([
  {
    path: '',
    element: (
      <Layout>
        <LandingPage isLanding />
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
        element: <Signup />,
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
        path: path.signup.school,
        element: <Signup />,
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
        element: <AllBoard />,
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
        path: path.mypage.settings.verification,
        element: <SchoolVerification />,
      },
      {
        path: path.mypage.settings.notification,
        element: <Notification />,
      },
      {
        path: path.mypage.service.base,
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Service />,
          },
          {
            path: path.mypage.service.inquiry,
            element: <Inquiry />,
          },
        ],
      },
    ],
  },
]);

export default AppRouter;
