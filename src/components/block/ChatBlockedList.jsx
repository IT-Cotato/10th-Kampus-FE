export const ChatBlockedList = ({ title, content, userId, onClick }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full gap-3 py-5 border-b border-primary-20">
      <div className="flex flex-col w-full truncate">
        <span className="truncate text-subTitle text-neutral-title">
          {title}
        </span>
        <span className="inline-block truncate text-neutral-base">
          {content}
        </span>
      </div>
      <button
        className="inline-block rounded-[20px] border border-primary-20 px-3 py-1 text-base text-neutral-base"
        onClick={() => onClick(userId)}
      >
        Unblock
      </button>
    </div>
  );
};
