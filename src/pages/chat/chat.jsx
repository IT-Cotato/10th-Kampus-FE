import { ChatList } from '@/components/chat/chatListPage';
import { ChatRoom } from '@/components/chat/chatRoomPage';
import { ACCESS_TOKEN_KEY } from '@/constants/api';
import { useWebsocket } from '@/hooks/use-websocket';
import { useEffect, useState } from 'react';

export const ChatPage = () => {
  const [chatRoomId, setChatRoomId] = useState();
  const [chatList, setChatList] = useState([]);

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { connectSocket, subscribeToNotifications, disconnect } =
    useWebsocket();

  useEffect(() => {
    connectSocket(accessToken);

    subscribeToNotifications((newNotification) => {
      setChatList((prevChatList) => {
        const updatedChatList = [...prevChatList, newNotification];
        return updatedChatList.sort(
          (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime),
        );
      });
    });

    return () => {
      disconnect();
    };
  }, [connectSocket, disconnect]);

  return (
    <div className="w-full h-full">
      {!chatRoomId ? (
        <ChatList
          onChatRoomSelect={setChatRoomId}
          chatList={chatList}
          setChatList={setChatList}
        />
      ) : (
        <ChatRoom chatRoomId={chatRoomId} />
      )}
    </div>
  );
};
