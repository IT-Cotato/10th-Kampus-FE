import { NoticeBox } from '@/components/common/noticeBox';
import { ListItem } from '@/components/chat/listItem';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getChatList } from '@/apis/chat/getChatList.api';
// import { connectSocket, disconnectSocket } from '@/apis/chat/websocket';

export const ChatList = () => {
  const [activeSlide, setActiveSlide] = useState(null);
  const [chatList, setChatList] = useState([]);
  const accessToken = 'access_token';

  const data = {
    chatRoomPreviewList: [
      {
        chatroomId: 9007199254740991,
        postTitle: 'postTitle1',
        lastChatMessage: 'lastMessage1',
        lastChatTime: '2025-02-11T09:27:20.354Z',
      },
      {
        chatroomId: 9007199254740992,
        postTitle: 'postTitle2',
        lastChatMessage: 'lastMessage2',
        lastChatTime: '2025-02-11T09:27:20.354Z',
      },
      {
        chatroomId: 9007199254740993,
        postTitle: 'postTitle3',
        lastChatMessage: 'lastMessage3',
        lastChatTime: '2025-02-11T09:27:20.354Z',
      },
    ],
    hasNext: true,
  };

  // const { data, error, isLoading } = useQuery({
  //   queryKey: [QUERY_KEYS.GET_CHAT_LIST],
  //   queryFn: () => getChatList(1),
  // });

  // useEffect(() => {
  //   if (data) {
  //     setChatList(data.chatRoomPreviewList);
  //   }
  // }, [data]);

  // 메시지를 수신했을 때
  const handleMessageReceived = ({ chatRoomId, content }) => {
    setChatList((prevList) => {
      const updatedList = [...prevList];
      const chatroomIndex = updatedList.findIndex(
        (chat) => chat.chatroomId === chatRoomId,
      );
      if (chatroomIndex >= 0) {
        updatedList[chatroomIndex] = {
          ...updatedList[chatroomIndex],
          lastChatMessage: content,
          lastChatTime: new Date().toISOString(),
        };
      } else {
        updatedList.push({
          chatroomId: chatRoomId,
          postTitle: `New Chat Room ${chatRoomId}`,
          lastChatMessage: content,
          lastChatTime: new Date().toISOString(),
        });
      }
      return updatedList;
    });
  };

  // useEffect(() => {
  //   connectSocket(accessToken, handleMessageReceived); // 소켓 연결

  //   return () => {
  //     disconnectSocket(); // 컴포넌트 언마운트 시 소켓 연결 종료
  //   };
  // }, []);

  const handleClickOutside = () => {
    setActiveSlide(null);
  };

  return (
    <div
      className="relative flex h-full w-full flex-col gap-4 p-4"
      onClick={handleClickOutside}
    >
      <div className="text-title text-neutral-title">Chats</div>
      <NoticeBox />
      {data.chatRoomPreviewList.map((data) => (
        <ListItem
          key={data.id}
          data={data}
          isSlide={activeSlide === data.id}
          setActiveSlide={setActiveSlide}
        />
      ))}
    </div>
  );
};
