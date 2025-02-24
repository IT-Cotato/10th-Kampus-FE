import Like from '../../assets/imgs/like.svg?react';
import Comment from '../../assets/imgs/comment.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { Translating } from '../common/Translating';
import { cn } from '@/utils/cn';
import { TranslateButton } from '../common/TranslateButton';
import { usePostTranslate } from '@/hooks/usePostTranslate';
export const PostList = ({ data, isActive, ...props }) => {
  const navigate = useNavigate();
  const {
    translateState,
    setTranslateState,
    translatedPost,
    translatePending,
    handleTranslate
  } = usePostTranslate(data.id)

  const handleOnClick = (data) => {
    if (props.onClick) {
      props.onClick(data);
    } else {
      navigate(`${data.id}`);
    }
  };
  return (
    <div
      className="flex flex-col w-full gap-3 pt-4 pb-3 cursor-pointer"
      onClick={() => handleOnClick(data)}
    >
      {isActive /** 인기 게시판 레이아웃 */ && (
        <div className="w-fit rounded-md bg-primary-10 px-[0.625rem] py-[0.3125rem] text-small text-neutral-base">
          {data.boardName}
        </div>
      )}
      <div className="flex justify-between w-full gap-3">
        <div className="relative flex flex-col w-full">
          <div className="flex w-full gap-3">
            <div className="flex flex-col w-full">
              <h1 className="flex w-full text-subTitle text-neutral-title">
                <span
                  className={cn('line-clamp-1', {
                    'opacity-0': translatePending,
                  })}
                >
                  {translateState ? translatedPost.title : data?.title}
                </span>
              </h1>
              <h2 className="flex w-full line-clamp-2 text-neutral-base">
                <span
                  className={cn('line-clamp-2', {
                    'opacity-0': translatePending,
                  })}
                >
                  {translateState ? translatedPost.content : data?.content}
                </span>
              </h2>
            </div>
            {data.thumbnailUrl && (
              <div className="flex flex-shrink-0 w-20 h-20">
                <img
                  src={data.thumbnailUrl}
                  alt="post image"
                  className="object-cover w-20 h-20"
                />
              </div>
            )}
          </div>
          {translatePending && (
            <div className="absolute left-0 -translate-y-1/2 top-1/2">
              <Translating width={'3rem'} height={'3rem'} />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like />
            <p>{data.likes}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Comment />
            <p>{data.comments}</p>
          </div>
          <p className="text-small text-neutral-border-50">
            {formatTime(data.createdTime)}
          </p>
        </div>
        <TranslateButton handleTranslate={handleTranslate}
          state={translateState} setState={setTranslateState}
          size='small' color='title' />
      </div>
    </div >
  );
};
