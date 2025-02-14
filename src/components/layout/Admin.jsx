import { path } from '@/routes/path';
import { cn } from '@/utils/cn';
import { useLocation, useNavigate } from 'react-router-dom';

export const Admin = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const menu = [
    { id: 0, text: '대시보드', path: path.admin.dashboard },
    { id: 1, text: '사용자 관리', path: path.admin.userManagement },
    { id: 3, text: '가입 관리', path: path.admin.signupManagement },
    { id: 4, text: '게시판 관리', path: path.admin.boardManagement },
    { id: 5, text: '카드뉴스 제작', path: path.admin.cardnews },
    { id: 6, text: '신고 관리', path: path.admin.reportMangement },
    { id: 7, text: '통계 관리', path: path.admin.statistics },
  ];

  return (
    <div className="flex min-h-dvh w-full min-w-[64rem]">
      <div className="flex justify-center text-center align-middle w-72">
        <span className="absolute hidden left-10 top-5 text-pageTitle text-primary-90 lg:flex">
          Kampus
        </span>
        <div className="flex flex-col justify-center text-start">
          {menu.map((item) => (
            <button
              key={item.id}
              className={cn(
                'box-border h-16 w-72 px-10 text-start text-subTitle text-neutral-base',
                {
                  'border-l-4 border-primary-base text-primary-base':
                    pathname.includes(item.path),
                },
              )}
              onClick={() => navigate(`./${item.path}`, { replace: true })}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="justify-end hidden w-full px-6 py-2 bg-white lg:flex">
          <span className="px-4 py-1 border-2 rounded-full border-primary-40">
            ㅇㅇㅇ님
          </span>
        </div>
        <div className="flex flex-col flex-1 w-full bg-primary-5">
          {children}
        </div>
      </div>
    </div>
  );
};
