import Search from "@/assets/imgs/search.svg?react"
import Pin from "@/assets/imgs/pin.svg?react"
import React, { useEffect, useState } from "react";

export const AllBoard = () => {
  const [isUpdate, setIsUpdate] = useState({
    modal: false,
    prev: false,
  });
  const [listArray, setListArray] = useState({
    first: [
      { title: "Free Talk", pin: false, order: 1 },
      { title: "Question", pin: false, order: 2 },
      { title: "Information", pin: false, order: 3 },
      { title: "Trending", pin: false, order: 4 }
    ],
    second: [
      { title: "Tips for living in Korea", pin: false, order: 1 }
    ],
    third: [
      { title: "Housing", pin: false, order: 1 },
      { title: "Part time / job", pin: false, order: 2 },
      { title: "Language Exchange", pin: false, order: 3 },
      { title: "Festival / Events", pin: false, order: 4 }
    ]
  })
  const sortList = () => {
    setListArray((prev) => {
      const newList = {};
      Object.keys(prev).forEach((key) => {  // 우선순위 1: 핀 여부, 2: 기존 순서
        // pin이 true인 항목을 먼저, false는 그 다음 순서 
        const pinnedItems = prev[key].filter(item => item.pin);
        const unpinnedItems = prev[key].filter(item => !item.pin);

        //그 후, order값을 기준으로 정렬
        pinnedItems.sort((a, b) => a.order - b.order);
        unpinnedItems.sort((a, b) => a.order - b.order);

        newList[key] = [...pinnedItems, ...unpinnedItems];
      });

      return {
        ...prev,
        ...newList
      };
    });
  };
  const togglePin = (listKey, index) => {
    setListArray((prev) => {
      const updatedList = { ...prev };
      updatedList[listKey] = [...updatedList[listKey]];
      setIsUpdate({
        modal: true,
        prev: updatedList[listKey][index].pin,
      })
      updatedList[listKey][index] = {
        ...updatedList[listKey][index],
        pin: !updatedList[listKey][index].pin
      };
      return updatedList;
    });
    sortList();
    setTimeout(() => {  // 핀 변경 시, 1초동안 모달 보여주기
      setIsUpdate(prevState => ({
        ...prevState,
        modal: false,
      }))
    }, 1500)
  }

  useEffect(() => { // 서버와 통신되면 리액트 쿼리로 바꿀 예정
    sortList();
  }, [])

  return (
    <div className="p-4 flex flex-col w-full h-full gap-4 relative">
      {isUpdate.modal && <div className={`absolute inset-0 z-40 flex justify-center items-center bg-neutral-700  
        animate-fadeInOutModal`}
      />}
      {isUpdate.modal && <div className={`absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        rounded-xl px-12 py-4 bg-white animate-fadeInOutText`}
      >
        <p className="truncate">{isUpdate.prev ? 'Unpinned from the board' : 'Pinned to the board'}</p>
      </div>}

      <div className="text-title font-pretendard text-black">Board</div>
      <div className="relative w-full ">
        <input
          type="text"
          placeholder="Board, title, text, hashing"
          className="w-full text-white font-pretendard text-base bg-[#EAEAEA] placeholder-white rounded-[1.25rem] pl-12 pr-4 py-[0.625rem]"
        />
        <Search className="text-white absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 " />
      </div>
      {Object.entries(listArray).map(([key, value], index) => {
        return (
          <BoardListBox
            list={value}
            key={index}
            listKey={key}
            togglePin={togglePin}
          />
        )
      })
      }
    </div>
  )
};
const BoardList = ({ data, listKey, index, togglePin }) => {
  return (
    <div className="flex gap-4 px-4 py-4 items-center">
      <Pin className={data.pin ? `w-5 h-5 text-[#525252]` : `w-5 h-5 text-white`}
        onClick={() => togglePin(listKey, index)}
      />
      <p className="font-pretendard text-base text-[#525252]">{data.title}</p>
    </div>
  )
}
const BoardListBox = ({ list, listKey, togglePin }) => {
  return (
    <div className="flex flex-col w-full bg-[#EAEAEA] rounded-lg divide-y divide-white">
      {list.map((data, index) => {
        return (
          <BoardList
            data={data}
            key={index}
            listKey={listKey}
            index={index}
            togglePin={togglePin}
          />
        )
      })}
    </div>
  )
}