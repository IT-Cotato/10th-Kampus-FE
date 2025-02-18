import { BoardList } from './BoardList';
export const BoardListBox = ({ list, listKey, togglePin }) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white border-[0.5px] border-primary-base">
      {list.map((data, index) => {
        return (
          <BoardList
            data={data}
            key={index}
            listKey={listKey}
            index={index}
            togglePin={togglePin}
          />
        );
      })}
    </div>
  );
};
