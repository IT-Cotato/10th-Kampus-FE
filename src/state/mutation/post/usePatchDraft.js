import { patchSaveDraft } from '@/apis/board/handleSaveDraft.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchDraft = ({ draftId }) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (draft) =>
      patchSaveDraft({ data: draft, postDraftId: draftId }),
    onSuccess: (response) => {
      setPostDraftId(response?.postDraftId);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_ID],
      });
    },
  });

  return mutate;
};
