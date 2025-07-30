import { QUERY_KEYS } from '@/constants/api';
import { getMyMarketList } from '@/apis/mypage/getMyArticle.api';
import { useQuery } from '@tanstack/react-query';

export const useGetMyMarketList = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.MY_MARKET_LIST],
    queryFn: () => getMyMarketList({ page: 1 }),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
  return query;
};
