import { postAdminCategory } from '@/apis/admin/postAdminCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostCategory = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async (categoryName) => postAdminCategory({ categoryName }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_GET_CATEGORY],
      });
    },
  });
  return mutate;
};
