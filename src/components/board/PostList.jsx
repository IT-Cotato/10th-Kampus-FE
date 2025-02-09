import Like from '../../assets/imgs/like.svg?react';
import Comment from '../../assets/imgs/comment.svg?react';
import Translate from '../../assets/imgs/translate.svg?react';
export const PostList = ({ data, isActive }) => {
  return (
    <div className="flex flex-col gap-3 pt-4 pb-3">
      {isActive /** 인기 게시판 레이아웃 */ && (
        <div className="w-fit rounded-md bg-primary-10 px-[0.625rem] py-[0.3125rem] text-small text-neutral-base">
          {data.board_type}
        </div>
      )}
      <div className="flex justify-between gap-3">
        <div className="flex flex-col line-clamp-3">
          <h1 className="truncate text-subTitle text-neutral-title">{data.title}</h1>
          <h2 className="line-clamp-2 text-neutral-base">{data.content}</h2>
        </div>
        {data.image && (
          <div className="min-h-20 min-w-20">
            <img
              src={data.image}
              alt="post image"
              className="object-cover w-20 h-20"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like />
            <p>{data.like}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Comment />
            <p>{data.comment}</p>
          </div>
          <p className="text-small text-neutral-border-50">{data.time}</p>
        </div>
        <Translate className="text-neutral-title" />
      </div>
    </div>
  );
};
