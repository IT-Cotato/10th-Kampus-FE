import { getChatList } from '@/apis/chat/chatList.api';
import { useQuery } from '@tanstack/react-query';
import { ACCESS_TOKEN_KEY, QUERY_KEYS } from '@/constants/api';

export const useGetChatList = (page, type) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const query = useQuery({
    queryKey: [QUERY_KEYS.CHAT_LIST, accessToken, page, type],
    queryFn: () => getChatList(page, type),
  });
  return query;
};
