import { useNavigate } from 'react-router-dom';

export const InquiryItem = ({ title, date, pending, inquiryId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row items-center justify-between w-full gap-3 py-5 border-b border-primary-20"
      onClick={() => navigate(`./${inquiryId}`)}
    >
      <div className="flex flex-col w-full truncate">
        <span className="truncate text-subTitle text-neutral-title">
          {title}
        </span>
        <span className="inline-block text-neutral-base">{date}</span>
      </div>
      <div
        className={`inline-block border border-primary-20 px-3 py-1 rounded-[1.25rem] text-base text-neutral-base ${pending === 'Answered' ? 'bg-primary-10' : ''}`}
      >
        {pending}
      </div>
    </div>
  );
};
