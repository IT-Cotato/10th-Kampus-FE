import { ModalPortal } from './Modal';
export const StateChangeAnimate = ({
  state,
  changeToTrueText,
  changeToFalseText,
  onClose = null,
}) => {
  // 포털이 적용된 컴포넌트 반환
  return (
    <ModalPortal>
      <div className="modal-layout" onClick={onClose} />
      <div
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 animate-fadeInOutText rounded-xl bg-white px-12 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="truncate whitespace-pre break-words text-center text-[#525252]">
          {state ? `${changeToFalseText}` : `${changeToTrueText}`}
        </p>
      </div>
    </ModalPortal>
  );
};

export const startAnimation = (set) => {
  // 애니메이션 함수
  set(true);
  setTimeout(() => {
    set(false);
  }, 1500);
};
