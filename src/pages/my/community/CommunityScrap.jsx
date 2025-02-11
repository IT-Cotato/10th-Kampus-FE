import Logo from '@/assets/imgs/kampusLogo.svg?react';
import { PostList } from "@/components/board/PostList";
import { useState } from 'react';

export const CommunityScrap = () => {
  const [boardData, setBoardData] = useState({
    post: [
      {
        title: 'Title',
        content: 'content',
        like: 10,
        comment: 10,
        time: '1 day ago',
        image: null,
        board_type: 'Tips for living in Korea',
        scrap: false,
      },
      {
        title: 'Title',
        content: 'content',
        like: 8,
        comment: 4,
        time: '1 day ago',
        image: Logo,
        board_type: 'Information',
        scrap: false,
      },
    ],
  });

  let count = 0;

  return (
    <div className="flex flex-col w-full h-full">
      {count === 0 ? (
        // data.inquiry.length === 0
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 -translate-y-10">
          <Logo className="w-32 text-neutral-disabled" />
          <span className='text-neutral-border-40'>There's nothing you've scraped! Try saving your interest :)</span>
        </div>
      ) : (
        <div className="flex flex-col flex-1 w-full bg-white divide-y">
          {boardData.post.map((item, index) => (
            <PostList key={index} data={item} isActive={true} />
          ))}
        </div>
      )}
    </div>
  );
};
