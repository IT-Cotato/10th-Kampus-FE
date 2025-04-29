import { PostHeader } from '@/components/board/PostHeader';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { useEffect, useState } from 'react';
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
import { Dropdown } from '@/components/market/Dropdown';

export const MarketPost = () => {
  // const queryClient = useQueryClient();
  const { postId } = useParams();
  const PRODUCT_STATE = ['Active', 'Reserved', 'Sold Out'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // dummy data
  const postData = {
    postId: 1,
    postPhotoUrls: ['/bg2.png', '/bg1.png', '/bg2.png'],
    author: 'Kampus',
    isAuthor: true,
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

  // 프론트 -> 백 통신 전 사용
  const chageStateToUpperCase = (dropdown) => {
    switch (dropdown) {
      case 'Active':
        return 'ACTIVE';
      case 'Reserved':
        return 'RESERVED';
      case 'Sold Out':
        return 'SOLD_OUT';
      default:
        return dropdown;
    }
  };

  // 백 -> 프론트 통신 후 사용
  const chageStateToLowerCase = (dropdown) => {
    switch (dropdown) {
      case 'ACTIVE':
        return 'Active';
      case 'RESERVED':
        return 'Reserved';
      case 'SOLD_OUT':
        return 'Sold Out';
      default:
        return dropdown;
    }
  };

  const [selectedDropdown, setSelectedDropdown] = useState(
    chageStateToLowerCase(postData?.state) || 'Active',
  );

  // 이미지 관련 state
  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  // 백 연동 전 임시 state
  const isPostLoading = false;
  const isPostError = false;
  const [translateState, setTranslateState] = useState(false);
  const translatePending = false;

  // 드롭다운 클릭 시
  const handleDropdownClick = (state) => {
    setSelectedDropdown(state);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // chageStateToUpperCase(selectedDropdown); // 이 상태를 백에 전송
  }, [selectedDropdown]);

  // 채팅 걸기
  const handleChat = () => {};

  return (
    <div className="relative w-full flex-1 pb-[5.375rem] scrollbar-hide">
      {/* 이미지 클릭 시 이미지 슬라이더 */}
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
      {postData && <PostHeader isAuthor={postData.isAuthor} />}
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
                    {/* 작성자 */}
                    <h1 className="text-base text-neutral-title">
                      {postData?.author}
                    </h1>
                    {/* 게시물 작성 시간 */}
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
                    {!postData?.isAuthor && (
                      <ProductState>{postData?.state}</ProductState>
                    )}
                    {postData?.isAuthor && (
                      <Dropdown
                        selectedDropdown={selectedDropdown}
                        dropdownOptions={PRODUCT_STATE}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        handleDropdownClick={(state) =>
                          handleDropdownClick(state)
                        }
                      />
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
                <div className="flex items-center gap-[.375rem] text-small text-neutral-border-50">
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
                      className="h-[.75rem] w-[.75rem] text-neutral-border-50"
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
            ₩ {formatPrice(postData?.price)}
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
