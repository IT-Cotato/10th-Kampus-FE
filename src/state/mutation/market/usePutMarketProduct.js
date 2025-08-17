import { putMarketProduct } from '@/apis/market/putMarketProduct.api';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePutMarketProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: ({ productId, data }) => putMarketProduct({ productId, data }),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_MARKET_PRODUCT, productId],
      });
      navigate(`${PATH.MARKET.BASE}/${productId}`, {
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
