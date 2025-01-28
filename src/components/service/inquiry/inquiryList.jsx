import { InquiryButton } from '@/components/service/inquiry/inquiryButton';
import { InquiryEmpty } from '@/components/service/inquiry/inquiryEmpty';
import { InquiryItem } from '@/components/service/inquiry/inquiryItem';

export const InquiryList = () => {
  const list = [
    {
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'waiting',
    },
    {
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'waiting',
    },
    {
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'waiting',
    },
  ];
  return (
    <div className="mx-4">
      {/* get 데이터 null 일때
      <InquiryEmpty /> */}

      {/* 데이터 있을때 */}
      <div className="mx-auto">
        <InquiryButton />
      </div>
      {list.map((item) => (
        <InquiryItem
          title={item.title}
          date={item.date}
          pending={item.pending}
        />
      ))}
    </div>
  );
};
