import { deleteAllDraft } from '@/apis/board/deleteDrafts.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAllDraft = ({
  showDeleteAllSuccessSnackbar,
  onSettledCallback,
}) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();

  const mutate = useMutation({
    mutationFn: () => deleteAllDraft(),
    onSuccess: () => {
      showDeleteAllSuccessSnackbar();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_LIST],
      }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      showSnackbar('Error occured while deleting all draft posts.\n' + error);
    },
    onSettled: () => onSettledCallback(),
  });
  return mutate;
};
