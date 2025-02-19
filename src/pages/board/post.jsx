import { PostHeader } from '@/components/board/PostHeader';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { path } from '@/routes/path';
import { useState } from 'react';
import anonymous from '@/assets/imgs/anonymous.svg';
import Like from '@/assets/imgs/like.svg?react';
import FillLike from '@/assets/imgs/fillLike.svg?react';
import Comment from '@/assets/imgs/comment.svg?react';
import Translate from '@/assets/imgs/translate.svg?react';
import { ImageSlider } from '@/components/common/ImageSlider';
import { UserInput } from '@/components/common/userInput';
import { FocusImageSlider } from '@/components/common/FocusImageSlider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostDetail } from '@/apis/board/getPostDetail.api';
import { QUERY_KEYS } from '@/constants/api';
import { Loading } from '@/components/common/Loading';
import { formatTime } from '@/utils/formatTime';
import { PostComment } from '@/components/board/PostComment';
import { getComment } from '@/apis/comment/getComment.api';
export const Post = () => {
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

  const [input, setInput] = useState('');
  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });
  /*const [postData, setPostData] = useState({
    userId: 0,
    title: 'Title',
    content: 'content',
    postCategory: 'HOSPITAL',
    isAuthor: false,
    likes: 10,
    comments: 10,
    createdTime: '2025-02-15T13:58:13.657Z',
    thumbnailUrl: null,
    board_type: 'Tips for living in Korea',
    scrap: false,
    isLike: true,
    postPhoroUrls: [bg1, bg2, bg4, bg1, bg2, bg3, bg4, bg1, bg2],
  });*/

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
              {/**  백엔드 isScrap 구현되면 수정 
              <ScrapComponent
                state={boardData.scrap}
                width="1.75rem"
                height="1.75rem"
                setBoardData={setBoardData}
              />
              */}
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
              <div className="flex px-4 items-center gap-[.375rem] text-base text-neutral-border-50">
                <div className="flex items-center gap-1">
                  {/** 백엔드 isLike 구현되면 수정 
                   * <button
                    onClick={() => {
                      setBoardData((prev) => ({
                        ...prev,
                        isLike: !prev.isLike,
                      }));
                    }}
                  >
                    {postData && postData.isLike ? (
                      <FillLike className="h-8 w-8" />
                    ) : (
                      <Like className="h-8 w-8" />
                    )}
                  </button>*/}
                  {postData && postData.likes}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => console.log('comment')}>
                    <Comment className="h-8 w-8" />
                  </button>
                  {postData && postData.comments}
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
            focusedComment={focusedComment} setFocusedComment={setFocusedComment} />
        ))}
      </div>
      {/** 댓글 입력창 */}
      <UserInput
        placeholder="Write a comment."
        input={input}
        setInput={setInput}
        handleSend={() => { }}
        type='post'
        inputFocus={inputFocus}
      />
    </div>
  );
};
