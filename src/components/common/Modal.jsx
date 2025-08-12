import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BUTTON_THEMES, ButtonRound } from './ButtonRound';

/**
 * ModalPortal 컴포넌트
 * @param {object} props
 * @param {React.ReactNode} props.children - 포탈로 렌더링할 자식 요소
 * @returns {React.ReactPortal|null}
 */
export const ModalPortal = ({ children }) => {
  const root = document.getElementById('portal-root');
  if (!root) return null;
  return ReactDOM.createPortal(children, root);
};

/**
 * 모달 타입 상수
 */
export const MODAL_TYPES = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
  REJECTED: 'rejected',
  CUSTOM: 'custom',
};

/**
 * Modal 컴포넌트
 * @param {object} props
 * @param {'alert'|'confirm'|'rejected'|'custom'} [props.type] 모달 타입
 * @param {string} [props.title] 모달 제목
 * @param {string|null} [props.titleIcon] 타이틀 아이콘 이미지 경로
 * @param {React.ReactNode} [props.children] 모달 내용
 * @param {string|null} [props.leftButton] 왼쪽 버튼 텍스트
 * @param {function|null} [props.onClickLeft] 왼쪽 버튼 클릭 핸들러
 * @param {string|null} [props.rightButton] 오른쪽 버튼 텍스트
 * @param {function|null} [props.onClickRight] 오른쪽 버튼 클릭 핸들러
 * @param {function|null} [props.onClose] 모달 닫기 핸들러
 * @param {string} [props.className] 추가 클래스명
 * @returns {React.ReactPortal}
 */
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
  // 모달이 열릴 때 body 스크롤 비활성화, 닫힐 때 복구
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  /**
   * 모달 타입에 따라 버튼 렌더링
   * @returns {React.ReactNode}
   */
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
              theme={BUTTON_THEMES.PRIMARY}
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
              text={rightButton || 'Ok'}
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
      {/* 모달 바깥 영역 클릭 시 onClose 호출 */}
      <div className="modal-layout" onClick={onClose}>
        {/* 모달 내용 클릭 시 이벤트 전파 방지 */}
        <div
          className={`flex w-full flex-col items-center gap-[1.875rem] rounded-[.625rem] bg-white px-10 py-[1.875rem] ${className}`}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {titleIcon && (
            <div className="mb-2">
              <img src={titleIcon} alt="Icon" className="h-16 w-16" />
            </div>
          )}
          <h2 className="flex text-center text-subTitle text-neutral-title">
            {title}
          </h2>
          {children && (
            <div className="flex w-full flex-col whitespace-break-spaces text-center">
              {children}
            </div>
          )}
          {renderButtons()}
        </div>
      </div>
    </ModalPortal>
  );
};
