import { path } from '@/routes/path';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HamburgerIcon from '@/assets/imgs/admin/HamburgerIcon.png';
import Board from '@/assets/imgs/admin/Board.svg?react';
import Cardnews from '@/assets/imgs/admin/Cardnews.svg?react';
import Graph from '@/assets/imgs/admin/Graph.svg?react';
import Home from '@/assets/imgs/admin/Home.svg?react';
import Report from '@/assets/imgs/admin/Report.svg?react';
import Setting from '@/assets/imgs/admin/Setting.svg?react';
import User from '@/assets/imgs/admin/User.svg?react';
import Volume from '@/assets/imgs/admin/Volume.svg?react';
import Edit from '@/assets/imgs/admin/Edit.svg?react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getAdminUser } from '@/apis/user/adminUserDetail.api';

export const Admin = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(true);

  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_ME],
    queryFn: () => getAdminUser(),
    staleTime: 1000 * 60 * 5,
  });

  const menu = [
    { id: 0, text: '대시보드', path: path.admin.dashboard, img: Home },
    { id: 1, text: '사용자 관리', path: path.admin.userManagement, img: User },
    {
      id: 2,
      text: '가입 관리',
      path: path.admin.signupManagement.base,
      img: Setting,
    },
    {
      id: 3,
      text: '카테고리 관리',
      path: path.admin.category,
      img: Edit,
    },
    {
      id: 4,
      text: '게시판 관리',
      path: path.admin.boardManagement.base,
      img: Board,
    },
    {
      id: 5,
      text: '카드뉴스 제작',
      path: path.admin.cardnews.base,
      img: Cardnews,
    },
    { id: 6, text: '신고 관리', path: path.admin.reportMangement, img: Report },
    { id: 7, text: '통계 관리', path: path.admin.statistics, img: Graph },
    { id: 8, text: '공지 작성', path: path.admin.notice.base, img: Volume },
  ];

  return (
    <div className="admin-layout">
      <div className="relative flex min-w-[64rem] flex-1 lg:w-dvw">
        <span className="absolute left-2 top-2 flex flex-row items-center gap-2">
          <button
            className="h-10 w-10 rounded-lg bg-white bg-cover"
            style={{ backgroundImage: `url(${HamburgerIcon})` }}
            onClick={() => setShowMenu(!showMenu)}
          ></button>
          {showMenu && (
            <span className="text-pageTitle text-primary-90">Kampus</span>
          )}
        </span>
        {showMenu && (
          <div className="flex max-h-[37.5rem] min-h-dvh w-72 flex-col justify-center rounded-br-3xl bg-white pt-20 text-start align-middle">
            {menu.map((item) => (
              <div className="flex" key={item.id}>
                {pathname.includes(item.path) && (
                  <div className="h-full w-1 rounded-r-lg bg-primary-base" />
                )}
                <button
                  type="button"
                  key={item.id}
                  className={cn(
                    'box-border flex h-16 w-72 items-center gap-4 px-7 text-start text-subTitle text-neutral-base',
                    {
                      'border-primary-base text-primary-base':
                        pathname.includes(item.path),
                    },
                  )}
                  onClick={() => navigate(`./${item.path}`, { replace: true })}
                >
                  <item.img className="flex h-auto w-6" />
                  <span className="flex">{item.text}</span>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full flex-col">
          {showMenu && (
            <div className="hidden w-full justify-end bg-white px-6 py-2 lg:flex">
              <span className="rounded-full border-2 border-primary-40 px-4 py-1">
                {userData?.nickname}님
              </span>
            </div>
          )}
          <div
            className={cn('flex w-full flex-1 flex-col p-5', {
              'pt-14': !showMenu,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
