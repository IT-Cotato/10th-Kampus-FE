import Pin from "@/assets/imgs/pin.svg?react"
export const BoardList = ({ data, listKey, index, togglePin }) => {
    return (
        <div className="flex gap-4 px-4 py-4 items-center">
            <Pin className={data.pin ? `w-5 h-5 text-[#525252]` : `w-5 h-5 text-[#8E8E8E]`}
                onClick={() => togglePin(listKey, index)}
            />
            <p className=" text-base text-[#525252]">{data.title}</p>
        </div>
    )
}