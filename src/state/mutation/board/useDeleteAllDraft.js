import { deleteAllDraft } from '@/apis/board/deleteDrafts.api';
import { startAnimation } from '@/components/common/StateChangeAnimate';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAllDraft = ({
  setIsDeleteAllSuccessAniOpen,
  onSettledCallback,
}) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: () => deleteAllDraft(),
    onSuccess: () => {
      startAnimation(setIsDeleteAllSuccessAniOpen);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_LIST],
      }); // 삭제 후 리스트 다시 불러오기
    },
    onError: () => {
      console.log('삭제 실패');
    },
    onSettled: () => onSettledCallback(),
  });
  return mutate;
};
