import Like from '../../assets/imgs/like.svg?react';
import Comment from '../../assets/imgs/comment.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { ScrapComponent } from '../common/ScrapComponent';
import { formatPrice } from '@/utils/formatPrice';
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
      navigate(data?.id);
    }
  };

  const dummyData = {
    postId: 6,
    title: '인형',
    price: 30000,
    likes: 10,
    comments: 0,
    thumbnailUrl: '/src/assets/imgs/bg1.png',
    isScrapped: false,
    createdTime: '2025-04-27 02:56:52',
  };

  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-3 pb-3 pt-4"
      onClick={() => handleOnClick(dummyData)}
    >
      <div className="flex w-full justify-between gap-3">
        <div className="flex w-full justify-between">
          <div className="flex w-full gap-4">
            {/* 썸네일 */}
            {dummyData?.thumbnailUrl && (
              <div className="flex h-[5.75rem] w-[5.75rem] flex-shrink-0">
                <img
                  src={dummyData?.thumbnailUrl}
                  alt="Product Image"
                  className="h-[5.75rem] w-[5.75rem] object-cover"
                />
              </div>
            )}
            <div className="flex w-full flex-col gap-2">
              {/* 상품명 */}
              <h1 className="flex w-full text-subTitle text-neutral-title">
                <span className="line-clamp-1">{dummyData?.title}</span>
              </h1>
              {/* 게시물 작성 시간 */}
              <p className="text-small text-neutral-border-50">
                {formatTime(dummyData?.createdTime)}
              </p>
              {/* 가격 */}
              <h2 className="line-clamp-2 flex w-full">
                <span className="line-clamp-2">
                  {formatPrice(dummyData?.price)} won
                </span>
              </h2>
            </div>
          </div>
          <ScrapComponent
            state={true}
            id="1"
            boardId="1"
            className="h-[1.875rem] w-[1.875rem]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like />
            <p>{dummyData?.likes}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Comment />
            <p>{dummyData?.comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
