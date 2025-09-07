import { Navbar } from '@/components/layout/Navbar';

export const ChatLayout = ({ children, render }) => {
  const validPaths = 'chatList';

  return (
    <div className="layout">
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
        <div
          id="modal-root"
          className="container relative flex h-screen flex-col"
        >
          {children}
        </div>
      )}
    </div>
  );
};
