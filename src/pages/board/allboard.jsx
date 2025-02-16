import React, { useEffect, useState } from 'react';
import { BoardListBox } from '@/components/board/BoardListBox';
import { StateChangeAnimate } from '@/components/common/StateChangeAnimate';
import { getBoardList } from '@/apis/board/getBoardList.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { Loading } from '@/components/common/Loading';
export const AllBoard = () => {
  const { data: listData, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST],
    queryFn: getBoardList,
  })
  const [isUpdate, setIsUpdate] = useState({
    modal: false,
    prev: false,
  });
  const [listArray, setListArray] = useState({
    first: [
      { title: 'Free Talk', pin: false, order: 1 },
      { title: 'Question', pin: false, order: 2 },
      { title: 'Information', pin: false, order: 3 },
      { title: 'Trending', pin: false, order: 4 },
    ],
    second: [{ title: 'How to live in Korea', pin: false, order: 1 }],
    third: [
      { title: 'Housing', pin: false, order: 1 },
      { title: 'Part time / Job', pin: false, order: 2 },
      { title: 'Language Exchange', pin: false, order: 3 },
      { title: 'Festival / Events', pin: false, order: 4 },
    ],
  });
  const parseBoardData = (dataList) => {
    const boardList = { first: [], second: [], third: [] };
    dataList?.forEach((data) => {
      const formatData = {
        title: data.boardName,
        pin: data.isFavorite,
        order: data.boardId,
      }
      if (data.boardId >= 0 && data.boardId <= 3) {
        boardList.first.push(formatData);
      }
      else if (data.boardId === 4) {
        boardList.second.push(formatData);
      }
      else {
        boardList.third.push(formatData);
      }
    })
    return {
      first: boardList.first ?? [],
      second: boardList.second ?? [],
      third: boardList.third ?? [],
    }
  }
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
    })
    return sortedList;
  };
  const togglePin = (listKey, index) => {
    setListArray((prev) => {
      const updatedList = { ...prev };
      updatedList[listKey] = [...updatedList[listKey]];
      setIsUpdate({
        modal: true,
        prev: updatedList[listKey][index].pin,
      });
      updatedList[listKey][index] = {
        ...updatedList[listKey][index],
        pin: !updatedList[listKey][index].pin,
      };
      const sortedList = sortList(updatedList)
      return sortedList;
    });
    setTimeout(() => {
      // 핀 변경 시, 1.5초동안 모달 보여주기
      setIsUpdate((prevState) => ({
        ...prevState,
        modal: false,
      }));
    }, 1500);
  };

  useEffect(() => {
    /*if (!listData || !listData.boards) return;
    const parsedData = parseBoardData(listData.boards);
    const sortedData = sortList(parsedData);
    setListArray(sortedData);*/
  }, [listData]);


  return (
    <div className="relative flex h-full w-full flex-col gap-4 p-4">
      {isUpdate.modal && (
        <StateChangeAnimate
          state={isUpdate.prev}
          changeToTrueText={'Pinned to the board'}
          changeToFalseText={'Unpinned from the board'}
        />
      )}
      {isLoading && <Loading />}
      {error && <div>Error loading data</div>}
      {!isLoading && !error && (
        <>
          <div className="text-title text-neutral-title">Board</div>
          {Object.entries(listArray).map(([key, value], index) => {
            return (
              <BoardListBox
                list={value}
                key={index}
                listKey={key}
                togglePin={togglePin}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
