import Pin from "@/assets/imgs/pin.svg?react"
import { useNavigate } from "react-router-dom"
import { generateBoardTitle } from "@/utils/boardTitleUtils";
export const BoardList = ({ data, listKey, index, togglePin }) => {
    const navigate = useNavigate();
    // title에서 URL 뽑기
    // 예시: Tips for living in Korea -> Tips-for-living-in-Korea
    const navURL = generateBoardTitle(data.title);
    return (
        <div className="flex gap-4 px-4 py-4 items-center">
            <Pin className={data.pin ? `w-5 h-5 text-[#525252]` : `w-5 h-5 text-[#8E8E8E]`}
                onClick={() => togglePin(listKey, index)}
            />
            <p className=" text-base text-[#525252] w-full"
                onClick={() => navigate(`/board/${navURL}`)}
            >{data.title}</p>
        </div>
    )
}