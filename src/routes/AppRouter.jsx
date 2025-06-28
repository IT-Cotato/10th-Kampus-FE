import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
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
  MyPage,
  MyInfo,
  SchoolVerification,
  Notification,
  FAQ,
  Notice,
  NoticeDetail,
  Post,
  PostReport,
  BlockChat,
  BlockSecondhand,
  Welcome,
  SchoolSearch,
  SchoolEmail,
  SchoolPhoto,
  SecondhandScrap,
  CommunityScrap,
  MyComments,
  MyArticles,
  ChatReport,
  Dashboard,
  UserManagement,
  BoardManagement,
  SignupManagement,
  CreateCardnews,
  ReportManagement,
  Statistics,
  AdminLogin,
  ChatPage,
  CardnewsList,
  BoardGuide,
  NotificationList,
  CreateBoard,
  NoticeManagement,
  CreateNotice,
  Market,
  MarketPost,
  StudentVerifications,
  FailedVerify,
  AccountPermanentSuspendedNotice,
  MarketWrite,
  ManageCategory,
  KakaoLoginHandler,
} from '@/pages';
import { ContactUs } from '@/components/layout/ContactUs';
import { BlockingManagement } from '@/components/layout/BlockingManagement';
import { ApiErrorBoundary } from '@/components/common/error/ApiErrorBoundary';
import { Suspense } from 'react';
import { SuspenseFallback } from '@/components/common/error/SuspenseFallback';
import PrivateRoute from '@/routes/PrivateRoute';
import PublicRoute from '@/routes/PublicRoute';
import AdminRoute from '@/routes/AdminRoute';
import { path } from '@/routes/path';

const createAuthRouter = (routeType, children) => {
  const authRouter = children.map((child) => ({
    element:
      routeType === 'PRIVATE' ? (
        <PrivateRoute />
      ) : routeType === 'PUBLIC' ? (
        <PublicRoute />
      ) : routeType === 'ADMIN' ? (
        <AdminRoute />
      ) : (
        <NotFound />
      ),
    children: [child],
  }));
  return authRouter;
};

const AppRouter = createBrowserRouter([
  {
    path: path.root,
    element: (
      <Layout>
        <ApiErrorBoundary>
          <Suspense fallback={<SuspenseFallback />}>
            <Outlet />
          </Suspense>
        </ApiErrorBoundary>
      </Layout>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: path.root,
        element: <SplashScreen />,
      },
      ...createAuthRouter('PUBLIC', [
        {
          path: path.accountPermanentSuspended,
          element: <AccountPermanentSuspendedNotice />,
        },
        {
          path: path.login.base,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Login />,
            },
            {
              path: path.login.kakao,
              element: <KakaoLoginHandler />,
            },
          ],
        },
        {
          path: path.signup.base,
          element: <Outlet />,
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
              ],
            },
          ],
        },
      ]),
      ...createAuthRouter('PRIVATE', [
        {
          path: path.home,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Home />,
            },
          ],
        },
        {
          path: path.search,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Search />,
            },
          ],
        },
        {
          path: path.boardGuide,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <BoardGuide />,
            },
          ],
        },
        {
          path: path.notificationList,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <NotificationList />,
            },
          ],
        },
        {
          path: path.board.base,
          element: <Outlet />,
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
                  path: path.board.specific.search,
                  element: <Search />,
                },
                {
                  path: path.board.specific.write,
                  element: <Write />,
                },
                {
                  path: path.board.specific.post,
                  element: <Outlet />,
                  children: [
                    {
                      path: '',
                      element: <Post />,
                    },
                    {
                      path: path.board.specific.edit,
                      element: <Write />,
                    },
                    {
                      path: path.board.specific.report,
                      element: <PostReport />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: path.market.base,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Market />,
            },
            {
              path: path.market.product,
              element: <MarketPost />,
            },
            {
              path: path.market.write,
              element: <MarketWrite />,
            },
            {
              path: `${path.market.product}/${path.market.edit}`,
              element: <MarketWrite />,
            },
          ],
        },
        {
          path: path.chatList.base,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <ChatPage />,
            },
            {
              path: path.chatList.report,
              element: <ChatReport />,
            },
          ],
        },
        {
          path: path.mypage.base,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <MyPage />,
            },
            {
              path: path.mypage.verify.fail,
              element: <FailedVerify />,
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
                  element: (
                    <Navigate
                      to={path.mypage.community.scrap.community}
                      replace
                    />
                  ),
                },
                {
                  path: path.mypage.community.scrap.community,
                  element: <CommunityScrap />,
                },
                {
                  path: path.mypage.community.scrap.secondhand,
                  element: <SecondhandScrap />,
                },
              ],
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
                  element: (
                    <Navigate
                      to={path.mypage.community.article.articles}
                      replace
                    />
                  ),
                },
                {
                  path: path.mypage.community.article.articles,
                  element: <MyArticles />,
                },
                {
                  path: path.mypage.community.article.comments,
                  element: <MyComments />,
                },
              ],
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
              ],
            },
            {
              path: path.mypage.service.base,
              element: <Outlet />,
              children: [
                {
                  path: `${path.mypage.service.notice}/${path.mypage.service.noticeDetails}`,
                  element: <NoticeDetail />,
                },
              ],
            },
          ],
        },
      ]),
      ...createAuthRouter('ADMIN', [
        {
          path: path.admin.base,
          element: <Outlet />,
          children: [
            {
              path: path.admin.login,
              element: <AdminLogin />,
            },
            {
              path: '',
              element: <Navigate to={path.admin.dashboard} replace />,
            },
            {
              path: path.admin.dashboard,
              element: <Dashboard />,
            },
            {
              path: path.admin.category,
              element: <ManageCategory />,
            },
            {
              path: path.admin.userManagement,
              element: <UserManagement />,
            },
            {
              path: path.admin.signupManagement.base,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <SignupManagement />,
                },
                {
                  path: path.admin.signupManagement.studentVertifications,
                  element: <StudentVerifications />,
                },
              ],
            },
            {
              path: path.admin.boardManagement.base,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <BoardManagement />,
                },
                {
                  path: path.admin.boardManagement.create,
                  element: <CreateBoard />,
                },
                {
                  path: `${path.admin.boardManagement.boardId}/${path.admin.boardManagement.edit}`,
                  element: <CreateBoard />,
                },
              ],
            },
            {
              path: path.admin.cardnews.base,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <CardnewsList />,
                },
                {
                  path: path.admin.cardnews.create,
                  element: <CreateCardnews />,
                },
              ],
            },
            {
              path: path.admin.reportMangement,
              element: <ReportManagement />,
            },
            {
              path: path.admin.statistics,
              element: <Statistics />,
            },
            {
              path: path.admin.notice.base,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <NoticeManagement />,
                },
                {
                  path: path.admin.cardnews.create,
                  element: <CreateNotice />,
                },
                {
                  path: `${path.admin.notice.noticeId}/${path.admin.notice.edit}`,
                  element: <CreateNotice />,
                },
              ],
            },
          ],
        },
      ]),
    ],
  },
]);

export default AppRouter;
