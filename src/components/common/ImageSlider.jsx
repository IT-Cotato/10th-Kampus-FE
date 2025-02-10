import { useState, useRef } from "react";
import { cn } from "@/utils/cn";
export const ImageSlider = ({ images }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [style, setStyle] = useState({
        transform: `translateX(-${currentImgIndex}00%)`,
        transition: `all 0.4s ease-in-out`,
    });
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
    }
    const touchMove = (e) => {
        if (flexRef.current) {
            const current = flexRef.current.clientWidth * currentImgIndex;
            const result = -current + (e.targetTouches[0].pageX - touch.start);
            if (result < 0 && result > -flexRef.current.clientWidth * (images.length - 1)) {
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
                setCurrentImgIndex(prev => prev + 1);
                setStyle({
                    transform: `translateX(-${currentImgIndex + 1}00%)`,
                    transition: `all 0.4s ease-in-out`,
                });
            }
        } else {
            if (currentImgIndex > 0) {
                setCurrentImgIndex(prev => prev - 1);
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
        <div className="relative"
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
        >
            <div
                className="overflow-hidden w-full rounded-md">
                <div ref={flexRef} className="flex" style={style}>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className="w-full object-cover aspect-square"
                        />
                    ))}
                </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={cn("w-2 h-2 rounded-full cursor-pointer", index === currentImgIndex ? "bg-primary-30" : "bg-neutral-disabled")}
                    />
                ))}
            </div>
        </div>
    )
}