import { useState, useRef } from 'react';
import { cn } from '@/utils/cn';
export const ImageSlider = ({
  images,
  currentImgIndex,
  setCurrentImgIndex,
  style,
  setStyle,
}) => {
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
    if (Math.abs(end - touch.start) > 10) {
      // 포커스 이미지 슬라이더 켜기 위해 터치 시, 변경 X
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
    }
  };

  return (
    <div
      className="relative"
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
    >
      <div className="w-full overflow-hidden rounded-md">
        <div ref={flexRef} className="flex" style={style}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>
      </div>
      <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-1">
        {images.length > 1 &&
          (() => {
            const total = images.length;
            const maxDots = 5;
            let dotsToDisplay = [];

            if (total <= maxDots) {
              dotsToDisplay = Array.from({ length: total }, (_, i) => i);
            } else {
              const start = Math.max(
                0,
                Math.min(currentImgIndex - 2, total - maxDots),
              );
              dotsToDisplay = Array.from(
                { length: maxDots },
                (_, i) => start + i,
              );
            }

            return dotsToDisplay.map((index) => (
              <div
                key={index}
                className={cn(
                  'h-2 w-2 flex-shrink-0 transform cursor-pointer rounded-full transition-transform duration-300',
                  {
                    'scale-125 bg-primary-30': index === currentImgIndex,
                    'scale-75 bg-neutral-disabled':
                      index !== currentImgIndex &&
                      Math.abs(index - currentImgIndex) < 2,
                    'scale-50 bg-neutral-disabled':
                      index !== currentImgIndex &&
                      Math.abs(index - currentImgIndex) >= 2,
                  },
                )}
              />
            ));
          })()}
      </div>
    </div>
  );
};
