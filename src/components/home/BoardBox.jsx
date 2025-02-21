import { BoxList } from './BoxList';
import { BoardHeader } from './BoardHeader';
import { CardPost } from './BoxList';
export const BoardBox = ({ boardTitle, data, path }) => {
  return (
    <div className="flex flex-col gap-5">
      <BoardHeader title={boardTitle} />
      <div className="flex min-h-[16.875rem] w-full flex-col rounded-[.625rem] bg-primary-5 px-5 py-[.625rem]">
        {data?.map((text, index) => (
          <BoxList key={index} text={text} />
        ))}
      </div>
    </div>
  );
};
export const CardPostBox = ({ data, path }) => {
  return (
    <div className="flex w-full flex-col gap-[1.875rem] overflow-hidden">
      <BoardHeader title="How to live in Korea" />
      <div className="grid shrink-0 grid-flow-col gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
        {data?.map((item, index) => (
          <CardPost key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
