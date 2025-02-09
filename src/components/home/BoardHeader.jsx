import { useNavigate } from "react-router-dom"
import { generateBoardTitle } from "@/utils/boardTitleUtils"
import more from "@/assets/imgs/more.svg"
export const BoardHeader = ({ title, path }) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-pageTitle text-neutral-title">{title}</h1>
            <button className="flex items-center text-small text-neutral-base gap-[0.125rem]"
                onClick={() => {
                    console.log(generateBoardTitle(title))
                    if (generateBoardTitle(title) === '') {
                        navigate(path.board.base)
                    }
                    else {
                        navigate(path.board.base + '/' + generateBoardTitle(title))
                    }
                }}>
                <p>more</p>
                <img src={more} alt="See More"
                    className=" w-[.875rem] text-neutral-base" />
            </button>
        </div>
    )
}