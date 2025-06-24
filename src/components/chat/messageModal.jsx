import copiedIcon from '@/assets/imgs/copied.svg';
import ReactDom from 'react-dom';
import { useEffect } from 'react';

const ModalPortal = ({ children }) => {
  const root = document.getElementById('modal-root');
  return ReactDom.createPortal(children, root);
};

export const MessageModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overflow-y-auto overflow-x-hidden bg-black bg-opacity-30"
        onClick={onClose}
      >
        <div className="mx-14 flex w-[16.125rem] flex-col items-center gap-3 overflow-hidden rounded-[.625rem] bg-white py-3">
          <div
            className="flex w-full items-center justify-between px-7"
            onClick={() => {}}
          >
            <p>Copy</p>
            <img src={copiedIcon} alt="copied" />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
