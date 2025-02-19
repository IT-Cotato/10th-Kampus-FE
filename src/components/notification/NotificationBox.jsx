import commentNoti from "@/assets/imgs/commentNoti.svg";
import trendingNoti from "@/assets/imgs/trendingNoti.svg";
import X from "@/assets/imgs/x.svg?react";
import { cn } from "@/utils/cn";
export const NotificationBox = ({ data }) => {
    const handleDelete = () => {
        console.log("Delete");
    }
    return (
        <div className={cn("relative w-full flex items-center px-4 py-4 gap-5",
            {
                "bg-primary-10": !data.isRead,
                "bg-white": data.isRead
            })}>
            <img src={data.type === "comment" ? commentNoti : trendingNoti} className="w-10 h-10" />
            <div className="flex flex-col gap-2 truncate whitespace-nowrap">
                <p className="text-neutral-base text-small">{data.createdTime}</p>
                <p className="text-neutral-title text-subTitle">{data.title}</p>
                <p className="text-neutral-border-50 text-small">{data.content}</p>
            </div>
            <X className="absolute top-4 right-4 w-[1.125rem] h-[1.125rem] text-neutral-border-50"
                onClick={() => handleDelete()} />
        </div>
    )
}