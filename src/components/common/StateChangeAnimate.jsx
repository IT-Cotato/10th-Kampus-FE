import ReactDOM from 'react-dom';

export const StateChangeAnimate = ({ state, changeToTrueText, changeToFalseText }) => {
    // 포털을 사용해 렌더링할 대상 DOM 요소 선택
    const portalRoot = document.getElementById('portal-root');

    // 포털이 적용된 컴포넌트 반환
    return ReactDOM.createPortal(
        <>
            <div className="absolute inset-0 z-40 flex justify-center items-center bg-neutral-700  
        animate-fadeInOutModal"
            />
            <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        rounded-xl px-12 py-4 bg-white animate-fadeInOutText"
            >
                <p className="truncate text-[#525252]">
                    {state ? `${changeToFalseText}` : `${changeToTrueText}`}
                </p>
            </div>
        </>,
        portalRoot // 포털 대상 지정
    );
};