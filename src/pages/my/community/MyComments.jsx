import Logo from '@/assets/imgs/disabledLogo.svg';
import { PostList } from "@/components/board/PostList";
import { useState } from 'react';

export const MyComments = () => {
  const [boardData, setBoardData] = useState({
    post: [
      {
        title: 'This is an article with a long long title',
        content: 'And an article that has a long long long long long long long long long long content',
        like: 8,
        comment: 4,
        time: '1 day ago',
        image: Logo,
        board_type: 'Information',
        scrap: false,
      },
      {
        title: 'Wrote a comment on this article',
        content: 'content',
        like: 10,
        comment: 10,
        time: '1 day ago',
        image: null,
        board_type: 'Tips for living in Korea',
        scrap: false,
      },
    ],
  });

  let count = 1;

  return (
    <div className="flex flex-col w-full h-full">
      {count === 0 ? (
        // data.inquiry.length === 0
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 -translate-y-10">
          <img src={Logo} className="w-32" />
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
