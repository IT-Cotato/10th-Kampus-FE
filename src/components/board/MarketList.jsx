import Like from '@/assets/imgs/like.svg?react';
import Chatting from '@/assets/imgs/ChattingIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { ScrapComponent } from '@/components/common/ScrapComponent';
import { formatPrice } from '@/utils/formatPrice';
import { ProductState } from '@/components/market/ProductState';

export const MarketList = ({ data, ...props }) => {
  const navigate = useNavigate();
  // const {
  //   translateState,
  //   setTranslateState,
  //   translatedPost,
  //   translatePending,
  //   handleTranslate,
  // } = usePostTranslate(data?.id);

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
      <div className="flex w-full justify-between gap-3">
        <div className="flex w-full justify-between">
          <div className="flex w-full gap-4">
            {/* 썸네일 */}
            {data?.thumbnailUrl && (
              <div className="flex h-[5.75rem] w-[5.75rem] flex-shrink-0">
                <img
                  src={data?.thumbnailUrl}
                  alt="Product Image"
                  className="h-[5.75rem] w-[5.75rem] object-cover"
                />
              </div>
            )}
            <div className="flex w-full flex-col gap-2">
              {/* 상품명 */}
              <h1 className="flex w-full text-subTitle text-neutral-title">
                <span className="line-clamp-1">{data?.title}</span>
              </h1>
              {/* 게시물 작성 시간 */}
              <p className="text-small text-neutral-border-50">
                {formatTime(data?.createdTime)}
              </p>
              <span className="flex items-center gap-2">
                {/* 상품 상태 */}
                {data?.state !== 'ACTIVE' && (
                  <h2 className="line-clamp-1 flex w-fit flex-shrink-0">
                    <ProductState>{data?.state}</ProductState>
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
            id={data?.postId}
            boardId="1"
            market={true}
            className="h-[1.875rem] w-[1.875rem]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like className="h-[.875rem] w-[.875rem]" />
            <p>{data?.likes}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Chatting className="h-[.75rem] w-[.75rem]" />
            <p>{data?.chats}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
