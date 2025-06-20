import { patchMarketProductStatus } from '@/apis/market/patchMarketProductStatus.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchMarketProductStatus = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: ({ productId, productStatus }) => {
      patchMarketProductStatus({ productId, productStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PATCH_MARKET_PRODUCT_STATUS, productId],
      });
    },
    onError: (error) => {
      const message =
        error.response.data.message ||
        error.message ||
        'An error occured.\nPlease try again.';
      alert(message);
    },
  });
  return mutate;
};
