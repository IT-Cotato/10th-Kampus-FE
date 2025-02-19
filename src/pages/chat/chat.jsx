import { ChatList } from '@/components/chat/chatListPage';
import { ChatRoom } from '@/components/chat/chatRoomPage';
import { ACCESS_TOKEN_KEY } from '@/constants/api';
import { useWebsocket } from '@/hooks/use-websocket';
import { useEffect, useState } from 'react';

export const ChatPage = () => {
  const [chatRoomId, setChatRoomId] = useState();

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { connectSocket, disconnect } = useWebsocket();

  useEffect(() => {
    connectSocket(accessToken);

    return () => {
      disconnect();
    };
  }, [connectSocket, disconnect]);

  return (
    <div className="w-full h-full">
      {!chatRoomId ? (
        <ChatList onChatRoomSelect={setChatRoomId} />
      ) : (
        <ChatRoom chatRoomId={chatRoomId} />
      )}
    </div>
  );
};
