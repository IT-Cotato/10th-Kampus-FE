import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PATH } from '@/routes/path';
import {
  AllBoard,
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
  FAQ,
  Notice,
  NoticeDetail,
  Post,
  PostReport,
  Welcome,
  SchoolSearch,
  SchoolEmail,
  SchoolPhoto,
  MarketScrap,
  CommunityScrap,
  MyComments,
  MyArticles,
  ChatReport,
  Dashboard,
  BoardManagement,
  SignupManagement,
  CreateCardnews,
  ChatPage,
  CardnewsList,
  BoardGuide,
  CreateBoard,
  NoticeManagement,
  CreateNotice,
  Market,
  Draft,
  MarketPost,
  StudentVerifications,
  FailedVerify,
  MarketWrite,
  ManageCategory,
  KakaoLoginHandler,
  MyMarkets,
  SplashScreen,
  MarketSearch,
} from '@/pages';
import { ContactUs } from '@/components/layout/ContactUs';
import { ApiErrorBoundary } from '@/components/common/error/ApiErrorBoundary';
import { Suspense } from 'react';
import { SuspenseFallback } from '@/components/common/error/SuspenseFallback';
import { UnknownFallback } from '@/components/common/error/UnknownErrorBoundary';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';

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
    path: PATH.ROOT,
    element: (
      <Layout>
        <ApiErrorBoundary fallbackRender={UnknownFallback}>
          <Suspense fallback={<SuspenseFallback />}>
            <Outlet />
          </Suspense>
        </ApiErrorBoundary>
      </Layout>
    ),
    errorElement: (
      <Layout>
        <NotFound />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <SplashScreen />,
      },
      // ...createAuthRouter('PUBLIC', [
      //   {
      //     path: PATH.ACCOUNT_PERMANENT_SUSPENDED,
      //     element: <AccountPermanentSuspendedNotice />,
      //   },
      {
        path: PATH.LOGIN.BASE,
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Login />,
          },
          {
            path: PATH.LOGIN.KAKAO,
            element: <KakaoLoginHandler />,
          },
        ],
      },
      {
        path: PATH.SIGNUP.BASE,
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Navigate to={PATH.SIGNUP.TERMS} replace />,
          },
          {
            path: PATH.SIGNUP.TERMS,
            element: <Terms />,
          },
          {
            path: PATH.SIGNUP.PROFILE,
            element: <ProfileSettings />,
          },
          {
            path: PATH.SIGNUP.WELCOME,
            element: <Welcome />,
          },
          {
            path: PATH.SIGNUP.SCHOOL,
            element: <SchoolSearch />,
          },
          {
            path: PATH.SIGNUP.VERIFY.BASE,
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <SchoolVerification />,
              },
              {
                path: PATH.SIGNUP.VERIFY.EMAIL,
                element: <SchoolEmail />,
              },
              {
                path: PATH.SIGNUP.VERIFY.FILE,
                element: <SchoolPhoto />,
              },
            ],
          },
        ],
      },
      // ]),
      ...createAuthRouter('PRIVATE', [
        {
          path: PATH.HOME,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Home />,
            },
          ],
        },
        {
          path: PATH.SEARCH,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Search />,
            },
          ],
        },
        {
          path: PATH.BOARD_GUIDE,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <BoardGuide />,
            },
          ],
        },
        {
          path: PATH.BOARD.BASE,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <AllBoard />,
            },
            {
              path: PATH.BOARD.SPECIFIC.BASE, // title에 따라 동적 할당
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <Board />,
                },
                {
                  path: PATH.BOARD.SPECIFIC.TRENDING, // trending board는 boardId가 없음
                  element: <Board />,
                },
                {
                  path: PATH.BOARD.SPECIFIC.SEARCH,
                  element: <Search />,
                },
                {
                  path: PATH.BOARD.SPECIFIC.WRITE,
                  element: <Write />,
                },
                {
                  path: PATH.BOARD.SPECIFIC.POST,
                  element: <Outlet />,
                  children: [
                    {
                      path: '',
                      element: <Post />,
                    },
                    {
                      path: PATH.BOARD.SPECIFIC.EDIT,
                      element: <Write />,
                    },
                    {
                      path: PATH.BOARD.SPECIFIC.REPORT,
                      element: <PostReport />,
                    },
                  ],
                },
              ],
            },
            {
              path: PATH.BOARD.SPECIFIC.DRAFT,
              element: <Draft />,
            },
          ],
        },
        {
          path: PATH.MARKET.BASE,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Market />,
            },
            {
              path: PATH.MARKET.SEARCH,
              element: <MarketSearch />,
            },
            {
              path: PATH.MARKET.PRODUCT,
              element: <MarketPost />,
            },
            {
              path: PATH.MARKET.WRITE,
              element: <MarketWrite />,
            },
            {
              path: `${PATH.MARKET.PRODUCT}/${PATH.MARKET.EDIT}`,
              element: <MarketWrite />,
            },
          ],
        },
        {
          path: PATH.CHAT_LIST.BASE,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <ChatPage />,
            },
            {
              path: PATH.CHAT_LIST.REPORT,
              element: <ChatReport />,
            },
          ],
        },
        {
          path: PATH.MYPAGE.BASE,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <MyPage />,
            },
            {
              path: PATH.MYPAGE.VERIFY.FAIL,
              element: <FailedVerify />,
            },
            {
              path: PATH.MYPAGE.SETTINGS.INFO,
              element: <MyInfo />,
            },

            {
              path: PATH.MYPAGE.DELETE,
              element: <DeleteAccount />,
            },
            {
              path: PATH.MYPAGE.COMMUNITY.MARKET,
              element: <Home />,
            },
            {
              path: PATH.MYPAGE.SERVICE.BASE,
              element: (
                <ContactUs>
                  <Outlet />
                </ContactUs>
              ),
              children: [
                {
                  path: '',
                  element: <Navigate to={PATH.MYPAGE.SERVICE.FAQ} replace />,
                },
                {
                  path: PATH.MYPAGE.SERVICE.FAQ,
                  element: <FAQ />,
                },
                {
                  path: PATH.MYPAGE.SERVICE.NOTICE,
                  element: <Notice />,
                },
              ],
            },
            {
              path: PATH.MYPAGE.COMMUNITY.SCRAP.BASE,
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
                      to={PATH.MYPAGE.COMMUNITY.SCRAP.COMMUNITY}
                      replace
                    />
                  ),
                },
                {
                  path: PATH.MYPAGE.COMMUNITY.SCRAP.COMMUNITY,
                  element: <CommunityScrap />,
                },
                {
                  path: PATH.MYPAGE.COMMUNITY.SCRAP.MARKET,
                  element: <MarketScrap />,
                },
              ],
            },
            {
              path: PATH.MYPAGE.COMMUNITY.ARTICLE.BASE,
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
                      to={PATH.MYPAGE.COMMUNITY.ARTICLE.ARTICLES}
                      replace
                    />
                  ),
                },
                {
                  path: PATH.MYPAGE.COMMUNITY.ARTICLE.ARTICLES,
                  element: <MyArticles />,
                },
                {
                  path: PATH.MYPAGE.COMMUNITY.ARTICLE.COMMENTS,
                  element: <MyComments />,
                },
                {
                  path: PATH.MYPAGE.COMMUNITY.ARTICLE.MARKET,
                  element: <MyMarkets />,
                },
              ],
            },
            // {
            //   path: PATH.MYPAGE.BLOCK.BASE,
            //   element: (
            //     <BlockingManagement>
            //       <Outlet />
            //     </BlockingManagement>
            //   ),
            //   children: [
            //     {
            //       path: '',
            //       element: <Navigate to={PATH.MYPAGE.BLOCK.CHAT} replace />,
            //     },
            //     {
            //       path: PATH.MYPAGE.BLOCK.CHAT,
            //       element: <BlockChat />,
            //     },
            //     {
            //       path: PATH.MYPAGE.BLOCK.MARKET,
            //       element: <BlockMarket />,
            //     },
            //   ],
            // },
            {
              path: PATH.MYPAGE.SERVICE.BASE,
              element: <Outlet />,
              children: [
                {
                  path: `${PATH.MYPAGE.SERVICE.NOTICE}/${PATH.MYPAGE.SERVICE.NOTICE_DETAILS}`,
                  element: <NoticeDetail />,
                },
              ],
            },
          ],
        },
      ]),
      ...createAuthRouter('ADMIN', [
        {
          path: PATH.ADMIN.BASE,
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Navigate to={PATH.ADMIN.DASHBOARD} replace />,
            },
            {
              path: PATH.ADMIN.DASHBOARD,
              element: <Dashboard />,
            },
            {
              path: PATH.ADMIN.CATEGORY,
              element: <ManageCategory />,
            },
            {
              path: PATH.ADMIN.SIGNUP_MANAGEMENT.BASE,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <SignupManagement />,
                },
                {
                  path: PATH.ADMIN.SIGNUP_MANAGEMENT.STUDENT_VERIFICATIONS,
                  element: <StudentVerifications />,
                },
              ],
            },
            {
              path: PATH.ADMIN.BOARD_MANAGEMENT.BASE,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <BoardManagement />,
                },
                {
                  path: PATH.ADMIN.BOARD_MANAGEMENT.CREATE,
                  element: <CreateBoard />,
                },
                {
                  path: `${PATH.ADMIN.BOARD_MANAGEMENT.BOARD_ID}/${PATH.ADMIN.BOARD_MANAGEMENT.EDIT}`,
                  element: <CreateBoard />,
                },
              ],
            },
            {
              path: PATH.ADMIN.CARDNEWS.BASE,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <CardnewsList />,
                },
                {
                  path: PATH.ADMIN.CARDNEWS.CREATE,
                  element: <CreateCardnews />,
                },
              ],
            },
            {
              path: PATH.ADMIN.NOTICE.BASE,
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <NoticeManagement />,
                },
                {
                  path: PATH.ADMIN.CARDNEWS.CREATE,
                  element: <CreateNotice />,
                },
                {
                  path: `${PATH.ADMIN.NOTICE.NOTICE_ID}/${PATH.ADMIN.NOTICE.EDIT}`,
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
