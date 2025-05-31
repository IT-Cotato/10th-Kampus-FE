import { PostHeader } from '@/components/board/PostHeader';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { useEffect, useState } from 'react';
import Anonymous from '@/assets/imgs/anonymous.svg';
import Bookmark from '@/assets/imgs/scrap.svg?react';
import ChattingIcon from '@/assets/imgs/ChattingIcon.svg?react';
import { ImageSlider } from '@/components/common/ImageSlider';
import { FocusImageSlider } from '@/components/common/FocusImageSlider';
import { Loading } from '@/components/common/Loading';
import { formatTime } from '@/utils/formatTime';
import { Translating } from '@/components/common/Translating';
import { TranslateButton } from '@/components/common/TranslateButton';
import { formatPrice } from '@/utils/formatPrice';
import { ProductState } from '@/components/market/ProductState';
import { Dropdown } from '@/components/market/Dropdown';
import {
  SERVER_PRODUCT_STATE,
  CLIENT_PRODUCT_STATE,
} from '@/constants/ProductState';
import { useGetMarketProduct } from '@/state/query/market/useGetMarketProduct';
import { usePatchMarketProductStatus } from '@/state/mutation/market/usePatchMarketProductStatus';
import { useParams } from 'react-router-dom';

export const MarketPost = () => {
  const { productId } = useParams();

  // 백 <-> 프론트 매핑 객체
  const stateMapClientToServer = {
    [CLIENT_PRODUCT_STATE.active]: SERVER_PRODUCT_STATE.active,
    [CLIENT_PRODUCT_STATE.reserved]: SERVER_PRODUCT_STATE.reserved,
    [CLIENT_PRODUCT_STATE.soldOut]: SERVER_PRODUCT_STATE.soldOut,
  };
  const stateMapServerToClient = {
    [SERVER_PRODUCT_STATE.active]: CLIENT_PRODUCT_STATE.active,
    [SERVER_PRODUCT_STATE.reserved]: CLIENT_PRODUCT_STATE.reserved,
    [SERVER_PRODUCT_STATE.soldOut]: CLIENT_PRODUCT_STATE.soldOut,
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const {
  //   translateState,
  //   setTranslateState,
  //   translatedPost,
  //   translatePending,
  //   handleTranslate,
  // } = usePostTranslate(productId);

  const { data: productData, isLoading: isProductLoading } =
    useGetMarketProduct();
  const { mutate: changeStatus } = usePatchMarketProductStatus();

  const [selectedDropdown, setSelectedDropdown] = useState();

  // 프론트 -> 백 통신 전 사용
  const changeStateToUpperCase = (state) =>
    stateMapClientToServer[state] || state;

  // 백 -> 프론트 통신 후 사용
  const changeStateToLowerCase = (state) =>
    stateMapServerToClient[state] || state;

  useEffect(() => {
    setSelectedDropdown(changeStateToLowerCase(productData?.productStatus));
  }, [productData]);

  // 이미지 관련 state
  const [imageFocus, setImageFocus] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const [translateState, setTranslateState] = useState(false);
  const translatePending = false;

  // 드롭다운 클릭 시
  const handleDropdownClick = (state) => {
    if (selectedDropdown !== state) {
      changeStatus({
        productId,
        productStatus: changeStateToUpperCase(selectedDropdown),
      });
      setSelectedDropdown(state);
    }
    setIsDropdownOpen(false);
  };

  // 채팅 걸기
  const handleChat = () => {};

  return (
    <div className="relative w-full flex-1 pb-[5.375rem] scrollbar-hide">
      {/* 이미지 클릭 시 이미지 슬라이더 */}
      {imageFocus && productData?.postPhotoUrls?.length > 0 && (
        <FocusImageSlider
          images={productData.postPhotoUrls}
          setImageFocus={setImageFocus}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
          style={style}
          setStyle={setStyle}
        />
      )}
      {productData && <PostHeader isAuthor={productData.isAuthor} />}
      <div className="flex h-full w-full flex-col pt-14">
        {isProductLoading && <Loading />}
        {!isProductLoading && productData && (
          <div className="flex flex-col">
            {/* 이미지 */}
            {productData?.photos?.length > 0 && (
              <div
                className={productData?.photos?.length > 1 ? 'pb-3' : ''}
                onClick={() => setImageFocus(true)}
              >
                <ImageSlider
                  images={productData.photos}
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
                    alt="Profile Image"
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col gap-1 leading-tight">
                    {/* 작성자 */}
                    <h1 className="text-base text-neutral-title">
                      {productData?.sellerName}
                    </h1>
                    {/* 게시물 작성 시간 */}
                    <span className="text-small text-neutral-border-50">
                      {formatTime(productData?.createdTime)}
                    </span>
                  </div>
                </div>
                <ScrapComponent
                  state={productData?.isScrapped}
                  id={productData?.productId}
                  market={true}
                  className="h-[1.75rem] w-[1.75rem]"
                />
              </div>
              {/* 제목, 본문 */}
              <article className="relative flex w-full whitespace-pre-line break-words pb-6 pt-8">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full flex-col gap-4">
                    {productData?.isAuthor && (
                      <Dropdown
                        selectedDropdown={selectedDropdown}
                        dropdownOptions={Object.values(CLIENT_PRODUCT_STATE)}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        handleDropdownClick={(state) =>
                          handleDropdownClick(state)
                        }
                      />
                    )}
                    {/* 카테고리 */}
                    <span className="flex flex-wrap gap-2 text-small text-neutral-border-40">
                      {productData?.categories.map((category, index) => (
                        <span key={category} className="flex gap-2">
                          {index !== 0 && <span>·</span>}
                          <span className="underline">{category}</span>
                        </span>
                      ))}
                    </span>
                    <div className="flex gap-2 text-center">
                      {/* 상품 상태 */}
                      {!productData?.isAuthor &&
                        productData?.productStatus !==
                          SERVER_PRODUCT_STATE.active && (
                          <ProductState>
                            {productData?.productStatus}
                          </ProductState>
                        )}
                      {/* 제목*/}
                      <h1 className="flex whitespace-break-spaces break-words text-pageTitle text-neutral-title">
                        <span
                          className={
                            translatePending ? 'opacity-0' : 'opacity-100'
                          }
                        >
                          {translateState
                            ? translatedPost?.title
                            : productData?.title}
                        </span>
                      </h1>
                    </div>
                  </div>
                  {/* 본문 */}
                  <p className="w-full whitespace-break-spaces text-base">
                    <span
                      className={translatePending ? 'opacity-0' : 'opacity-100'}
                    >
                      {translateState
                        ? translatedPost?.description
                        : productData?.description}
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
                    {productData && (
                      <Bookmark
                        aria-label="Bookmarked"
                        className="h-[.875rem] w-[.875rem]"
                      />
                    )}
                    {productData && productData?.scrapCount}
                  </div>
                  {/* 채팅 수 */}
                  <div className="flex items-center gap-1">
                    <ChattingIcon
                      aria-label="chats"
                      className="h-[.75rem] w-[.75rem] text-neutral-border-50"
                    />
                    {productData && productData?.chatCount}
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
        <span className="px-[.625rem] text-title-bold-16 text-neutral-80">
          ₩ {formatPrice(productData?.price)}
        </span>
        <button
          type="button"
          className="rounded-[.625rem] bg-primary-base px-8 py-5 text-title-bold-16 text-white"
          onClick={handleChat}
        >
          Chat ({productData?.isAuthor && productData?.chatCount})
        </button>
      </div>
    </div>
  );
};
