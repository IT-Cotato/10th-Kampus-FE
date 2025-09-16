import { deleteChatroom } from '@/apis/chat/chatRoom.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteChatroom = ({ chatroomId }) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_CHAT_ROOM, chatroomId],
    mutationFn: ({ chatroomId }) => deleteChatroom({ chatroomId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_LIST] });
    },
    enabled: !!chatroomId,
  });

  return mutate;
};
