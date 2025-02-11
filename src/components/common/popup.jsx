import { useEffect } from 'react';

export const Popup = (props) => {
  useEffect(() => {
    // 스크롤 막기
    document.body.style.overflow = 'hidden';

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed z-[100] mx-auto flex h-full min-h-dvh w-full max-w-lg items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(11,11,11,0.6)] align-middle">
      <dialog className="z-[200] mx-4 flex flex-col items-center justify-center gap-[1.875rem] rounded-[.625rem] border bg-white py-[1.875rem]">
        <div className="flex w-full items-center justify-center text-center align-middle text-subTitle">
          {props.title}
        </div>
        <div className="flex w-full items-center justify-center px-10 text-center align-middle text-base text-neutral-base">
          {props.text}
        </div>
        <div className="flex flex-row gap-4">
          <button
            type="submit"
            onClick={props.onClickLeft}
            className="min-w-[7.625rem] rounded-[1.875rem] border px-[1.375rem] py-[.625rem]"
          >
            {props.leftButton}
          </button>
          <button
            type="submit"
            onClick={props.onClickRight}
            className="min-w-[7.625rem] rounded-[1.875rem] bg-primary-base px-[1.375rem] py-[.625rem] text-white"
          >
            {props.rightButton}
          </button>
        </div>
      </dialog>
    </div>
  );
};
