import { useEffect } from 'react';

/** 팝업 컴포넌트 (버튼 하나) */
export const Alert = (props) => {
  useEffect(() => {
    // 스크롤 막기
    document.body.style.overflow = 'hidden';

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto min-h-dvh w-full h-full overflow-x-hidden overflow-y-auto bg-[rgba(11,11,11,0.6)] fixed flex z-[100] justify-center items-center align-middle">
      <dialog className="relative z-[200] flex flex-col items-center justify-center bg-white border py-[1.875rem] gap-7 mx-4 rounded-[.625rem] px-6">
        <div className="flex items-center justify-center w-full text-center align-middle text-subTitle">
          {props.title}
        </div>
        <button
          type="button"
          onClick={props.onClick}
          className="rounded-[1.875rem] bg-primary-base text-white py-[.625rem] px-[1.375rem] min-w-[7.625rem]"
        >
          {props.button}
        </button>
      </dialog>
    </div>
  );
};
