import Close from "@/assets/imgs/x.svg?react"
export const RecentSearch = ({ startSearch }) => {
    const recentData = [
        "Hospital",
        "Food",
        "Food",
        "Universityeeeeeeeee",
        "Universityeeeeeeeee",
        "Hospital",
        "University",
        "Food",
    ];
    const emptyData = [];
    const RecordBox = ({ text }) => {
        return (
            <div className="flex items-center px-3 py-[0.3125rem] gap-[0.625rem] rounded-full border border-neutral-border-30 cursor-pointer">
                {/** 클릭 시, 검색 값 text 값으로 만들고 검색하는 로직으로 가기 */}
                <p className="text-base text-neutral-border-50 max-w-28 text-ellipsis overflow-hidden"
                    onClick={() => { startSearch(text) }}>
                    {text}
                </p>
                {/** 클릭 시, 해당 검색어 기록에서 삭제 하고 서버와 통신 */}
                <Close className="w-3 h-3 text-neutral-border-50" />
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full gap-[0.875rem] pt-4">
            <div className="flex justify-between w-full items-end">
                <h1 className="text-subTitle text-neutral-border-50">Recent searches</h1>
                {/** 아래 삭제 누를 시, 서버와 통신하여 최근 검색 기록 전체 삭제 */}
                <h2 className="text-base text-neutral-border-40">Delete all</h2>
            </div>
            {recentData.length ?
                <div className="flex gap-3 flex-wrap overflow-hidden max-h-24">
                    {recentData.map((item, index) => (
                        <RecordBox text={item} key={index} />
                    ))}
                </div>
                :
                <div className="text-base text-neutral-border-50 pt-4">
                    There are no recent searches.
                </div>
            }
        </div>
    )
}