import { NoticeBox } from '@/components/common/noticeBox';
import { ListItem } from '@/components/chat/listItem';
import { useState } from 'react';

export const ChatList = () => {
  const dummyData = [
    {
      id: 1,
      name: 'Post 1',
      lastMessage: 'Hello!',
      time: '10:00',
      cnt: 5,
      profile: '',
    },
    {
      id: 2,
      name: 'Post 2',
      lastMessage: 'How are you?',
      time: '10:05',
      cnt: 2,
      profile: '',
    },
    {
      id: 3,
      name: 'Post 3',
      lastMessage: 'See you later!',
      time: '10:10',
      cnt: 1,
      profile: '',
    },
    {
      id: 4,
      name: 'Post 4',
      lastMessage: 'Goodbye!',
      time: '10:15',
      cnt: 0,
      profile: '',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(null);

  const handleClickOutside = () => {
    setActiveSlide(null);
  };

  return (
    <div
      className="relative flex flex-col w-full h-full gap-4 p-4"
      onClick={handleClickOutside}
    >
      <div className="text-title text-[#0B0B0B]">Chat</div>
      <NoticeBox />
      {dummyData.map((data) => (
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
