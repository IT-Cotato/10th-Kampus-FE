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
  const isAdminPath = pathname.includes(PATH.ADMIN.BASE);

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
