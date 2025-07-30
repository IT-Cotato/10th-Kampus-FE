import { deleteSelectedDraft } from '@/apis/board/deleteDrafts.api';
import { startAnimation } from '@/components/common/StateChangeAnimate';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteSelectedDraft = ({
  setIsDeleteSelectedSuccessAniOpen,
  onSettledCallback,
}) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (selectedDrafts) =>
      deleteSelectedDraft({ tempPostIds: selectedDrafts }),
    onSuccess: () => {
      startAnimation(setIsDeleteSelectedSuccessAniOpen);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_LIST],
      }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      console.log('삭제 실패: ' + error);
    },
    onSettled: () => onSettledCallback(),
  });
  return mutate;
};
