import { BoxList } from './BoxList';
import { BoardHeader } from './BoardHeader';
import { CardPost } from './BoxList';

export const BoardBox = ({
  boardTitle,
  data,
  isUniversity = false,
  boardId = undefined,
  isTrending = false,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <BoardHeader
        title={boardTitle}
        boardId={boardId}
        isTrending={isTrending}
      />
      <div className="flex h-fit w-full flex-col rounded-[1.25rem] bg-white py-[.875rem] shadow-home">
        {data?.map((list, index) => (
          <BoxList
            key={index}
            list={list}
            isUniversity={isUniversity}
            isTrending={isTrending}
          />
        ))}
      </div>
    </div>
  );
};

export const CardPostBox = ({ data }) => {
  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden">
      <BoardHeader title="How to live in Korea" boardId={1} />
      <div className="grid shrink-0 cursor-pointer grid-flow-col gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
        {data?.map((item, index) => (
          <CardPost key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
