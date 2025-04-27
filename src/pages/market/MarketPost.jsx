import { PostHeader } from '@/components/board/PostHeader';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { path } from '@/routes/path';
import { useState } from 'react';
import Anonymous from '@/assets/imgs/anonymous.svg';
import Like from '@/assets/imgs/like.svg?react';
import ChattingIcon from '@/assets/imgs/ChattingIcon.svg?react';
import { ImageSlider } from '@/components/common/ImageSlider';
import { FocusImageSlider } from '@/components/common/FocusImageSlider';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading';
import { formatTime } from '@/utils/formatTime';
import { Translating } from '@/components/common/Translating';
import { TranslateButton } from '@/components/common/TranslateButton';
import { formatPrice } from '@/utils/formatPrice';
import { ProductState } from '@/components/market/ProductState';

export const MarketPost = () => {
  // const queryClient = useQueryClient();
  const { postId } = useParams();
  // const {
  //   translateState,
  //   setTranslateState,
  //   translatedPost,
  //   translatePending,
  //   handleTranslate,
  // } = usePostTranslate(postId);

  // const {
  //   data: postData,
  //   isLoading: postLoading,
  //   error: postError,
  // } = useQuery({
  //   queryFn: () => getPostDetail({ postId: postId }),
  //   queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
  // });

  const postData = {
    postPhotoUrls: ['/public/bg2.png', '/public/bg1.png', '/public/bg2.png'],
    author: 'Kampus',
    state: 'RESERVED',
    title: '인형',
    content:
      '인형 팝니다. texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttetexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextte',
    price: 30000,
    isScrapped: true,
    likes: 10,
    chats: 1,
    createdTime: '2025-04-27 02:56:52',
  };

  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const isPostLoading = false;
  const isPostError = false;
  const [translateState, setTranslateState] = useState(false);
  const translatePending = false;

  // 채팅 걸기
  const handleChat = () => {};

  return (
    <div className="relative w-full flex-1 pb-[5.375rem] scrollbar-hide">
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
      <div className="flex h-full w-full flex-col pt-14">
        {isPostLoading && <Loading />}
        {isPostError && <p>Error Data Loading</p>}
        {!isPostLoading && !isPostError && postData && (
          <div className="flex flex-col">
            {/* 이미지 */}
            {postData?.postPhotoUrls?.length > 0 && (
              <div
                className={postData?.postPhotoUrls?.length > 1 && 'pb-3'}
                onClick={() => setImageFocus(true)}
              >
                <ImageSlider
                  images={postData.postPhotoUrls}
                  currentImgIndex={currentImgIndex}
                  setCurrentImgIndex={setCurrentImgIndex}
                  style={style}
                  setStyle={setStyle}
                />
              </div>
            )}
            <div className="flex flex-col px-4 py-[.875rem]">
              {/* 프로필 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <img
                    src={Anonymous}
                    alt="anonymous icon"
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col gap-1 leading-tight">
                    <h1 className="text-base text-neutral-title">
                      {postData?.author}
                    </h1>
                    <span className="text-small text-neutral-border-50">
                      {formatTime(postData?.createdTime)}
                    </span>
                  </div>
                </div>
              </div>
              {/* 제목, 본문 */}
              <article className="relative flex w-full whitespace-pre-line break-words pb-6 pt-8">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full flex-col gap-2">
                    {/* 상태 */}
                    {postData?.state === 'RESERVED' && (
                      <ProductState>Reserved</ProductState>
                    )}
                    {postData?.state === 'SOLD_OUT' && (
                      <ProductState>Sold Out</ProductState>
                    )}
                    {/* 제목 */}
                    <h1 className="flex text-pageTitle text-neutral-title">
                      <span
                        className={
                          translatePending ? 'opacity-0' : 'opacity-100'
                        }
                      >
                        {translateState
                          ? translatedPost?.title
                          : postData?.title}
                      </span>
                    </h1>
                    {/* 카테고리 */}
                    <span className="text-small text-neutral-border-50">
                      Book
                    </span>
                  </div>
                  {/* 본문 */}
                  <p className="w-full whitespace-break-spaces text-base">
                    <span
                      className={translatePending ? 'opacity-0' : 'opacity-100'}
                    >
                      {translateState
                        ? translatedPost?.content
                        : postData?.content}
                    </span>
                  </p>
                </div>
                {translatePending && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Translating width={'4rem'} height={'4rem'} />
                  </div>
                )}
              </article>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[.375rem] text-base text-small text-neutral-border-50">
                  {/* 찜 수 */}
                  <div className="flex items-center gap-1">
                    {postData && (
                      <Like
                        aria-label="Bookmarked"
                        className="h-[.875rem] w-[.875rem]"
                      />
                    )}
                    {postData && postData?.likes}
                  </div>
                  {/* 채팅 수 */}
                  <div className="flex items-center gap-1">
                    <ChattingIcon
                      aria-label="chats"
                      className="h-[.875rem] w-[.875rem] text-neutral-border-50"
                    />
                    {postData && postData?.chats}
                  </div>
                </div>
                <TranslateButton
                  handleTranslate={() => {}}
                  size="large"
                  color="base"
                  state={translateState}
                  setState={setTranslateState}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 하단바 */}
      <div className="fixed bottom-0 z-10 flex h-[5.375rem] w-full max-w-[512px] items-center justify-between bg-white p-4 shadow-base">
        <span className="flex h-8 items-center gap-[.625rem] divide-x divide-neutral-disabled">
          <ScrapComponent
            state={postData?.isScrapped}
            id={postId}
            market={true}
            className="h-[1.75rem] w-[1.75rem]"
          />
          <span className="px-[.625rem] text-title-bold-16 text-neutral-80">
            {formatPrice(postData?.price)} won
          </span>
        </span>
        <button
          type="button"
          className="rounded-[.625rem] bg-primary-base px-8 py-5 text-title-bold-16 text-white"
          onClick={handleChat}
        >
          Chat
        </button>
      </div>
    </div>
  );
};
