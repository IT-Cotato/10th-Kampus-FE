import { PostHeader } from '@/components/board/PostHeader';
import { ScrapComponent } from '@/components/common/ScarpComponent';
import { path } from '@/routes/path';
import { useState } from 'react';
import anonymous from '@/assets/imgs/anonymous.svg';
import bg1 from '@/assets/imgs/bg1.png';
import bg2 from '@/assets/imgs/bg2.png';
import bg3 from '@/assets/imgs/bg3.png';
import bg4 from '@/assets/imgs/bg4.png';
import Like from '@/assets/imgs/like.svg?react';
import FillLike from '@/assets/imgs/fillLike.svg?react';
import Comment from '@/assets/imgs/comment.svg?react';
import Translate from '@/assets/imgs/translate.svg?react';
import { ImageSlider } from '@/components/common/ImageSlider';
import { UserInput } from '@/components/common/userInput';
import { FocusImageSlider } from '@/components/common/FocusImageSlider';
import { formatTime } from '@/utils/formatTime';
import { PostComment } from '@/components/board/PostComment';
export const Post = () => {
  const [input, setInput] = useState('');
  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });
  const [postData, setPostData] = useState({
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
  });
  const [commentList, setCommentList] = useState([
    {
      commentId: 1,
      commentStatus: "NORMAL",
      author: "Anonymity1",
      content: "Life is a fleeting moment, a delicate balance between existence and oblivion",
      likes: 1,
      isLike: true,
      createdTime: "2025-02-15T13:58:13.657Z",
      isReply: [{
        commentId: 3,
        commentStatus: "NORMAL",
        author: "Anonymity2",
        mentions: "Anonymity1",
        content: "Text",
        isLike: false,
        likes: 1,
        createdTime: "2025-02-15T13:58:13.657Z",
      }]
    },
    {
      commentId: 2,
      commentStatus: "NORMAL",
      author: "Anonymity2",
      content: "Text",
      isLike: true,
      likes: 5,
      createdTime: "2025-02-15T13:58:13.657Z"
    }
  ])
  return (
    <div>
      {imageFocus && (
        <FocusImageSlider
          images={postData.postPhoroUrls}
          setImageFocus={setImageFocus}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
          style={style}
          setStyle={setStyle}
        />
      )}
      <PostHeader path={path} />
      <div className="flex h-full w-full flex-col pb-[3.625rem] pt-14">
        <div className="flex flex-col px-4 pt-5">
          {/** 댓글 작성자 부분 및 스크랩 */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img src={anonymous} alt="anonymous icon" className="h-10 w-10" />
              <div className="flex flex-col gap-[.125rem] leading-tight">
                <h1 className="text-base text-neutral-title">Anonymity</h1>
                <h2 className="text-small text-neutral-border-50">{formatTime(postData.createdTime)}</h2>
              </div>
            </div>
            <ScrapComponent
              state={postData.scrap}
              width="1.75rem"
              height="1.75rem"
              setPostData={setPostData}
            />
          </div>
          {/** 본문 부분 */}
          <article className="flex flex-col gap-1 whitespace-pre-line break-words py-5">
            <h1 className="text-pageTitle text-neutral-title">
              The Fragile Line Between Life and Death
            </h1>
            <p className="text-base text-neutral-base">
              Life is a fleeting moment, a delicate balance between existence
              and oblivion. We spend our days chasing dreams, forging
              relationships, and seeking meaning, yet the certainty of death
              lingers in the background. Some fear it, others embrace it as a
              natural part of existence. What matters most is not how long we
              live, but how deeply we experience the moments given to us. In the
              end, life is not measured by time alone, but by the love we share,
              the kindness we show, and the memories we leave behind.
            </p>
          </article>
          {/** 이미지 부분 */}
          {postData.postPhoroUrls.length !== 0 && (
            <div className="pb-3" onClick={() => setImageFocus(true)}>
              <ImageSlider
                images={postData.postPhoroUrls}
                currentImgIndex={currentImgIndex}
                setCurrentImgIndex={setCurrentImgIndex}
                style={style}
                setStyle={setStyle}
              />
            </div>
          )}
          {/** 좋아요 댓글 번역 부분 */}
          <div
            className="flex items-center justify-between pb-4 pt-6 border-b-[0.5px] border-neutral-border-30]"
          >
            <div className="flex items-center gap-[.375rem] text-base text-neutral-border-50">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setPostData((prev) => ({
                      ...prev,
                      isLike: !prev.isLike,
                    }));
                  }}
                >
                  {postData.isLike ? (
                    <FillLike className="h-8 w-8" />
                  ) : (
                    <Like className="h-8 w-8" />
                  )}
                </button>
                {postData.likes}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => console.log('comment')}>
                  <Comment className="h-8 w-8" />
                </button>
                {postData.comments}
              </div>
            </div>
            <button>
              <Translate className="h-6 w-6 text-neutral-base" />
            </button>
          </div>
        </div>
        {/** 댓글 부분 */}
        <div className='flex flex-col'>
          {commentList.map((item, index) => (
            <PostComment data={item} key={index} />
          ))}
        </div>
      </div>
      {/** 댓글 입력창 */}
      <UserInput
        placeholder="Write a comment."
        input={input}
        setInput={setInput}
        handleSend={() => { }}
        type="post"
      />
    </div>
  );
};
