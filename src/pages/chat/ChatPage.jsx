import { ChatList } from '@/components/chat/ChatListPage';
import { ChatRoom } from '@/components/chat/ChatRoomPage';
import { useWebsocket } from '@/hooks/useWebsocket';
import { useEffect, useState } from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { Loading } from '@/components/common/Loading';
import { CHAT_TYPE } from '@/constants/chatType';
import { useGetChatList } from '@/state/query/chat/useGetChatList';
import { useAuthStore } from '@/stores/useAuthStore';
import { useChatStore } from '@/stores/useChatStore';

export const ChatPage = () => {
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);

  const [selectedType, setSelectedType] = useState(CHAT_TYPE.ALL);
  const [page, _setPage] = useState(1);

  const { activeChatId, setActiveChatId } = useChatStore();

  const { accessToken } = useAuthStore();
  const { connectSocket, sendMessage } = useWebsocket(
    setChatList,
    activeChatId,
    setMessages,
    page,
  );

  //채팅 리스트
  const {
    data: chatListData,
    error,
    isLoading,
    refetch,
  } = useGetChatList(page, selectedType);

  //채팅리스트
  useEffect(() => {
    if (isLoading) <Loading />;
    if (error) <div>Error: {error.message}</div>;
    if (chatListData) {
      setChatList(chatListData.chatRoomPreviewList || []);
    }
  }, [chatListData, error, isLoading]);

  //웹소켓 서버
  useEffect(() => {
    connectSocket(accessToken);
  }, [connectSocket, accessToken]);

  const handleChatRoomLeave = (roomId) => {
    setChatList((prevChatList) =>
      prevChatList.filter((room) => room.chatroomId !== roomId),
    );
    refetch();
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="h-full w-full">
      <ChatLayout render={!activeChatId ? 'chatList' : null}>
        {!activeChatId ? (
          <ChatList
            onChatRoomSelect={setActiveChatId}
            chatList={chatList}
            onChatRoomLeave={handleChatRoomLeave}
            onTypeChange={handleTypeChange}
          />
        ) : (
          <ChatRoom
            chatroomId={activeChatId}
            setChatroomId={setActiveChatId}
            sendMessage={sendMessage}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </ChatLayout>
    </div>
  );
};
