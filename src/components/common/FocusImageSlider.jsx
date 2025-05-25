import { useEffect, useState, useRef } from 'react';
import Close from '@/assets/imgs/x.svg?react';
import { ModalPortal } from './Modal';

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

  const [isBackgroundTouched, setIsBackgroundTouched] = useState(false);

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
          transform: `translateX(${result}px)`,
          transition: '0ms',
        });
      }
    }
  };

  const touchEnd = (e) => {
    const end = e.changedTouches[0].pageX;
    if (touch.start - end > flexRef.current.clientWidth / 6) {
      if (currentImgIndex < images.length - 1) {
        setCurrentImgIndex((prev) => prev + 1);
        setStyle({
          transform: `translateX(-${currentImgIndex + 1}00%)`,
          transition: `all 0.4s ease-in-out`,
        });
      }
    } else if (end - touch.start > flexRef.current.clientWidth / 6) {
      if (currentImgIndex > 0) {
        setCurrentImgIndex((prev) => prev - 1);
        setStyle({
          transform: `translateX(-${currentImgIndex - 1}00%)`,
          transition: `all 0.4s ease-in-out`,
        });
      }
    } else {
      setStyle({
        transform: `translateX(-${currentImgIndex}00%)`,
        transition: `all 0.3s ease-in-out`,
      });
    }

    setTouch({
      ...touch,
      end,
    });
  };

  // 배경 클릭 시 닫기 버튼 및 사진 인덱스 안보이게
  const handleTouchBackground = () => {
    setIsBackgroundTouched((prev) => !prev);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setImageFocus(false);
  };

  return (
    <ModalPortal>
      <div
        className="justsify-center fixed inset-0 z-[200] mx-auto flex h-full min-h-dvh w-full max-w-lg flex-col justify-center bg-black"
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onClick={handleTouchBackground}
      >
        {!isBackgroundTouched && (
          <div className="absolute top-5 flex w-full items-center justify-center text-subTitle text-white">
            <h1>
              {currentImgIndex + 1}/{images && images.length}
            </h1>
            <Close
              aria-label="Close button"
              className="absolute left-5 h-5 w-5 text-white"
              onClick={handleClose}
            />
          </div>
        )}
        <div className="relative">
          <div className="max-h-[60vh] w-full overflow-hidden">
            <div ref={flexRef} className="flex" style={style}>
              {images &&
                images.map((image, index) => (
                  <div key={index} className="aspect-square w-full flex-none">
                    <img
                      src={image}
                      className="inset-0 h-full w-full object-contain"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
