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
    <div className="max-w-lg mx-auto min-h-dvh w-full h-full overflow-x-hidden overflow-y-auto bg-[rgba(11,11,11,0.6)] fixed flex z-[100] justify-center items-center align-middle">
      <dialog className="relative z-[200] flex flex-col items-center justify-center bg-white border py-[1.875rem] gap-[1.875rem] mx-4 rounded-[.625rem]">
        <div className="flex items-center justify-center w-full text-center align-middle text-subTitle">
          {props.title}
        </div>
        <div className="flex items-center justify-center w-full px-10 text-base text-center align-middle text-neutral-base">
          {props.text}
        </div>
        <div className="flex flex-row gap-4">
          <button
            type="submit"
            onClick={props.onClickLeft}
            className="border rounded-[1.875rem] py-[.625rem] px-[1.375rem] min-w-[7.625rem]"
          >
            {props.leftButton}
          </button>
          <button
            type="submit"
            onClick={props.onClickRight}
            className="rounded-[1.875rem] bg-primary-base text-white py-[.625rem] px-[1.375rem] min-w-[7.625rem]"
          >
            {props.rightButton}
          </button>
        </div>
      </dialog>
    </div>
  );
};
