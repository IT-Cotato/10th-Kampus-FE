import React, { useEffect, useState } from 'react';
import { BoardListBox } from '@/components/board/BoardListBox';
import { StateChangeAnimate } from '@/components/common/StateChangeAnimate';
import { getBoardList } from '@/apis/board/getBoardList.api';
import { addBoardFavorite, deleteBoardFavorite } from '@/apis/board/toggleBoardFavorite.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { Loading } from '@/components/common/Loading';
export const AllBoard = () => {
  const queryClient = useQueryClient()
  const { data: listData, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST],
    queryFn: getBoardList,
  })
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: ({ boardId, isPinned }) =>
      isPinned ? deleteBoardFavorite({ boardId }) : addBoardFavorite({ boardId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST] });
    }
  })

  const [isUpdate, setIsUpdate] = useState({
    modal: false,
    prev: false,
  });

  const [listArray, setListArray] = useState({});

  const parseBoardData = (dataList) => {
    const boardList = { first: [], second: [], third: [] };
    dataList?.forEach((data) => {
      const formatData = {
        title: data.boardName,
        pin: data.isFavorite,
        order: data.boardId,
      }
      if (data.boardId >= 1 && data.boardId <= 4) {
        boardList.first.push(formatData);
      }
      else if (data.boardId === 5) {
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

  const togglePin = (listKey, index, boardId) => {
    const isPinned = listArray[listKey][index].pin;
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
      return sortList(updatedList);
    });
    toggleFavorite({ boardId, isPinned })
    setTimeout(() => {
      // 핀 변경 시, 1.5초동안 모달 보여주기
      setIsUpdate((prevState) => ({
        ...prevState,
        modal: false,
      }));
    }, 1500);
  };

  useEffect(() => {
    if (!listData || !listData.boards) return;
    const parsedData = parseBoardData(listData.boards);
    const sortedData = sortList(parsedData);
    setListArray(sortedData);
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
