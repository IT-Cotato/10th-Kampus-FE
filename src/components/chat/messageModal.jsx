import replyIcon from '@/assets/imgs/replyIcon.svg';
import blockIcon from '@/assets/imgs/postBlock.svg';
import muteIcon from '@/assets/imgs/muteIcon.svg';
import deleteIcon from '@/assets/imgs/delete.svg';
import ReactDom from 'react-dom';
import { useEffect } from 'react';

const ModalPortal = ({ children }) => {
  const root = document.getElementById('modal-root');
  return ReactDom.createPortal(children, root);
};

export const PRESS_TYPE = {
  message: 'message',
  image: 'image',
};

export const MessageModal = ({ onClose, type = PRESS_TYPE.message }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overflow-x-hidden overflow-y-auto bg-black bg-opacity-30"
        onClick={onClose}
      >
        <div className="mx-14 flex w-[16.125rem] flex-col items-center gap-3 overflow-hidden rounded-[.625rem] bg-white py-3">
          <div
            className="flex items-center justify-between w-full pb-2 border-b border-neutral-border-30 px-7"
            onClick={() => {}}
          >
            <p>Reply</p>
            <img src={replyIcon} alt="report" />
          </div>
          <div
            className="flex items-center justify-between w-full pb-2 border-b border-neutral-border-30 px-7"
            onClick={() => {}}
          >
            <p>Copy</p>
            <img src={blockIcon} alt="block" />
          </div>
          {type === PRESS_TYPE.image && (
            <div
              className="flex items-center justify-between w-full pb-2 border-b border-neutral-border-30 px-7"
              onClick={() => {}}
            >
              <p>Save</p>
              <img src={muteIcon} alt="mute" />
            </div>
          )}
          <div
            className="flex items-center justify-between w-full px-7"
            onClick={() => {}}
          >
            <p className="text-primary-red">Delete</p>
            <img src={deleteIcon} alt="delete" />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
