import { getChatList } from '@/apis/chat/chatList.api';
import { useQuery } from '@tanstack/react-query';
import { ACCESS_TOKEN_KEY, QUERY_KEYS } from '@/constants/api';

export const useGetChatList = (page, type) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY); //추후 zustand 적용 시 수정
  const query = useQuery({
    queryKey: [QUERY_KEYS.CHAT_LIST, accessToken, page, type],
    queryFn: () => getChatList(page, type),
  });
  return query;
};
