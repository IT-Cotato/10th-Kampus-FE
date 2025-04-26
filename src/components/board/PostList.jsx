import Like from '../../assets/imgs/like.svg?react';
import Comment from '../../assets/imgs/comment.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { Translating } from '../common/Translating';
import { cn } from '@/utils/cn';
import { TranslateButton } from '../common/TranslateButton';
import { usePostTranslate } from '@/hooks/usePostTranslate';
export const PostList = ({ data, isTrendingBoard, ...props }) => {
  const navigate = useNavigate();
  const {
    translateState,
    setTranslateState,
    translatedPost,
    translatePending,
    handleTranslate,
  } = usePostTranslate(data?.id);
  const handleOnClick = (data) => {
    if (props.onClick) {
      props.onClick(data);
    } else {
      navigate(`${data?.id}`);
    }
  };
  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-3 pb-3 pt-4"
      onClick={() => handleOnClick(data)}
    >
      {isTrendingBoard /** 인기 게시판 레이아웃 */ && (
        <div className="w-fit rounded-md bg-primary-10 px-[0.625rem] py-[0.3125rem] text-small text-neutral-base">
          {data?.boardName}
        </div>
      )}
      <div className="flex w-full justify-between gap-3">
        <div className="relative flex w-full flex-col">
          <div className="flex w-full gap-3">
            <div className="flex w-full flex-col">
              <h1 className="flex w-full text-subTitle text-neutral-title">
                <span
                  className={cn('line-clamp-1', {
                    'opacity-0': translatePending,
                  })}
                >
                  {translateState ? translatedPost.title : data?.title}
                </span>
              </h1>
              <h2 className="line-clamp-2 flex w-full text-neutral-base">
                <span
                  className={cn('line-clamp-2', {
                    'opacity-0': translatePending,
                  })}
                >
                  {translateState ? translatedPost.content : data?.content}
                </span>
              </h2>
            </div>
            {data?.thumbnailUrl && (
              <div className="flex h-20 w-20 flex-shrink-0">
                <img
                  src={data?.thumbnailUrl}
                  alt="post image"
                  className="h-20 w-20 object-cover"
                />
              </div>
            )}
          </div>
          {translatePending && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <Translating width={'3rem'} height={'3rem'} />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like />
            <p>{data?.likes}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Comment />
            <p>{data?.comments}</p>
          </div>
          <p className="text-small text-neutral-border-50">
            {formatTime(data?.createdTime)}
          </p>
        </div>
        <TranslateButton
          handleTranslate={handleTranslate}
          state={translateState}
          setState={setTranslateState}
          size="small"
          color="title"
        />
      </div>
    </div>
  );
};
