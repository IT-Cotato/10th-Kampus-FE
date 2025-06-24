import { ChatList } from '@/components/chat/chatListPage';
import { ChatRoom } from '@/components/chat/chatRoomPage';
import { ACCESS_TOKEN_KEY } from '@/constants/api';
import { useWebsocket } from '@/hooks/use-websocket';
import { useEffect, useState } from 'react';
import { ChatLayout } from '@/components/layout/chatLayout';
import { Loading } from '@/components/common/Loading';
import { CHAT_TYPE } from '@/constants/chatType';
import { useGetChatList } from '@/state/query/chat/useGetChatList';

export const ChatPage = () => {
  const [chatroomId, setChatroomId] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);

  const [page, setPage] = useState(1);

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { connectSocket, sendMessage } = useWebsocket(
    setChatList,
    chatroomId,
    setMessages,
    page,
  );

  //채팅 리스트
  const {
    data: chatListData,
    error,
    isLoading,
    refetch,
  } = useGetChatList(page, CHAT_TYPE.POST);

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
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </ChatLayout>
    </div>
  );
};
