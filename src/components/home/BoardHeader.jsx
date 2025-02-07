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
                        navigate(`${path.board.base}`)
                    }
                    else if (generateBoardTitle(title) === "how-to-live-in-korea") {    // 추후 디자인이나 백엔드에서 넘겨주는 형식에 따라 바뀔 예정
                        navigate(`${path.board.base}/tips-for-living-in-korea`)
                    }
                    else {
                        navigate(`${path.board.base}/${generateBoardTitle(title)}`)
                    }
                }}>
                <p>more</p>
                <img src={more} alt="See More"
                    className=" w-[.875rem] text-neutral-base" />
            </button>
        </div>
    )
}