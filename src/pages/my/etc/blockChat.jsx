import { ChatBlockedList } from '@/components/block/ChatBlockedList';
import Logo from '@/assets/imgs/kampusLogoDisabled.svg';

export const BlockChat = () => {
  const list = [
    {
      id: 0,
      title: 'Very very very very very very long title',
      content:
        'Lorem ipsum dolor sit amet consectetur. Tortor dictumst nam tortor diam semper lorem ut. Facilisis ultrices diam amet cursus. Malesuada sed feugiat ridiculus nunc ultrices pellentesque tellus et velit. Nisi id consectetur elementum malesuada scelerisque ut auctor lacus quis. Quam mattis magna ut nullam. Aliquam facilisis nulla convallis a varius eget velit mattis dui. Arcu curabitur faucibus montes donec. At elit quisque ipsum luctus nunc. Cursus vestibulum id fringilla egestas commodo.',
    },
    {
      id: 1,
      title: 'Article Title',
      content: 'content',
    },
    {
      id: 2,
      title: 'Article Title',
      content:
        'contentcontentcontentcontentcontentcontentcontentcontentcontent',
    },
  ];

  let count = 0;

  const handleUnblock = (userId) => {
    console.log(userId + ' unblocked');
  };

  return (
    <div className="flex flex-col w-full h-full">
      {count === 0 ? (
        // data.inquiry.length === 0
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 -translate-y-10">
          <img src={Logo} className="w-32" />
          <span className='text-neutral-border-40'>You don't have blocked any users yet.</span>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {list.map((item, index) => (
            <ChatBlockedList
              key={index}
              title={item.title}
              content={item.content}
              userId={item.id}
              onClick={handleUnblock}
            />
          ))}
        </div>
      )}
    </div>
  );
};
