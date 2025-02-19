import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';
import { useRef } from 'react';
import { postReadMessage } from '@/apis/chat/chatList.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getUser } from '@/apis/user/userDetail.api';

const BASE_URL = import.meta.env.VITE_API_SOCKET_URL;
const SOCKET_URL = `${BASE_URL}/websocket`;

export const useWebsocket = () => {
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  const { data: userDetail } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_ME],
    queryFn: getUser,
  });
  const userId = userDetail.id;

  const connectSocket = (token) => {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}` },
      debug: (str) => console.log('STOMP Debug:', str),
      onConnect: () => {
        console.log('✅ WebSocket 연결 성공');
        stompClientRef.current = stompClient;
      },
      onStompError: (frame) => {
        console.error('❌ WebSocket 오류:', frame);
        alert('WebSocket 연결 실패: ' + frame.headers['message']);
      },
    });

    stompClient.activate();
    return stompClient;
  };

  const sendMessage = (chatroomId, message) => {
    const stompClient = stompClientRef.current;
    if (!message.trim() || !stompClient) return;

    const chatMessage = { chatroomId, message: message.trim() };
    stompClient.publish({
      destination: `/app/chatrooms/${chatroomId}`,
      body: JSON.stringify(chatMessage),
    });
  };

  const subscribeToNotifications = (handleNotification) => {
    const stompClient = stompClientRef.current;

    if (!stompClient || !userId) return;

    stompClient.subscribe(
      `/user/${userId}/notifications/chat`,
      (notification) => {
        const newNotification = JSON.parse(notification.body);
        handleNotification(newNotification);
      },
    );
  };

  const subscribeToChatRoom = (chatroomId, setMessages) => {
    const stompClient = stompClientRef.current;

    if (!stompClient || !chatroomId) return;

    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    subscriptionRef.current = stompClient.subscribe(
      `/chatrooms/${chatroomId}`,
      async (message) => {
        const newMessage = JSON.parse(message.body);
        const enrichedMessage = {
          ...newMessage,
          isMine: Number(newMessage.senderId) === Number(userId),
        };

        if (!enrichedMessage.isMine) {
          try {
            await postReadMessage(chatroomId);
          } catch (error) {
            console.error('읽음 처리 실패:', error);
          }
        }

        setMessages((prev) => [...prev, enrichedMessage]);
      },
    );
  };

  const disconnect = () => {
    const stompClient = stompClientRef.current;
    if (stompClient) {
      stompClient.deactivate();
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current = null;
      console.log('✅ WebSocket 연결 종료');
    }
  };

  return {
    connectSocket,
    sendMessage,
    subscribeToNotifications,
    subscribeToChatRoom,
    disconnect,
    userId: userDetail?.id,
  };
};
