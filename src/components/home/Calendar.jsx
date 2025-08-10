import { formatDate, formatMonth } from '@/utils/formatDate';

const Calendar = () => {
  return (
    <article className="flex h-fit w-fit items-center gap-4 rounded-[.625rem]">
      <div className="flex items-center gap-2">
        <span className="h-6 w-1 rounded-r-[4px] bg-primary-20" />
        <div className="flex flex-col">
          <div className="text-center text-pageTitle text-neutral-title">
            {formatDate()}
          </div>
          <div className="text-center text-small text-neutral-title">
            {formatMonth()}
          </div>
        </div>
      </div>
      <div className="text-[.875rem] font-semibold text-primary-red">
        Children's Day
      </div>
    </article>
  );
};

export default Calendar;
