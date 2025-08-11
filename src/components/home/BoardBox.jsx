import { BoxList } from './BoxList';
import { BoardHeader } from './BoardHeader';
import { CardPost } from './BoxList';
export const BoardBox = ({
  boardTitle,
  data,
  university = false,
  boardId = undefined,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <BoardHeader title={boardTitle} boardId={boardId} />
      <div className="flex h-fit w-full flex-col rounded-[1.25rem] bg-white py-[.875rem] shadow-home">
        {university ? (
          <BoxList text={data} />
        ) : (
          data?.map((text, index) => <BoxList key={index} text={text} />)
        )}
      </div>
    </div>
  );
};
export const CardPostBox = ({ data }) => {
  return (
    <div className="flex w-full flex-col gap-[1.875rem] overflow-hidden">
      <BoardHeader title="How to live in Korea" />
      <div className="grid shrink-0 cursor-pointer grid-flow-col gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
        {data?.map((item, index) => (
          <CardPost key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
