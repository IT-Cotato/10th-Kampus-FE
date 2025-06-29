import { postSaveDraft } from '@/apis/board/handleSaveDraft.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSaveDraft = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (draft) => postSaveDraft({ data: draft }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_COUNT], // draftCount 쿼리 무효화
      });
    },
  });

  return mutate;
};
