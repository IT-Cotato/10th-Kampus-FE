import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ButtonRound } from './ButtonRound';

const ModalPortal = ({ children }) => {
  const root = document.getElementById('portal-root');
  if (!root) return null;
  return ReactDOM.createPortal(children, root);
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
        className="justsify-center fixed mx-auto flex h-full min-h-dvh w-full max-w-lg items-center bg-[rgba(11,11,11,0.6)] px-4 align-middle"
        onClick={onClose}
      >
        <div
          className="flex w-full flex-col items-center gap-[1.875rem] rounded-[.625rem] bg-white px-10 py-[1.875rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="flex text-center text-subTitle text-neutral-title">
            {title}
          </h2>
          {children && (
            <div className="flex w-full flex-col text-center">{children}</div>
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
