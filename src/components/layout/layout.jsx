import { Navbar } from '@/components/layout/navbar';
import { useLocation } from 'react-router-dom';
import { path } from '@/routes/path';

export const Layout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const validPaths = [
    path.home,
    path.board.base,
    path.market.base,
    path.chatList.base,
    path.mypage.base,
  ];

  const renderNav = validPaths.includes(pathname);

  return (
    <div className="layout">
      {/* 사용자 정보 존재 시 render 개선 */}
      {renderNav ? (
        <div
          id="modal-root"
          className="container relative flex flex-col justify-between"
        >
          <div className="flex w-full h-full">{children}</div>
          <div className="flex w-full h-[6.4375rem]"></div>
          <Navbar />
        </div>
      ) : (
        <div id="modal-root" className="container relative flex">
          {children}
        </div>
      )}
    </div>
  );
};
