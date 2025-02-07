import { BoardList } from "./BoardList"
export const BoardListBox = ({ list, listKey, togglePin }) => {
    return (
        <div className="flex flex-col w-full bg-neutral-bg-5 rounded-lg">
            {list.map((data, index) => {
                return (
                    <BoardList
                        data={data}
                        key={index}
                        listKey={listKey}
                        index={index}
                        togglePin={togglePin}
                    />
                )
            })}
        </div>
    )
}