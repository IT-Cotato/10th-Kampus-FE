export const InquiryItem = ({ title, date, pending }) => {
  return (
    <div className="flex flex-row items-center justify-between border-b-[1px] border-primary-base ">
      <div className="flex flex-col">
        <span className="text-subTitle text-neutral-title">{title}</span>
        <span className="text-base text-neutral-base">{date}</span>
      </div>
      <div className="flex border-[1px] border-primary-20 px-4 py-2 rounded-[1.25rem] text-base text-neutral-base">
        {pending}
      </div>
    </div>
  );
};
