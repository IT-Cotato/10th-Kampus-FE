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
export const Post = () => {
  const [input, setInput] = useState('');
  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });
  const [boardData, setBoardData] = useState({
    id: 0,
    title: 'Title',
    content: 'content',
    likes: 10,
    comments: 10,
    createdTime: '1 day ago',
    thumbnailUrl: null,
    board_type: 'Tips for living in Korea',
    scrap: false,
    isLike: true,
    postPhoroUrls: [bg1, bg2, bg4, bg1, bg2, bg3, bg4, bg1, bg2],
  });
  return (
    <div>
      {imageFocus && (
        <FocusImageSlider
          images={boardData.postPhoroUrls}
          setImageFocus={setImageFocus}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
          style={style}
          setStyle={setStyle}
        />
      )}
      <PostHeader path={path} />
      <div className="flex h-full w-full flex-col pb-[3.625rem] pt-14">
        <div className="flex flex-col px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img src={anonymous} alt="anonymous icon" className="h-10 w-10" />
              <div className="flex flex-col gap-[.125rem] leading-tight">
                <h1 className="text-base text-neutral-title">Anonymity</h1>
                <h2 className="text-small text-neutral-border-50">1 day ago</h2>
              </div>
            </div>
            <ScrapComponent
              state={boardData.scrap}
              width="1.75rem"
              height="1.75rem"
              setBoardData={setBoardData}
            />
          </div>
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
          {boardData.postPhoroUrls.length !== 0 && (
            <div className="pb-3" onClick={() => setImageFocus(true)}>
              <ImageSlider
                images={boardData.postPhoroUrls}
                currentImgIndex={currentImgIndex}
                setCurrentImgIndex={setCurrentImgIndex}
                style={style}
                setStyle={setStyle}
              />
            </div>
          )}
          <div
            className="flex items-center justify-between pb-4 pt-6"
            style={{ borderBottom: '0.5px solid #D8D8D8' }}
          >
            <div className="flex items-center gap-[.375rem] text-base text-neutral-border-50">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setBoardData((prev) => ({
                      ...prev,
                      isLike: !prev.isLike,
                    }));
                  }}
                >
                  {boardData.isLike ? (
                    <FillLike className="h-8 w-8" />
                  ) : (
                    <Like className="h-8 w-8" />
                  )}
                </button>
                {boardData.likes}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => console.log('comment')}>
                  <Comment className="h-8 w-8" />
                </button>
                {boardData.comments}
              </div>
            </div>
            <button>
              <Translate className="h-6 w-6 text-neutral-base" />
            </button>
          </div>
        </div>
      </div>
      <UserInput
        placeholder="Write a comment."
        input={input}
        setInput={setInput}
        handleSend={() => { }}
      />
    </div>
  );
};
