import Pin from "@/assets/imgs/pin.svg?react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/utils/cn";
import { generateBoardTitle } from "@/utils/boardTitleUtils";
export const BoardList = ({ data, listKey, index, togglePin }) => {
    const navigate = useNavigate();
    // title에서 URL 뽑기
    // 예시: Tips for living in Korea -> Tips-for-living-in-Korea
    const navURL = generateBoardTitle(data.title);
    return (
        <div className="flex gap-4 px-4 py-4 items-center">
            <Pin className={cn('w-5 h-5 cursor-pointer', { 'text-neutral-80': data.pin, 'text-neutral-icon': !data.pin })}
                onClick={() => togglePin(listKey, index)}
            />
            <p className=" text-base text-neutral-80 w-full cursor-pointer"
                onClick={() => navigate(`./${navURL}`)}
            >{data.title}</p>
        </div>
    )
}