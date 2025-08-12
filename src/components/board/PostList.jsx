import Like from '@/assets/imgs/icon/like.svg?react';
import Comment from '@/assets/imgs/icon/comment.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { Translating } from '@/components/common/Translating';
import { TranslateButton } from '@/components/common/TranslateButton';
import { usePostTranslate } from '@/state/mutation/common/usePostTranslate';
import { BoardName } from './BoardName';

export const PostList = ({ data, isTrendingBoard, ...props }) => {
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
      {isTrendingBoard /** 인기 게시판 혹은 마이페이지 게시물들 레이아웃 */ && (
        <BoardName>{data?.boardName}</BoardName>
      )}
      <div className="relative flex w-full justify-between">
        <div className="flex w-full flex-col">
          <h1 className="flex w-full text-subTitle text-neutral-title">
            <span className="line-clamp-1">
              {translateState ? translatedPost.title : data?.title}
            </span>
          </h1>
          <h2 className="flex w-full text-neutral-base">
            <span className="line-clamp-2">
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
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like />
            <p>{data?.likeCount}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Comment />
            <p>{data?.commentCount}</p>
          </div>
          <p className="text-small text-neutral-border-50">
            {formatTime(data?.createdTime)}
          </p>
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
