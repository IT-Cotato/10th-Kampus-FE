import Bookmark from '@/assets/imgs/scrap.svg?react';
import Chatting from '@/assets/imgs/ChattingIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { formatPrice } from '@/utils/formatPrice';
import { ProductState } from '@/components/market/ProductState';
import { TranslateButton } from '../common/TranslateButton';
import { usePostTranslate } from '@/hooks/usePostTranslate';

export const MarketList = ({ data, ...props }) => {
  const navigate = useNavigate();
  const {
    translateState,
    setTranslateState,
    translatedPost,
    translatePending,
    handleTranslate,
  } = usePostTranslate(data?.id);

  const handleOnClick = (data) => {
    if (props.onClick) {
      props.onClick(data);
    } else {
      navigate(`${data?.productId}`);
    }
  };

  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-3 pb-3 pt-4"
      onClick={() => handleOnClick(data)}
    >
      <div className="flex w-full justify-between gap-3">
        <div className="flex w-full justify-between">
          <div className="flex w-full gap-4">
            {/* 썸네일 */}
            {data?.photoUrl && (
              <div className="flex h-[5.75rem] w-[5.75rem] flex-shrink-0">
                <img
                  src={data?.photoUrl}
                  alt="Product Image"
                  className="h-[5.75rem] w-[5.75rem] object-cover"
                />
              </div>
            )}
            <div className="flex w-full flex-col gap-2">
              {/* 상품명 */}
              <h1 className="flex w-full text-subTitle text-neutral-title">
                <span className="line-clamp-1">
                  {translateState ? translatedPost.title : data?.title}
                </span>
              </h1>
              {/* 게시물 작성 시간 */}
              <p className="text-small text-neutral-border-50">
                {formatTime(data?.createdTime)}
              </p>
              <span className="flex items-center gap-2">
                {/* 상품 상태 */}
                {data?.productStatus !== 'ACTIVE' && (
                  <h2 className="line-clamp-1 flex w-fit flex-shrink-0">
                    <ProductState>{data?.productStatus}</ProductState>
                  </h2>
                )}
                {/* 가격 */}
                <h2 className="line-clamp-2 flex w-full">
                  <span className="line-clamp-1">
                    ₩ {formatPrice(data?.price)}
                  </span>
                </h2>
              </span>
            </div>
          </div>
          <ScrapComponent
            state={data?.isScrapped}
            id={data?.productId}
            boardId="1"
            market={true}
            className="h-[1.875rem] w-[1.875rem]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Bookmark className="h-[.875rem] w-[.875rem]" />
            <p>{data?.scrapCount}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Chatting className="h-[.75rem] w-[.75rem]" />
            <p>{data?.chatCount}</p>
          </div>
        </div>

        <TranslateButton
          handleTranslate={handleTranslate}
          state={translateState}
          setState={setTranslateState}
          size="small"
          color="title"
        />
      </div>
    </div>
  );
};
