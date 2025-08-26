import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { Loading } from '@/components/common/Loading';
import { MarketList } from '@/components/market/MarketList';
import { PATH } from '@/routes/path';
import { useGetMarketScrapList } from '@/state/query/my/useGetMarketScrapList';
import { useNavigate } from 'react-router-dom';

export const MarketScrap = () => {
  const navigate = useNavigate();
  const { data: marketList, isLoading } = useGetMarketScrapList();

  const handleNavigate = (data) => {
    navigate(`${PATH.MARKET.BASE}/${data.postId}`);
  };

  return (
    <div className="flex h-full w-full flex-col">
      {isLoading ? (
        <Loading />
      ) : marketList?.items?.length === 0 ? (
        <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
          <Logo className="w-32 text-neutral-disabled" />
          <span className="text-center text-neutral-border-40">
            You haven&apos;t written anything yet!
            <br />
            Try saving your interest:)
          </span>
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
