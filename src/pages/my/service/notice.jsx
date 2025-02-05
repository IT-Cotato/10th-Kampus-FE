import { NoticeList } from "@/components/service/notice/NoticeList";

export const Notice = () => {
  const Notice = [
    {
      id: 0,
      title: 'Very very very very very very long title of notice',
      date: '2025.02.05',
    },
    {
      id: 1,
      title: 'Title',
      date: '2025.02.05',
    },
    {
      id: 2,
      title: '[Event] 이벤트입니다',
      date: '2025.02.05',
    },
  ]
  return (
    <div className="flex flex-col w-full">
      {Notice.map((notice) => (
        <NoticeList key={notice.id} title={notice.title} date={notice.date} />
      ))}
    </div>
  );
};
