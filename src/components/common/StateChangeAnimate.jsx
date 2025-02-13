import ReactDOM from 'react-dom';
import { useEffect } from 'react';
export const StateChangeAnimate = ({
  state,
  changeToTrueText,
  changeToFalseText,
}) => {
  // 포털을 사용해 렌더링할 대상 DOM 요소 선택
  const portalRoot = document.getElementById('portal-root');

  useEffect(() => {
    // 스크롤 막기
    document.body.style.overflow = 'hidden';

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = 'auto';
    };
  }, []);
  // 포털이 적용된 컴포넌트 반환
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex animate-fadeInOutModal items-center justify-center bg-neutral-80" />
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 animate-fadeInOutText rounded-xl bg-white px-12 py-4">
        <p className="truncate text-[#525252]">
          {state ? `${changeToFalseText}` : `${changeToTrueText}`}
        </p>
      </div>
    </>,
    portalRoot, // 포털 대상 지정
  );
};

export const startAnimation = (set) => {
  // 애니메이션 함수
  set(true);
  setTimeout(() => {
    set(false);
  }, 1500);
};
