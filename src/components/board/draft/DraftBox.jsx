import { BoardName } from '../BoardName';

export const DraftBox = ({ title, content, createdTime }) => {
  return (
    <li className="flex w-full flex-col gap-2 py-4">
      {/* 게시판명 */}
      <BoardName>Board Name</BoardName>
      <span className="flex w-full justify-between gap-20">
        <span className="flex w-full flex-col gap-5 truncate">
          <div className="flex w-full flex-col">
            {/* 제목 */}
            <h1 className="text-subTitle text-neutral-title">{title}</h1>
            {/* 본문 */}
            <div className="min-w-0 truncate text-base text-neutral-base">
              {content}
            </div>
          </div>
          {/* 임시저장 시각 */}
          <div className="flex gap-[10px] text-small text-neutral-border-50">
            <span>{createdTime}</span>
            <span>Jan 20, 2025</span>
            <span>00:00</span>
          </div>
        </span>
        {/* 사진 */}
        <span className="flex h-20 w-20 flex-shrink-0">사진</span>
      </span>
    </li>
  );
};
