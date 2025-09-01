import { useEffect, useState } from 'react';
import { BOARD_TYPE } from '@/constants/boardConstant';
import { useGetBoardList } from '@/state/query/allBoard/useGetBoardList';
import { useToggleFavorite } from '@/state/mutation/allBoard/useToggleFavorite';
import { BoardList } from '@/components/board/BoardList';
import { useSnackbarStore } from '@/stores/useSnackbarStore';

export const AllBoard = () => {
  const [listArray, setListArray] = useState({});

  const { data: listData } = useGetBoardList();
  const { showSnackbar } = useSnackbarStore();

  const { mutate: toggleFavorite } = useToggleFavorite({
    showPinSuccessSnackbar: () => showSnackbar('Pinned to the board'),
    showUnpinSuccessSnackbar: () => showSnackbar('Unpinned from the board'),
  });

  const parseBoardData = (dataList) => {
    const boardList = { univ: [], first: [], second: [], third: [] };
    dataList?.forEach((data) => {
      const formatData = {
        title: data.boardName,
        description: data.description,
        pin: data.isFavorite,
        order: data.boardId,
        boardType: data.boardType,
      };
      if (data.boardType === BOARD_TYPE.UNIV) {
        boardList.univ.push(formatData);
      } else if (
        data.boardType === BOARD_TYPE.FIXED ||
        data.boardType === BOARD_TYPE.TRENDING
      ) {
        boardList.first.push(formatData);
      } else if (data.boardType === BOARD_TYPE.CARD) {
        boardList.second.push(formatData);
      } else if (data.boardType === BOARD_TYPE.NORMAL) {
        boardList.third.push(formatData);
      }
    });
    return {
      univ: boardList.univ ?? [],
      first: boardList.first ?? [],
      second: boardList.second ?? [],
      third: boardList.third ?? [],
    };
  };

  const sortList = (data) => {
    const sortedList = {};
    Object.keys(data).forEach((key) => {
      // 우선순위 1: 핀 여부, 2: 기존 순서
      // pin이 true인 항목을 먼저, false는 그 다음 순서
      const pinnedItems = data[key].filter((item) => item.pin);
      const unpinnedItems = data[key].filter((item) => !item.pin);

      // order 값 기준으로 정렬
      pinnedItems.sort((a, b) => a.order - b.order);
      unpinnedItems.sort((a, b) => a.order - b.order);

      sortedList[key] = [...pinnedItems, ...unpinnedItems];
    });
    return sortedList;
  };

  const togglePin = (listKey, index, boardId) => {
    setListArray((prev) => {
      const updatedList = { ...prev };
      updatedList[listKey] = [...updatedList[listKey]];
      updatedList[listKey][index] = {
        ...updatedList[listKey][index],
        pin: !updatedList[listKey][index].pin,
      };
      return sortList(updatedList);
    });
    toggleFavorite({
      boardId: boardId,
      isPinned: listArray[listKey][index].pin,
    });
  };

  useEffect(() => {
    if (!listData || !listData.boards) return;

    const mergedBoards = [...listData.boards];

    const parsedData = parseBoardData(mergedBoards);
    const sortedData = sortList(parsedData);
    setListArray(sortedData);
  }, [listData]);

  return (
    <div className="relative flex h-full w-full flex-col gap-4 bg-[#FCFCFC] p-4">
      <div className="text-title text-neutral-title">Board</div>
      {Object.entries(listArray).map(([key, list], idx) => {
        if (list.length === 0) return null;

        return (
          <div
            className="flex flex-col items-start rounded-lg bg-white shadow-board"
            key={idx}
          >
            {list.map((data, index) => (
              <BoardList
                data={data}
                key={data.order}
                listKey={key}
                index={index}
                togglePin={togglePin}
                boardType={data.boardType}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
