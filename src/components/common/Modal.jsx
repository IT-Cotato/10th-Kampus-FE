import { useEffect } from 'react';
import ReactDom from 'react-dom';
import { BUTTON_THEMES, ButtonRound } from './ButtonRound';

const ModalPortal = ({ children }) => {
  const root = document.getElementById('modal-root');
  return ReactDom.createPortal(children, root);
};

export const MODAL_TYPES = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
  REJECTED: 'rejected',
  CUSTOM: 'custom',
};

export const Modal = ({
  type = MODAL_TYPES.ALERT,
  title = '',
  titleIcon = null,
  children = null,
  leftButton = null,
  onClickLeft = null,
  rightButton = null,
  onClickRight = null,
  onClose = null,
  className = '',
  ...props
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const renderButtons = () => {
    switch (type) {
      case MODAL_TYPES.ALERT:
        return (
          <div className="flex flex-row gap-4 whitespace-nowrap">
            <ButtonRound
              theme={BUTTON_THEMES.BORDER}
              size="modal"
              onClick={onClickLeft || onClose}
              text={leftButton || 'Cancel'}
            />
            <ButtonRound
              theme={BUTTON_THEMES.BORDER}
              size="modal"
              onClick={onClickRight}
              text={rightButton || 'Ok'}
            />
          </div>
        );
      case MODAL_TYPES.CONFIRM:
        return (
          <div className="flex flex-row gap-4 whitespace-nowrap">
            <ButtonRound
              theme={BUTTON_THEMES.PRIMARY}
              size="modal"
              onClick={onClickRight}
              text={'Ok'}
            />
          </div>
        );
      case MODAL_TYPES.REJECTED:
        return (
          <div className="flex flex-row gap-4 whitespace-nowrap">
            <ButtonRound
              theme={BUTTON_THEMES.REJECTED}
              size="modal"
              onClick={onClickRight}
              text={'Contact Kampus'}
            />
          </div>
        );
      case MODAL_TYPES.CUSTOM:
        return children;
      default:
        return null;
    }
  };

  return (
    <ModalPortal>
      <div
        className="fixed z-[100] mx-auto flex h-full min-h-dvh w-full max-w-lg items-center justify-center bg-[rgba(11,11,11,0.6)] px-4 align-middle"
        onClick={onClose}
      >
        <div className="flex w-full flex-col items-center gap-[1.875rem] rounded-[.625rem] bg-white px-10 py-[1.875rem]">
          {titleIcon && (
            <div className="mb-2">
              <img src={titleIcon} alt="Icon" className="w-16 h-16" />
            </div>
          )}
          <h2 className="flex text-center text-subTitle text-neutral-title">
            {title}
          </h2>
          {children && (
            <div className="flex flex-col w-full text-center">{children}</div>
          )}
          {renderButtons()}
        </div>
      </div>
    </ModalPortal>
  );
};
