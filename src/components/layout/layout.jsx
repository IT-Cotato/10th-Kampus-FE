import { Navbar } from '@/components/layout/navbar';

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div
        id="modal-root"
        className="container relative flex flex-col justify-between"
      >
        {children}
        <Navbar />
      </div>
    </div>
  );
};
