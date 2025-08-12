import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { Loading } from '@/components/common/Loading';
import { MarketList } from '@/components/market/MarketList';
import { PATH } from '@/routes/path';
import { useGetMyMarketList } from '@/state/query/my/useGetMyMarketList';
import { useNavigate } from 'react-router-dom';

export const MyMarkets = () => {
  const navigate = useNavigate();

  const {
    data: marketList,
    isLoading,
    error: isMarketError,
  } = useGetMyMarketList();

  const handleNavigate = (data) => {
    navigate(`${PATH.MARKET.BASE}/${data.productId}`);
  };

  return (
    <div className="flex h-full w-full flex-col">
      {isLoading ? (
        <Loading />
      ) : !marketList.items ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 pb-10">
          <Logo className="w-32 text-neutral-disabled" />
          <span className="text-center text-neutral-border-40">
            There&apos;s nothing you&apos;ve scrapped!
            <br />
            Try saving your interest:)
          </span>
        </div>
      ) : isMarketError ? (
        <div className="flex h-full w-full items-center justify-center text-subTitle text-red-500">
          An error has occurred.
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col divide-y bg-white">
          {marketList.items.map((item, index) => (
            <MarketList
              key={index}
              data={item}
              isActive={true}
              onClick={handleNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
