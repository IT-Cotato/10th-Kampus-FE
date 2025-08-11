import { Navbar } from '@/components/layout/navbar';
import { useLocation } from 'react-router-dom';
import { PATH } from '@/routes/path';

export const Layout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const validPaths = [
    PATH.HOME,
    PATH.BOARD.BASE,
    PATH.MARKET.BASE,
    PATH.CHAT_LIST.BASE,
    PATH.MYPAGE.BASE,
  ];

  const renderNav = validPaths.includes(pathname);

  return (
    <div className="layout">
      {/* 사용자 정보 존재 시 render 개선 */}
      {renderNav ? (
        <div
          id="modal-root"
          className="relative flex flex-1 flex-col justify-between"
        >
          <div className="flex h-full w-full flex-1 overflow-x-hidden">
            {children}
          </div>
          <div className="flex h-[4rem] w-full"></div>
          <Navbar />
        </div>
      ) : (
        <div id="modal-root" className="relative flex flex-1 overflow-x-hidden">
          {children}
        </div>
      )}
    </div>
  );
};
