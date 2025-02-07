import { generateBoardTitle } from "@/utils/boardTitleUtils"
import { path } from "@/routes/path"
import { useNavigate } from "react-router-dom"
export const BoxList = ({ text }) => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-5 items-center cursor-pointer"
            onClick={() => navigate(`${path.board.base}/${generateBoardTitle(text.board)}/${text.postID}`)}>
            <h1 className="text-subTitle text-neutral-title">{text.board}</h1>
            <h2 className="text-base text-neutral-base">{text.title}</h2>
        </div>
    )
}