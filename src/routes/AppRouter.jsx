import { createBrowserRouter, Outlet } from 'react-router-dom';
import { path } from './path';
import { Layout } from '@/components/layout/layout';
import { AllBoard, LandingPage, Login, Terms, NotFound, Board } from '@/pages';
import { Signup } from '@/pages/auth/signup';
import { ProfileSettings } from '@/pages/auth/profileSettings';
import { Service } from '@/pages/my/service/service';
import { Mypage } from '@/pages/my/mypage';
import { ChatList } from '@/pages/chat/list';
import { Inquiry } from '@/pages/my/service/inquiry';

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
        element: <AllBoard />
      },
      {
        path: ':boardTitle',  // title에 따라 동적 할당
        element: <Board />,
      }
    ]
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
        element: <Mypage />,
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
