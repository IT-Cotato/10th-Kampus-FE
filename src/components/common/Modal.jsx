import { useEffect } from 'react';
import ReactDom from 'react-dom';
import { ButtonRound } from './ButtonRound';

const ModalPortal = ({ children }) => {
  const root = document.getElementById('modal-root');
  return ReactDom.createPortal(children, root);
};

export const Modal = ({
  title = '',
  children = null,
  leftButton = null,
  onClickLeft = null,
  rightButton = null,
  onClickRight = null,
  onClose = null,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className="justsify-center fixed z-[100] mx-auto flex h-full min-h-dvh w-full max-w-lg items-center bg-[rgba(11,11,11,0.6)] px-4 align-middle"
        onClick={onClose}
      >
        <div className="flex w-full flex-col items-center gap-[1.875rem] rounded-[.625rem] bg-white px-10 py-[1.875rem]">
          <h2 className="flex text-center text-subTitle text-neutral-title">
            {title}
          </h2>
          {children && (
            <div className="flex w-full flex-col whitespace-pre text-center">
              {children}
            </div>
          )}
          {(leftButton || rightButton) && (
            <div className="flex flex-row gap-4 whitespace-nowrap">
              {leftButton && (
                <ButtonRound
                  theme="border"
                  size="modal"
                  onClick={onClickLeft}
                  text={leftButton}
                />
              )}
              {rightButton && (
                <ButtonRound
                  size="modal"
                  onClick={onClickRight}
                  text={rightButton}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};
