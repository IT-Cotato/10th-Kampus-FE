import { postAdminCategory } from '@/apis/admin/postAdminCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const usePostCategory = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (categoryName) => postAdminCategory({ categoryName }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_GET_CATEGORY],
      });
      toast.success('카테고리를 추가하였습니다!');
    },
    onError: (error) => {
      console.log(error);
      const message =
        error.response.data.message ||
        error.message ||
        '카테고리 추가에 실패하였습니다.';
      toast.error(message);
    },
  });
  return mutate;
};
