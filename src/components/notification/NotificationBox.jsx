import commentNoti from '@/assets/imgs/commentNoti.svg';
import trendingNoti from '@/assets/imgs/trendingNoti.svg';
import X from '@/assets/imgs/x.svg?react';
import { cn } from '@/utils/cn';
export const NotificationBox = ({ data }) => {
  const handleDelete = () => {
    console.log('Delete');
  };
  return (
    <div
      className={cn('relative flex w-full items-center gap-5 px-4 py-4', {
        'bg-primary-10': !data.isRead,
        'bg-white': data.isRead,
      })}
    >
      <img
        src={data.type === 'comment' ? commentNoti : trendingNoti}
        className="h-10 w-10"
      />
      <div className="flex flex-col gap-2 truncate whitespace-nowrap">
        <p className="text-small text-neutral-base">{data.createdTime}</p>
        <p className="text-subTitle text-neutral-title">{data.title}</p>
        <p className="text-small text-neutral-border-50">{data.content}</p>
      </div>
      <X
        className="absolute right-4 top-4 h-[1.125rem] w-[1.125rem] text-neutral-border-50"
        onClick={() => handleDelete()}
      />
    </div>
  );
};
