import { Navbar } from '@/components/layout/navbar';
import { useLocation } from 'react-router-dom';
import { path } from '@/routes/path';

export const Layout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const excludedPaths = [path.login, path.signup.base];

  const renderNav = !excludedPaths.some((excludedPaths) =>
    pathname.startsWith(excludedPaths),
  );

  return (
    <div className="layout">
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
