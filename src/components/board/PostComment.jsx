import anonymous from '@/assets/imgs/icon/anonymous.svg';
import Like from '@/assets/imgs/icon/like.svg?react';
import FillLike from '@/assets/imgs/icon/active-heart.svg?react';
import Comment from '@/assets/imgs/icon/comment.svg?react';
import { formatTime } from '@/utils/formatTime';
import { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { TranslateButton } from '@/components/common/TranslateButton';
import { Translating } from '@/components/common/Translating';
import { useTextTranslate } from '@/state/mutation/common/useTextTranslate';
import { Modal, MODAL_TYPES } from '@/components/common/Modal';

export const PostComment = ({
  data,
  setInputFocus,
  focusedComment,
  setFocusedComment,
  handleCommentLike,
  handleComment,
}) => {
  const commentRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    translateState,
    setTranslateState,
    translatedContent,
    translatePending,
    handleTranslate,
  } = useTextTranslate(data?.content);

  const handleReply = (ref, commentId, parentId) => {
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

  const handleConfirmDelete = () => {
    handleComment({ type: false, param: data.commentId });
    setIsDeleteModalOpen(false);
  };

  const isDeleted = data.commentStatus === 'DELETED_BY_USER';

  return (
    <>
      <div
        ref={commentRef}
        className={cn('flex flex-col gap-2 px-4 py-[0.9375rem] text-base', {
          'bg-primary-10':
            focusedComment?.targetId === data.commentId && !isDeleted,
          'bg-white': focusedComment?.targetId !== data.commentId,
        })}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={anonymous} className="h-[1.375rem] w-[1.375rem]" />
            <p>
              {isDeleted ? (
                <span className="text-neutral-disabled">Deleted</span>
              ) : data?.author === 'Author' ? (
                <span className="text-[#2768FF]">Anonymity(Author)</span>
              ) : (
                data?.author
              )}
            </p>
            <p className="text-extraSmall text-neutral-border-50">
              {formatTime(data?.createdTime)}
            </p>
          </div>
          {!isDeleted && (
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
          )}
        </div>
        <p className="relative whitespace-pre-line leading-normal text-neutral-base">
          {isDeleted ? (
            <span className="text-neutral-disabled">
              This comment has been deleted
            </span>
          ) : translateState ? (
            translatedContent
          ) : (
            data?.content
          )}
        </p>
        {!isDeleted && (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div
                className="cursor-pointer text-neutral-border-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReply(commentRef, data.commentId, data.commentId);
                }}
              >
                Reply
              </div>
              {data.isAuthor && (
                <div
                  className="cursor-pointer text-neutral-border-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </div>
              )}
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
        )}
      </div>
      {data?.replies?.map((item) => (
        <ReplyComment
          reply={item.targetAuthor}
          data={item}
          key={item.commentId}
          focusedComment={focusedComment}
          handleComment={handleComment}
          handleCommentLike={handleCommentLike}
          handleReply={handleReply}
        />
      ))}

      {isDeleteModalOpen && (
        <Modal
          type={MODAL_TYPES.CONFIRM}
          title="Are you sure you want to delete this comment?"
          onClickRight={handleConfirmDelete}
          onClickLeft={() => setIsDeleteModalOpen(false)}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

const ReplyComment = ({
  reply,
  data,
  focusedComment,
  handleReply,
  handleCommentLike,
  handleComment,
}) => {
  const commentRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    translateState,
    setTranslateState,
    translatedContent,
    translatePending,
    handleTranslate,
  } = useTextTranslate(data?.content);

  const handleConfirmDelete = () => {
    handleComment({ type: false, param: data.commentId });
    setIsDeleteModalOpen(false);
  };

  const isDeleted = data.commentStatus === 'DELETED_BY_USER';

  return (
    <div
      ref={commentRef}
      className={cn(
        'flex flex-col gap-2 py-[0.9375rem] pl-[2.8125rem] pr-4 text-base',
        {
          'bg-primary-10':
            focusedComment?.targetId === data.commentId && !isDeleted,
          'bg-white': focusedComment?.targetId !== data.commentId,
        },
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img src={anonymous} className="h-[1.375rem] w-[1.375rem]" />
          <p>
            {isDeleted ? (
              <span className="text-neutral-disabled">Deleted</span>
            ) : data.author === 'Author' ? (
              <span className="text-[#2768FF]">Anonymity(Author)</span>
            ) : (
              data.author
            )}
          </p>
          <p className="text-extraSmall text-neutral-border-50">
            {formatTime(data.createdTime)}
          </p>
        </div>
        {!isDeleted && (
          <button
            className="flex cursor-pointer gap-[0.125rem]"
            onClick={() =>
              handleCommentLike({
                type: data.isLiked,
                commentId: data.commentId,
              })
            }
          >
            {data.isLiked ? (
              <FillLike className="h-6 w-6 text-primary-red" />
            ) : (
              <Like className="h-6 w-6 text-neutral-base" />
            )}
            <p className="text-small text-neutral-base">{data.likes}</p>
          </button>
        )}
      </div>
      <p className="relative whitespace-pre-line leading-normal text-neutral-base">
        {isDeleted ? (
          <span className="text-neutral-disabled">
            This comment has been deleted
          </span>
        ) : (
          <>
            <span className="text-primary-base">
              @{reply === 'Author' ? 'Anonymity(Author)' : reply}&nbsp;
            </span>
            {translateState ? translatedContent : data?.content}
          </>
        )}
      </p>
      {!isDeleted && (
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div
              className="cursor-pointer text-neutral-border-50"
              onClick={(e) => {
                e.stopPropagation();
                handleReply(commentRef, data.commentId, data.parentId);
              }}
            >
              Reply
            </div>
            {data.isAuthor && (
              <div
                className="cursor-pointer text-neutral-border-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete
              </div>
            )}
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
      )}

      {isDeleteModalOpen && (
        <Modal
          type={MODAL_TYPES.CONFIRM}
          title="Are you sure you want to delete this comment?"
          onClickRight={handleConfirmDelete}
          onClickLeft={() => setIsDeleteModalOpen(false)}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};
