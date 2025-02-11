import { useEffect, useState, useRef } from 'react';
import Close from '@/assets/imgs/x.svg?react';
export const FocusImageSlider = ({
  images,
  setImageFocus,
  currentImgIndex,
  setCurrentImgIndex,
  style,
  setStyle,
}) => {
  useEffect(() => {
    // 스크롤 막기
    document.body.style.overflow = 'hidden';

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = 'auto';
    };
  }, []);
  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });
  const flexRef = useRef(null);
  const touchStart = (e) => {
    setTouch({
      ...touch,
      start: e.touches[0].pageX,
    });
  };
  const touchMove = (e) => {
    if (flexRef.current) {
      const current = flexRef.current.clientWidth * currentImgIndex;
      const result = -current + (e.targetTouches[0].pageX - touch.start);
      if (
        result < 0 &&
        result > -flexRef.current.clientWidth * (images.length - 1)
      ) {
        setStyle({
          transform: `translate3d(${result}px, 0px, 0px)`,
          transition: '0ms',
        });
      }
    }
  };
  const touchEnd = (e) => {
    const end = e.changedTouches[0].pageX;
    if (touch.start > end) {
      if (currentImgIndex < images.length - 1) {
        setCurrentImgIndex((prev) => prev + 1);
        setStyle({
          transform: `translateX(-${currentImgIndex + 1}00%)`,
          transition: `all 0.4s ease-in-out`,
        });
      }
    } else {
      if (currentImgIndex > 0) {
        setCurrentImgIndex((prev) => prev - 1);
        setStyle({
          transform: `translateX(-${currentImgIndex - 1}00%)`,
          transition: `all 0.4s ease-in-out`,
        });
      }
    }

    setTouch({
      ...touch,
      end,
    });
  };
  return (
    <div className="fixed z-50 flex h-full w-full max-w-[512px] flex-col items-center bg-black">
      <div className="mt-5 flex items-center justify-center text-subTitle text-white">
        <h1>
          {currentImgIndex + 1}/{images.length}
        </h1>
        <button
          className="absolute left-5"
          onClick={() => setImageFocus(false)}
        >
          <Close className="h-5 w-5" />
        </button>
      </div>
      <div
        className="relative my-20"
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        <div className="max-h-[60vh] w-full overflow-hidden">
          <div ref={flexRef} className="flex" style={style}>
            {images.map((image, index) => (
              <img key={index} src={image} className="w-full object-contain" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
