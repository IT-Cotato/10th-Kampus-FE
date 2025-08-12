import { useNavigate } from 'react-router-dom';

export const InquiryItem = ({ title, date, pending, inquiryId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex w-full flex-row items-center justify-between gap-3 border-b border-primary-20 py-5"
      onClick={() => navigate(`./${inquiryId}`)}
    >
      <div className="flex w-full flex-col truncate">
        <span className="truncate text-subTitle text-neutral-title">
          {title}
        </span>
        <span className="inline-block text-neutral-base">{date}</span>
      </div>
      <div
        className={`inline-block rounded-[1.25rem] border border-primary-20 px-3 py-1 text-base text-neutral-base ${pending === 'Answered' ? 'bg-primary-10' : ''}`}
      >
        {pending}
      </div>
    </div>
  );
};
