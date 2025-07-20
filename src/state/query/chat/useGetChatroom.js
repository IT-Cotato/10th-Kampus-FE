import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getChatroom } from '@/apis/chat/chatRoom.api';

export const useGetChatroom = ({ chatroomId }) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_ROOM, chatroomId],
    queryFn: () => getChatroom({ chatroomId }),
    enabled: !!chatroomId,
  });
  return query;
};
