import { deleteMarketProduct } from '@/apis/market/handleMarketProduct.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useDeleteMarketProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: (productId) => deleteMarketProduct({ productId }),
    onSuccess: (_data, productId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DELETE_MARKET_PRODUCT, productId],
      });
      navigate('..');
    },
  });
  return mutate;
};
