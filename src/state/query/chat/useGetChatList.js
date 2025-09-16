import { getChatList } from '@/apis/chat/chatList.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';

export const useGetChatList = (page, type) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CHAT_LIST, page, type],
    queryFn: () => getChatList(page, type),
  });
  return query;
};
