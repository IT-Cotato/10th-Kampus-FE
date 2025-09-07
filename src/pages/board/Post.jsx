import { PostHeader } from '@/components/board/PostHeader';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { useCallback, useState } from 'react';
import anonymous from '@/assets/imgs/icon/anonymous.svg';
import kampus from '@/assets/imgs/icon/kampus-post.svg';
import Like from '@/assets/imgs/icon/like.svg?react';
import FillLike from '@/assets/imgs/icon/active-heart.svg?react';
import Comment from '@/assets/imgs/icon/comment.svg?react';
import { ImageSlider } from '@/components/common/ImageSlider';
import UserInput from '@/components/common/UserInput';
import { FocusImageSlider } from '@/components/common/FocusImageSlider';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading';
import { formatTime } from '@/utils/formatTime';
import { PostComment } from '@/components/board/PostComment';
import { Translating } from '@/components/common/Translating';
import { TranslateButton } from '@/components/common/TranslateButton';
import { usePostTranslate } from '@/state/mutation/common/usePostTranslate';
import { useGetPost } from '@/state/query/post/useGetPost';
import { useGetComment } from '@/state/query/post/useGetComment';
import { useHandleComment } from '@/state/mutation/post/useHandleComment';
import { useHandlePostLike } from '@/state/mutation/post/useHandlePostLike';
import { useHandleCommentLike } from '@/state/mutation/post/useHandleCommentLike';

export const Post = () => {
  const { postId, boardId } = useParams();

  const [focusedComment, setFocusedComment] = useState(null); // null인 경우 게시글에 대한 댓글, 입력값이 있는 경우 댓글에 대한 대댓글 작성
  const [inputFocus, setInputFocus] = useState(false);
  const [input, setInput] = useState('');

  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const {
    translateState,
    setTranslateState,
    translatedPost,
    translatePostPending,
    handleTranslate,
  } = usePostTranslate('board', postId);

  const {
    data: postData,
    isLoading: postLoading,
    error: postError,
  } = useGetPost();

  const { data: commentData } = useGetComment();

  const { mutate: handleComment } = useHandleComment({ setInput: setInput });
  const { mutate: handleLike } = useHandlePostLike();
  const { mutate: handleCommentLike } = useHandleCommentLike();

  const submitComment = useCallback(() => {
    if (!input.trim()) return;
    const buildComment = {
      content: input,
      parentId: focusedComment?.parentId,
      targetId: focusedComment?.targetId,
    };
    handleComment({ type: true, param: postId, data: buildComment });
  }, [input, focusedComment, handleComment, postId]);
  return (
    <div
      className="flex h-full w-full flex-col overflow-scroll pb-20 scrollbar-hide"
      onClick={() => {
        setInputFocus(false);
        setFocusedComment(null);
      }}
    >
      {imageFocus && postData?.postPhotos?.length > 0 && (
        <FocusImageSlider
          images={postData.postPhotos}
          setImageFocus={setImageFocus}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
          style={style}
          setStyle={setStyle}
        />
      )}
      {postData && <PostHeader isAuthor={postData.isAuthor} />}
      <div className="flex h-full w-full flex-col pt-14">
        {postLoading && <Loading />}
        {postError && <p>Error Data Loading</p>}
        {!postLoading && !postError && postData && (
          <div className="flex flex-col gap-4 pt-4">
            {/* 프로필, 작성 시간, 스크랩 */}
            <div className="flex items-center justify-between px-4">
              <div className="flex gap-2">
                <img
                  src={boardId === '1' ? kampus : anonymous}
                  alt="Profile Image"
                  className="h-10 w-10"
                />
                <div className="flex flex-col gap-[.125rem] leading-tight">
                  <h1 className="text-base text-neutral-title">
                    {boardId === '1' ? 'Kampus' : 'Anonymity'}
                  </h1>
                  <h2 className="text-small text-neutral-border-50">
                    {formatTime(postData?.createdTime)}
                  </h2>
                </div>
              </div>
              <ScrapComponent
                state={postData?.isScrapped}
                postType={boardId === '1' ? 'CARDNEWS' : undefined}
                className="h-[1.75rem] w-[1.75rem]"
              />
            </div>
            {/* 제목, 본문 */}
            <h1 className="flex px-4 text-pageTitle text-neutral-title">
              {translateState ? translatedPost?.title : postData?.title}
            </h1>
            <p className="whitespace-break-spaces break-words px-4 text-base text-neutral-base">
              {translateState ? translatedPost?.content : postData?.content}
            </p>
            {postData?.postPhotos?.length > 0 && (
              <div
                className={postData?.photos?.length > 1 ? 'pb-3' : ''}
                onClick={() => setImageFocus(true)}
              >
                <ImageSlider
                  images={postData?.postPhotos}
                  currentImgIndex={currentImgIndex}
                  setCurrentImgIndex={setCurrentImgIndex}
                  style={style}
                  setStyle={setStyle}
                />
              </div>
            )}
            <div className="flex items-center justify-between border-b-[0.5px] border-b-neutral-border-30 px-4 pb-4">
              <div className="flex items-center gap-[.375rem] text-small text-neutral-border-50">
                {/* 찜 수 */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      handleLike({ type: postData?.isLiked });
                    }}
                  >
                    {postData?.isLiked ? (
                      <FillLike
                        aria-label="likes"
                        className="h-[.75rem] w-[.75rem] text-primary-red"
                      />
                    ) : (
                      <Like
                        aria-label="likes"
                        className="h-[.75rem] w-[.75rem] text-neutral-border-50"
                      />
                    )}
                  </button>
                  {postData?.likeCount || 0}
                </div>
                {/* 댓글 수 */}
                <div className="flex items-center gap-1">
                  <Comment
                    aria-label="comments"
                    className="h-[.75rem] w-[.75rem] text-neutral-border-50"
                  />
                  {postData?.commentCount || 0}
                </div>
              </div>
              {translatePostPending ? (
                <Translating />
              ) : (
                <TranslateButton
                  handleTranslate={handleTranslate}
                  state={translateState}
                  setState={setTranslateState}
                />
              )}
            </div>
          </div>
        )}

        {/** 댓글 */}
        {commentData?.comments?.length !== 0 ? (
          <div className="flex flex-col">
            {commentData?.comments?.map((item) => (
              <PostComment
                data={item}
                isAuthor={item.isAuthor}
                key={item.commentId}
                setInputFocus={setInputFocus}
                focusedComment={focusedComment}
                setFocusedComment={setFocusedComment}
                handleCommentLike={handleCommentLike}
                handleComment={handleComment}
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center py-6 text-neutral-disabled">
            Leave the first comment!
          </div>
        )}
      </div>

      {/** 댓글 입력창 */}
      <UserInput
        placeholder="Write a comment."
        input={input}
        setInput={setInput}
        handleSend={() => submitComment()}
        type="post"
        inputFocus={inputFocus}
      />
    </div>
  );
};
