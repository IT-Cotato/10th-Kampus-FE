import { PostHeader } from '@/components/board/PostHeader';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import anonymous from '@/assets/imgs/anonymous.svg';
import Like from '@/assets/imgs/like.svg?react';
import FillLike from '@/assets/imgs/fillLike.svg?react';
import Comment from '@/assets/imgs/comment.svg?react';
import Translate from '@/assets/imgs/translate.svg?react';
import { ImageSlider } from '@/components/common/ImageSlider';
import { UserInput } from '@/components/common/userInput';
import { FocusImageSlider } from '@/components/common/FocusImageSlider';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostDetail } from '@/apis/board/getPostDetail.api';
import { QUERY_KEYS } from '@/constants/api';
import { Loading } from '@/components/common/Loading';
import { formatTime } from '@/utils/formatTime';
import { PostComment } from '@/components/board/PostComment';
import { getComment } from '@/apis/comment/getComment.api';
import { addComment } from '@/apis/comment/addComment.api';
import { deleteComment } from '@/apis/comment/deleteComment.api';
import { addPostLike, deletePostLike } from '@/apis/board/togglePostLike.api';
import { addCommentLike, deleteCommentLike } from '@/apis/comment/toggleCommentLike.api';
export const Post = () => {
  const queryClient = useQueryClient();
  const [focusedComment, setFocusedComment] = useState(null); // null인 경우 게시글에 대한 댓글, 입력값이 있는 경우 댓글에 대한 대댓글 작성
  const [inputFocus, setInputFocus] = useState(false);
  const { postId } = useParams();
  const { data: postData, isLoading: postLoading, error: postError } = useQuery({
    queryFn: () => getPostDetail({ postId: postId }),
    queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId]
  })
  const { data: commentData, isLoading: commentLoading, error: commentError } = useQuery({
    queryFn: () => getComment({ postId: postId }),
    queryKey: [QUERY_KEYS.GET_COMMENT_LIST, postId]
  })
  const { mutate: handleComment } = useMutation({
    //  true -> 댓글 추가 , false -> 댓글 삭제
    mutationFn: ({ type, param, data = null }) =>
      type ? addComment({ postId: param, data: data }) : deleteComment({ commentId: param })
    ,
    onSuccess: (_, { type }) => {
      if (type) {
        setInput('');
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENT_LIST, postId] });
    }
  })
  const { mutate: handleLike } = useMutation({
    //  true -> 좋아요 추가 , false -> 좋아요 삭제
    mutationFn: ({ type }) =>
      !type ? addPostLike({ postId: postId }) : deletePostLike({ postId: postId })
    ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId] });
    }
  })
  const { mutate: handleCommentLike } = useMutation({
    //  true -> 스크랩 추가 , false -> 스크랩 삭제
    mutationFn: ({ type, commentId }) =>
      !type ? addCommentLike({ commentId: commentId }) : deleteCommentLike({ commentId: commentId })
    ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENT_LIST, postId] });
    }
  })
  const [input, setInput] = useState('');
  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });
  const submitComment = () => {
    console.log(postData)
    console.log(commentData)
    console.log(focusedComment);
    const buildComment = {
      content: input,
      commentId: focusedComment
    };
    handleComment({ type: true, param: postId, data: buildComment });
  }
  return (
    <div className='w-full h-full' onClick={() => {
      setInputFocus(false);
      setFocusedComment(null)
    }}>
      {imageFocus && postData?.postPhotoUrls?.length > 0 && (
        <FocusImageSlider
          images={postData.postPhotoUrls}
          setImageFocus={setImageFocus}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
          style={style}
          setStyle={setStyle}
        />
      )}
      {postData && <PostHeader path={path} isAuthor={postData.isAuthor} />}
      <div className="flex h-full w-full flex-col pb-[2.625rem] pt-14">
        {postLoading &&
          <Loading />}
        {postError &&
          <p>Error Data Loading</p>}
        {!postLoading && !postError &&
          <div className="flex flex-col py-5">
            <div className="flex items-center justify-between px-4">
              <div className="flex gap-2">
                <img src={anonymous} alt="anonymous icon" className="h-10 w-10" />
                <div className="flex flex-col gap-[.125rem] leading-tight">
                  <h1 className="text-base text-neutral-title">Anonymity</h1>
                  <h2 className="text-small text-neutral-border-50">{formatTime(postData.createdTime)}</h2>
                </div>
              </div>
              <ScrapComponent
                state={postData.isScrapped}
                width="1.75rem"
                height="1.75rem"
              />
            </div>
            <article className="flex flex-col px-4 gap-1 whitespace-pre-line break-words py-5">
              <h1 className="text-pageTitle text-neutral-title">
                {postData && postData.title}
              </h1>
              <p className="text-base text-neutral-base">
                {postData && postData.content}
              </p>
            </article>
            {postData?.postPhotoUrls?.length > 0 && (
              <div className="pb-3" onClick={() => setImageFocus(true)}>
                <ImageSlider
                  images={postData.postPhotoUrls}
                  currentImgIndex={currentImgIndex}
                  setCurrentImgIndex={setCurrentImgIndex}
                  style={style}
                  setStyle={setStyle}
                />
              </div>
            )}
            <div
              className="flex items-center justify-between pb-4 pt-6 px-4"
              style={{ borderBottom: '0.5px solid #D8D8D8' }}
            >
              <div className="flex items-center gap-[.375rem] text-base text-neutral-border-50">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      handleLike({ type: postData.isLiked })
                    }}
                  >
                    {postData && postData.isLiked ? (
                      <FillLike className="h-8 w-8" />
                    ) : (
                      <Like className="h-8 w-8" />
                    )}
                  </button>
                  {postData && postData.likes}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => console.log('comment')}>
                    <Comment className="h-8 w-8" />
                  </button>
                  {commentData && commentData.comments.length}
                </div>
              </div>
              <button>
                <Translate className="h-6 w-6 text-neutral-base" />
              </button>
            </div>
          </div>}
      </div>
      {/** 댓글 부분 */}
      <div className='flex flex-col pb-16'>
        {commentData && commentData.comments.map((item, index) => (
          <PostComment data={item} key={index} setInputFocus={setInputFocus}
            focusedComment={focusedComment} setFocusedComment={setFocusedComment}
            handleCommentLike={handleCommentLike} />
        ))}
      </div>
      {/** 댓글 입력창 */}
      <UserInput
        placeholder="Write a comment."
        input={input}
        setInput={setInput}
        handleSend={() => submitComment()}
        type='post'
        inputFocus={inputFocus}
      />
    </div>
  );
};
