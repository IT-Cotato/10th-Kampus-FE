import { postMarketProduct } from '@/apis/market/postMarketProduct.api';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePostMarketProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: (data) => postMarketProduct(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_MARKET_PRODUCT],
      });
      const productId = response.productId;
      navigate(`${path.market.base}/${productId}`, {
        replace: true,
      });
    },
    onError: (error) => {
      const message =
        error.response.data.message ||
        error.message ||
        'An error occured while posting.\nPlease try again.';
      alert(message);
    },
  });
  return mutate;
};
