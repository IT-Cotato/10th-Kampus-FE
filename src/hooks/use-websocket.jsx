import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { postReadMessage } from '@/apis/chat/chatList.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getUser } from '@/apis/user/userDetail.api';

const BASE_URL = import.meta.env.VITE_API_SOCKET_URL;
const SOCKET_URL = `${BASE_URL}/websocket`;

export const useWebsocket = (setChatList, chatroomId) => {
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const notificationSubscriptionRef = useRef(null);

  const [connected, setConnected] = useState(false);

  const { data: userDetail } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_ME],
    queryFn: getUser,
  });

  useEffect(() => {
    if (stompClientRef.current) {
      console.log('✅ Connected 상태 변경 감지 - 구독 시작');
      subscribeToNotifications();
    }
  }, [stompClientRef]);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (notificationSubscriptionRef.current) {
        notificationSubscriptionRef.current.unsubscribe();
      }
    };
  }, []);

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
        setConnected(true);
        if (chatroomId) {
          subscribeToChatRoom(chatroomId);
        }
        subscribeToNotifications();
      },
      onStompError: (frame) => {
        console.error('❌ WebSocket 오류:', frame);
        alert('WebSocket 연결 실패: ' + frame.headers['message']);
      },
    });

    stompClient.activate();
  };

  //알림구독 - 메시지 감지
  const handleNotification = (notification) => {
    console.log('💬 새로운 알림 수신:', notification);

    setChatList((prevChatList) => {
      const updatedRooms = [...prevChatList];
      const roomIndex = updatedRooms.findIndex(
        (room) => room.chatroomId === notification.chatroomId,
      );

      // 알림이 수신된 채팅방이 이미 존재하는 경우
      if (roomIndex !== -1) {
        const isCurrentRoom = notification.chatroomId === chatroomId;

        // 기존 방 정보를 업데이트
        const updatedRoom = {
          ...updatedRooms[roomIndex],
          unreadCount: isCurrentRoom
            ? updatedRooms[roomIndex].unreadCount
            : (updatedRooms[roomIndex].unreadCount || 0) + 1,
          lastMessageContent: notification.lastChatMessage,
          lastChatTime: notification.lastChatTime,
        };

        // 기존 방 제거 후, 업데이트된 방을 리스트의 앞에 추가
        updatedRooms.splice(roomIndex, 1);
        updatedRooms.unshift(updatedRoom);
      } else {
        // 새로운 채팅방인 경우, 방 추가
        const newRoom = {
          chatroomId: notification.chatroomId,
          lastMessageContent: notification.lastChatMessage,
          lastChatTime: notification.lastChatTime,
          unreadCount: 1, // 새로 추가된 방은 읽지 않은 메시지 수 1로 설정
        };
        updatedRooms.unshift(newRoom);
      }

      return updatedRooms;
    });
  };

  const subscribeToNotifications = () => {
    console.log('subscribeToNotifications 호출됨');
    console.log('stompClient 존재 여부:', !!stompClientRef.current);
    console.log('connected 상태:', connected);

    if (!stompClientRef.current) {
      console.warn('❌ 채팅방 구독 실패: 클라이언트가 초기화되지 않음');
      return;
    }
    if (!userDetail?.id) {
      console.warn('❌ 채팅방 구독 실패: 유저 ID 없음');
      return;
    }

    if (notificationSubscriptionRef.current) {
      console.log('기존 구독 해제');
      notificationSubscriptionRef.current.unsubscribe();
    }

    notificationSubscriptionRef.current = stompClientRef.current.subscribe(
      `/user/${userDetail?.id}/notifications/chat`,
      (message) => {
        const newNotification = JSON.parse(message.body);
        console.log('💬 새로운 채팅 알림 수신:', newNotification);

        if (!newNotification.chatroomId || !newNotification.lastChatMessage) {
          console.warn('❌ 잘못된 알림 형식:', newNotification);
          return;
        }

        handleNotification(newNotification);
        console.log('✅ 알림 처리 성공:', newNotification);
      },
    );
  };

  const subscribeToChatRoom = (chatroomId) => {
    if (!stompClientRef.current) {
      console.warn('❌ 채팅방 구독 실패: 클라이언트가 초기화되지 않음');
      return;
    }
    if (!chatroomId) {
      console.warn('❌ 채팅방 구독 실패: 채팅방 ID 없음');
      return;
    }

    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      console.log('✅ 이전 채팅방 구독 해제');
    }

    console.log(`🟢 구독 시도: /chatrooms/${chatroomId}`);
    subscriptionRef.current = stompClientRef.current.subscribe(
      `/chatrooms/${chatroomId}`,
      async (message) => {
        console.log(message, 'message'); // 수신된 메시지 로그

        const newMessage = JSON.parse(message.body);
        const enrichedMessage = {
          ...newMessage,
          isMine: Number(newMessage.senderId) === Number(userDetail?.id),
        };

        if (!enrichedMessage.isMine) {
          postReadMessage(chatroomId);
        }

        return enrichedMessage;
      },
    );
    console.log('✅ 채팅방 구독 성공:', chatroomId);
  };

  const sendMessage = (chatroomId, message) => {
    if (!connected) {
      // 연결 상태 확인
      console.warn('❌ 메시지 전송 실패: 연결상태확인');
      return;
    }
    if (!message) {
      console.warn('❌ 메시지 전송 실패: 메시지 없음');
      return;
    }
    if (!stompClientRef.current) {
      console.warn('❌ 메시지 전송 실패: 클라이언트 없음');
      return;
    }

    const chatMessage = { chatroomId, message: message.trim() };
    stompClientRef.current.publish({
      destination: `/app/chatrooms/${chatroomId}`,
      body: JSON.stringify(chatMessage),
    });
    console.log('✅ 메시지 전송 성공:', chatMessage); // 메시지 전송 성공 로그
  };

  const disconnect = () => {
    const stompClient = stompClientRef.current;
    if (stompClient) {
      stompClient.deactivate();
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current = null;
      // setConnected(false);
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
