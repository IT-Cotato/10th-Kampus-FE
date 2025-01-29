export const StateChangeAnimate = ({ state, changeToTrueText, changeToFalseText }) => {
    return (
        <>
            <div className="absolute inset-0 z-40 flex justify-center items-center bg-neutral-700  
        animate-fadeInOutModal"
            />
            <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        rounded-xl px-12 py-4 bg-white animate-fadeInOutText"
            >
                <p className="truncate text-[#525252]">{state ? `${changeToFalseText}` : `${changeToTrueText}`}</p>
            </div>
        </>
    )
}