import { InquiryButton } from '@/components/service/inquiry/inquiryButton';
import { InquiryItem } from '@/components/service/inquiry/inquiryItem';

export const Inquiry = () => {
  const list = [
    {
      id: 0,
      title: 'Very very very very very very long title of inquiry',
      date: '2024.11.22',
      pending: 'Waiting',
    },
    {
      id: 1,
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'Waiting',
    },
    {
      id: 2,
      title: 'title of inquiry',
      date: '2024.11.22',
      pending: 'Answered',
    },
  ];

  let count = 1;

  return (
    <div className="flex h-full w-full flex-col">
      {count === 0 ? (
        // data.inquiry.length === 0
        <div className="flex h-full w-full flex-col items-center justify-center gap-[.625rem]">
          <span>There is no history of inquiry.</span>
          <InquiryButton />
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex justify-center pb-7 pt-5">
            <InquiryButton />
          </div>
          {list.map((item, index) => (
            <InquiryItem
              key={index}
              title={item.title}
              date={item.date}
              pending={item.pending}
              inquiryId={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
