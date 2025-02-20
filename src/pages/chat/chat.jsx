import { ChatList } from '@/components/chat/chatListPage';
import { ChatRoom } from '@/components/chat/chatRoomPage';
import { ACCESS_TOKEN_KEY } from '@/constants/api';
import { useWebsocket } from '@/hooks/use-websocket';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getChatList } from '@/apis/chat/chatList.api';
import { ChatLayout } from '@/components/layout/chatLayout';
import { getChatMessages } from '@/apis/chat/messages.api';
import { Loading } from '@/components/common/Loading';

export const ChatPage = () => {
  const [chatroomId, setChatroomId] = useState(null);
  const [chatList, setChatList] = useState([]);

  const [page, setPage] = useState(1);

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { connectSocket, sendMessage } = useWebsocket(setChatList, chatroomId);
  //채팅 리스트
  const {
    data: chatListData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_LIST, accessToken],
    queryFn: () => getChatList(page),
  });

  //채팅리스트
  useEffect(() => {
    if (isLoading) <Loading />;
    if (error) <div>Error: {error.message}</div>;
    if (chatListData) {
      setChatList(chatListData.chatRoomPreviewList || []);
    }
  }, [chatListData]);

  //웹소켓 서버
  useEffect(() => {
    connectSocket(accessToken);
  }, [connectSocket]);

  const handleChatRoomLeave = (chatroomId) => {
    setChatList((prevChatList) =>
      prevChatList.filter((room) => room.chatroomId !== chatroomId),
    );
    if (chatroomId === chatroomId) {
      setChatroomId(null);
    }
  };

  return (
    <div className="h-full w-full">
      <ChatLayout render={!chatroomId ? 'chatList' : null}>
        {!chatroomId ? (
          <ChatList
            onChatRoomSelect={setChatroomId}
            chatList={chatList}
            onChatRoomLeave={handleChatRoomLeave}
          />
        ) : (
          <ChatRoom
            chatroomId={chatroomId}
            setChatroomId={setChatroomId}
            sendMessage={sendMessage}
          />
        )}
      </ChatLayout>
    </div>
  );
};
