import Like from '@/assets/imgs/icon/like.svg?react';
import Comment from '@/assets/imgs/icon/comment.svg?react';
import { ScrapComponent } from '../common/ScrapComponent';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';

export const TipsPostList = ({ data, boardId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex cursor-pointer justify-between gap-4 pb-3 pt-5"
      onClick={() => navigate(`${data.postId}`)}
    >
      <div className="flex flex-col justify-between">
        <p className="text-subTitle text-neutral-title">{data.title}</p>
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like aria-hidden="true" />
            <span>{data.likeCount}</span>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Comment aria-hidden="true" />
            <span>{data.commentCount}</span>
          </div>
          <div className="text-small text-neutral-border-50">
            {formatTime(data.createdTime)}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={data.thumbnailUrl ?? undefined}
          alt={data.title + ' thumbnail'}
          className="h-[5.75rem] w-[5.75rem] shrink-0 border-none bg-neutral-bg-10 object-cover"
        />
        <ScrapComponent
          state={data.isScrapped}
          id={data.postId}
          postType={'CARDNEWS'}
          className="h-[1.875rem] w-[1.875rem] shrink-0"
          boardId={boardId}
        />
      </div>
    </div>
  );
};
