import { useState, useRef } from "react";
export const imgaeSlider = ({ images }) => {
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
        };
    }
    const touchEnd = (e) => {
        const end = e.changedTouches[0].pageX;
        if (Math.abs(end - touch.start) > 10) { // 포커스 이미지 슬라이더 켜기 위해 터치 시, 변경 X
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
        }
    };
}