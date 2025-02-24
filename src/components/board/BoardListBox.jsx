import { BoardList } from './BoardList';

export const BoardListBox = ({ list, listKey, togglePin }) => {
  let boardNum = list.length;

  if (boardNum === 0) return null;

  return (
    <div className="flex w-full flex-col rounded-lg bg-white border-[0.5px] border-primary-base">
      {list.map((data, index) => (
        <BoardList
          data={data}
          key={data.order}
          listKey={listKey}
          index={index}
          togglePin={togglePin}
        />
      ))}
    </div>
  );
};
