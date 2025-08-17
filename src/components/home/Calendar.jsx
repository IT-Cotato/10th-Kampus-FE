import { formatDate, formatMonth } from '@/utils/formatDate';

const Calendar = () => {
  return (
    <article className="flex h-fit w-fit items-center gap-4 rounded-[.625rem]">
      <span className="flex h-6 w-1 items-center rounded-r-[4px] bg-primary-20" />
      <div className="flex flex-col">
        <div className="text-center text-pageTitle text-neutral-title">
          {formatDate()}
        </div>
        <div className="text-center text-small text-neutral-title">
          {formatMonth()}
        </div>
      </div>
    </article>
  );
};

export default Calendar;
