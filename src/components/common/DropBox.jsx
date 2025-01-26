import { cn } from "@/utils/cn"
import Dropdown from '../../assets/imgs/dropdown.svg?react'
export const DropBox = ({ state, content, dropList, toggle, select, selected }) => {
    return (
        <div
            onClick={toggle}
            className={cn('relative flex justify-center items-center gap-3 px-[1.125rem] rounded-full py-[0.375rem] border', { 'border-primary-30': selected !== 'All' || state, ' shadow-md': selected === 'All' && !state })}>
            <p className={cn('text-base font-normal', { 'text-neutral-title': selected !== 'All' || state, 'text-[#8E8E8E]': selected === 'All' && !state })}>{selected !== 'All' ? selected : content}</p>
            <Dropdown className={cn('w-3 h-3', { 'text-neutral-title': selected !== 'All' || state, 'text-[#8E8E8E] rotate-180': selected === 'All' && !state })} />
            {state &&
                <div className="absolute top-[3.125rem] w-full gap-[0.625rem] px-4 rounded-[0.625rem] border shadow-md bg-white">
                    {dropList.map((category) =>
                        <p
                            key={category}
                            onClick={() => select(category)}
                            className="text-base text-neutral-title py-1 w-full">
                            {category}</p>
                    )}
                </div>
            }
        </div>
    )
}