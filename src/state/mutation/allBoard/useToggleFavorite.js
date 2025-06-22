import {
  addBoardFavorite,
  deleteBoardFavorite,
} from '@/apis/board/toggleBoardFavorite.api';
import { startAnimation } from '@/components/common/StateChangeAnimate';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleFavorite = ({ setPrev, setAnimate }) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ boardId, isPinned }) =>
      isPinned
        ? deleteBoardFavorite({ boardId })
        : addBoardFavorite({ boardId }),
    onMutate: ({ isPinned }) => {
      setPrev(isPinned);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST],
      });
      startAnimation(setAnimate);
    },
  });
  return mutate;
};
