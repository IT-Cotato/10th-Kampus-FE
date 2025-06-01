import { getMarketProduct } from '@/apis/market/handleMarketProduct.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useGetMarketProduct = () => {
  const { productId } = useParams();
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_MARKET_PRODUCT, productId],
    queryFn: () => getMarketProduct({ productId }),
  });
  return query;
};
