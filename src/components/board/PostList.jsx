import Like from '@/assets/imgs/icon/like.svg?react';
import Comment from '@/assets/imgs/icon/comment.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { Translating } from '@/components/common/Translating';
import { TranslateButton } from '@/components/common/TranslateButton';
import { usePostTranslate } from '@/state/mutation/common/usePostTranslate';
import { BoardName } from './BoardName';

export const PostList = ({ data, hasBoardName = false, ...props }) => {
  const navigate = useNavigate();

  const {
    translateState,
    setTranslateState,
    translatedPost,
    translatePostPending,
    handleTranslate,
  } = usePostTranslate('board', data?.postId);

  const handleOnClick = (data) => {
    if (props.onClick) {
      props.onClick(data);
    } else {
      navigate(`${data?.postId}`);
    }
  };

  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-3 pb-3 pt-4"
      onClick={() => handleOnClick(data)}
    >
      {hasBoardName /** 인기 게시판 혹은 마이페이지 게시물들 레이아웃 */ && (
        <BoardName>{data?.boardName}</BoardName>
      )}
      <div className="relative flex w-full justify-between gap-3">
        <div className="flex w-full flex-col">
          <h1 className="line-clamp-1 flex w-full text-subTitle text-neutral-title">
            {translateState ? translatedPost.title : data?.title}
          </h1>
          <p className="flex w-full text-neutral-base">
            <span className="line-clamp-2">
              {translateState ? translatedPost.content : data?.content}
            </span>
          </p>
        </div>
        {data?.thumbnailUrl && (
          <img
            src={data?.thumbnailUrl}
            alt={data?.title + ' thumbnail'}
            className="flex h-20 w-20 shrink-0 object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div
            className="flex items-center gap-1 text-small text-primary-red"
            aria-label="likes"
          >
            <Like aria-hidden="true" />
            <span>{data?.likeCount}</span>
          </div>
          <div
            className="flex items-center gap-1 text-small text-primary-30"
            aria-label="comments"
          >
            <Comment aria-hidden="true" />
            <span>{data?.commentCount}</span>
          </div>
          <div className="text-small text-neutral-border-50">
            {formatTime(data?.createdTime)}
          </div>
        </div>
        {translatePostPending ? (
          <Translating size="small" />
        ) : (
          <TranslateButton
            handleTranslate={handleTranslate}
            state={translateState}
            setState={setTranslateState}
            size="small"
          />
        )}
      </div>
    </div>
  );
};
