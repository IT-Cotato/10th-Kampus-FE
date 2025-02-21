import { Navbar } from '@/components/layout/navbar';

export const ChatLayout = ({ children, render }) => {
  const validPaths = 'chatList';

  return (
    <div className="layout">
      {/* 사용자 정보 존재 시 render 개선 */}
      {render === validPaths ? (
        <div
          id="modal-root"
          className="container relative flex flex-col justify-between"
        >
          <div className="flex h-full w-full">{children}</div>
          <div className="flex h-[4rem] w-full"></div>
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
