import { getDraftById } from '@/apis/board/getDraftById.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetDraft = ({ postDraftId }) => {
  const query = useQuery({
    queryFn: () => getDraftById({ postDraftId }),
    queryKey: [QUERY_KEYS.GET_DRAFT, postDraftId],
    select: (res) => res.tempPostDetails,
    enabled: !!postDraftId,
  });
  return query;
};
