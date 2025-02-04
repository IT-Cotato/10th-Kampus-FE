import { InquiryButton } from '@/components/service/inquiry/inquiryButton';
import { InquiryEmpty } from '@/components/service/inquiry/inquiryEmpty';
import { InquiryItem } from '@/components/service/inquiry/inquiryItem';

export const Inquiry = () => {
  const list = [
    {
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'Waiting',
    },
    {
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'Waiting',
    },
    {
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'Answered',
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* get 데이터 null 일때
      <InquiryEmpty /> */}

      {/* 데이터 있을때 */}
      <InquiryButton />
      {list.map((item, index) => (
        <InquiryItem
          key={index}
          title={item.title}
          date={item.date}
          pending={item.pending}
        />
      ))}
    </div>
  );
};
