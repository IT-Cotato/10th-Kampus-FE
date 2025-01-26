import { Navbar } from '@/components/layout/navbar';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
  const location = useLocation();
  const renderNav =
    !location.pathname.includes('login') && !location.pathname.includes('sign');

  return (
    <div className="layout">
      {/* 사용자 정보 존재 시 render 개선 */}
      {renderNav ? (
        <div
          id="modal-root"
          className="container relative flex flex-col justify-between"
        >
          <div className="flex w-full h-full">{children}</div>
          <div className='flex w-full h-[6.4375rem]'></div>
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
