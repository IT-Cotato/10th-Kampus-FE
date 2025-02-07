import more from "@/assets/imgs/more.svg"
import { BoxList } from "./boxList"
import { generateBoardTitle } from "@/utils/boardTitleUtils"
import { useNavigate } from "react-router-dom"
export const BoardBox = ({ boardTitle, data, path }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h1 className="text-pageTitle text-neutral-title">{boardTitle}</h1>
                <button className="flex items-center text-small text-neutral-base gap-[0.125rem]"
                    onClick={() => {
                        if (generateBoardTitle(boardTitle) !== '') {
                            navigate(`${path.board.base}/${generateBoardTitle(boardTitle)}`)
                        }
                        else {
                            navigate(`${path.board.base}`)
                        }
                    }}>
                    <p>more</p>
                    <img src={more} alt="See More"
                        className=" w-[.875rem] text-neutral-base" />
                </button>
            </div>
            <div className="flex flex-col w-full bg-neutral-bg-5 px-5 py-[.625rem] rounded-[.625rem] gap-5 min-h-[15.625rem]">
                {data.map((text, index) => (
                    <BoxList key={index} text={text} />
                ))}
            </div>
        </div>
    )
}