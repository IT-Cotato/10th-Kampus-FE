import { useEffect } from 'react';
import ReactDom from 'react-dom';

const ModalPortal = ({ children }) => {
  const root = document.getElementById('modal-root');
  return ReactDom.createPortal(children, root);
};

export const Modal = ({ children = null, title = '', onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className="absolute left-0 top-0 z-50 flex h-dvh w-full items-center justify-center overflow-hidden bg-black bg-opacity-30"
        onClick={onClose}
      >
        <div className="mx-4 flex w-full flex-col items-center gap-[1.875rem] overflow-hidden rounded-[.625rem] bg-white p-3 py-[1.875rem]">
          <h2 className="text-subTitle text-neutral-title">{title}</h2>
          {children && <div className="overflow-y-auto">{children}</div>}
        </div>
      </div>
    </ModalPortal>
  );
};
