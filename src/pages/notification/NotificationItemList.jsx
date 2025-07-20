import { NotificationHeader } from '@/components/notification/NotificationHeader';
import { NotificationBox } from '@/components/notification/NotificationBox';
export const NotificationItemList = () => {
  const dummyData = [
    {
      createdTime: '2 hours ago',
      title: 'Title of Inquiry',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'comment',
      isRead: false,
    },
    {
      createdTime: '2 hours ago',
      title: 'Title of Inquiry',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'trending',
      isRead: true,
    },
    {
      createdTime: '2 hours ago',
      title: 'Title of Inquiry',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'trending',
      isRead: false,
    },
    {
      createdTime: '2 hours ago',
      title: 'Title of Inquiry',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'comment',
      isRead: true,
    },
  ];

  return (
    <div className="h-full w-full">
      <NotificationHeader />
      <div className="flex h-full w-full flex-col pt-[5.375rem]">
        {dummyData.map((item, index) => (
          <NotificationBox data={item} key={index} />
        ))}
      </div>
    </div>
  );
};
