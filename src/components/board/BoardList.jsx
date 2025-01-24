import { BoardList } from "./BoardListBox"
export const BoardListBox = ({ list, listKey, togglePin }) => {
    return (
        <div className="flex flex-col w-full bg-[#EAEAEA] rounded-lg divide-y divide-white">
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