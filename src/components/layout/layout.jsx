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
  const isAdminPath = pathname.includes(path.admin.base);

  if (isAdminPath) {
    return <>{children}</>;
  }

  if (!renderNav) {
    return (
      <div className="layout">
        <div id="modal-root" className="relative flex flex-1 overflow-x-hidden">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <div id="modal-root" className="relative flex flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};
