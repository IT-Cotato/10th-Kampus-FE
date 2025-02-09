import { BoxList } from "./boxList"
import { BoardHeader } from "./BoardHeader"
import { CardPost } from "./boxList"
export const BoardBox = ({ boardTitle, data, path }) => {
    return (
        <div className="flex flex-col gap-5">
            <BoardHeader title={boardTitle} path={path} />
            <div className="flex flex-col w-full bg-primary-5 px-5 py-[.625rem] rounded-[.625rem] min-h-[16.875rem]">
                {data.map((text, index) => (
                    <BoxList key={index} text={text} />
                ))}
            </div>
        </div>
    )
}
export const CardPostBox = ({ data, path }) => {
    return (
        <div className="flex flex-col w-full overflow-hidden gap-[1.875rem]">
            <BoardHeader title="How to live in Korea" path={path} />
            <div className="grid grid-flow-col gap-4 overflow-x-scroll scrollbar-hide shrink-0">
                {data.map((item, index) => (
                    <CardPost key={index} data={item} />
                ))}
            </div>
        </div>
    )
}