import anonymous from '@/assets/imgs/anonymous.svg';
import Like from '@/assets/imgs/like.svg?react';
import FillLike from '@/assets/imgs/fillLike.svg?react';
import Comment from '@/assets/imgs/comment.svg?react';
import { formatTime } from '@/utils/formatTime';
import { useRef } from 'react';
import { cn } from '@/utils/cn';
import { TranslateButton } from '@/components/common/TranslateButton';
import { Translating } from '@/components/common/Translating';
import { useTextTranslate } from '@/state/mutation/common/useTextTranslate';
export const PostComment = ({
  data,
  setInputFocus,
  focusedComment,
  setFocusedComment,
  handleCommentLike,
}) => {
  const commentRef = useRef(null);
  const {
    translateState,
    setTranslateState,
    translatedContent,
    translatePending,
    handleTranslate,
  } = useTextTranslate(data?.content);
  const handleComment = (ref, commentId, parentId) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setFocusedComment({
      parentId: parentId,
      targetId: commentId,
    });
    setInputFocus(true);
  };
  return (
    <>
      <div
        ref={commentRef}
        className={cn('flex flex-col gap-2 px-4 py-[0.9375rem] text-base', {
          'bg-primary-10': focusedComment?.targetId === data.commentId,
          'bg-white': focusedComment?.targetId !== data.commentId,
        })}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={anonymous} className="h-[1.375rem] w-[1.375rem]" />
            <p>
              {data?.author === 'Author' ? (
                <span className="text-[#2768FF]">Anonymity(Author)</span>
              ) : (
                data?.author
              )}
            </p>
            <p className="text-extraSmall text-neutral-border-50">
              {formatTime(data?.createdTime)}
            </p>
          </div>
          <div className="flex gap-1 text-neutral-base">
            <button
              className="flex cursor-pointer gap-[0.125rem]"
              onClick={() =>
                handleCommentLike({
                  type: data?.isLiked,
                  commentId: data?.commentId,
                })
              }
            >
              {data?.isLiked ? (
                <FillLike className="h-6 w-6 text-primary-red" />
              ) : (
                <Like className="h-6 w-6 text-neutral-base" />
              )}
              <p className="text-small">{data?.likes}</p>
            </button>
            <button className="flex cursor-pointer gap-[0.125rem]">
              <Comment className="h-6 w-6" />
              <p className="text-small">
                {data?.replies ? data?.replies?.length : 0}
              </p>
            </button>
          </div>
        </div>
        <p className="relative whitespace-pre-line leading-normal text-neutral-base">
          {translateState ? translatedContent : data?.content}
        </p>
        <div className="flex justify-between">
          <div
            className="cursor-pointer text-neutral-border-50"
            onClick={(e) => {
              e.stopPropagation();
              handleComment(commentRef, data.commentId, data.commentId);
            }}
          >
            Reply
          </div>
          {translatePending ? (
            <Translating size="small" />
          ) : (
            <TranslateButton
              handleTranslate={handleTranslate}
              state={translateState}
              setState={setTranslateState}
              size="small"
              color="title"
            />
          )}
        </div>
      </div>
      {data?.replies?.map((item) => (
        <ReplyComment
          reply={data.author}
          data={item}
          key={item.commentId}
          focusedComment={focusedComment}
          handleComment={handleComment}
          handleCommentLike={handleCommentLike}
        />
      ))}
    </>
  );
};
const ReplyComment = ({
  reply,
  data,
  focusedComment,
  handleComment,
  handleCommentLike,
}) => {
  const commentRef = useRef(null);
  const {
    translateState,
    setTranslateState,
    translatedContent,
    translatePending,
    handleTranslate,
  } = useTextTranslate(data?.content);

  return (
    <div
      ref={commentRef}
      className={cn(
        'flex flex-col gap-2 py-[0.9375rem] pl-[2.8125rem] pr-4 text-base',
        {
          'bg-primary-10': focusedComment?.targetId === data.commentId,
          'bg-white': focusedComment?.targetId !== data.commentId,
        },
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img src={anonymous} className="h-[1.375rem] w-[1.375rem]" />
          <p>
            {data.author === 'Author' ? (
              <span className="text-[#2768FF]">Anonymity(Author)</span>
            ) : (
              data.author
            )}
          </p>
          <p className="text-extraSmall text-neutral-border-50">
            {formatTime(data.createdTime)}
          </p>
        </div>
        <button
          className="flex cursor-pointer gap-[0.125rem]"
          onClick={() =>
            handleCommentLike({ type: data.isLiked, commentId: data.commentId })
          }
        >
          {data.isLiked ? (
            <FillLike className="h-6 w-6 text-primary-red" />
          ) : (
            <Like className="h-6 w-6 text-neutral-base" />
          )}
          <p className="text-small text-neutral-base">{data.likes}</p>
        </button>
      </div>
      <p className="relative whitespace-pre-line leading-normal text-neutral-base">
        <span className="text-primary-base">
          @{reply === 'Author' ? 'Anonymity(Author)' : reply}&nbsp;
        </span>
        {translateState ? translatedContent : data?.content}
      </p>
      <div className="flex justify-between">
        <div
          className="cursor-pointer text-neutral-border-50"
          onClick={(e) => {
            e.stopPropagation();
            handleComment(commentRef, data.commentId, data.parentId);
          }}
        >
          Reply
        </div>
        {translatePending ? (
          <Translating size="small" />
        ) : (
          <TranslateButton
            handleTranslate={handleTranslate}
            state={translateState}
            setState={setTranslateState}
            size="small"
            color="title"
          />
        )}
      </div>
    </div>
  );
};
