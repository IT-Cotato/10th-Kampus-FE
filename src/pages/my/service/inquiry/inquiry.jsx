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
    <div className="flex flex-col w-full h-full">
      {count === 0 ? (
        // data.inquiry.length === 0
        <div className='flex flex-col items-center justify-center w-full h-full gap-[.625rem]'>
          <span>There is no history of inquiry.</span>
          <InquiryButton />
        </div>
      ) : (
        <div className='flex flex-col w-full'>
          <div className="flex justify-center pt-5 pb-7">
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
