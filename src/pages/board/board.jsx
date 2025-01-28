import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Prev from '../../assets/imgs/previous.svg?react';
import Search from '../../assets/imgs/search.svg?react';
import Menubar from '../../assets/imgs/menubar.svg?react';
import Pin from '../../assets/imgs/pin.svg?react'
import { PostList } from "@/components/board/PostList";
import { PinAnimate } from "@/components/board/PinAniamte";
import { FilterBox } from "@/components/board/FilterBox";
export const Board = () => {
    const navigate = useNavigate();
    const { boardTitle } = useParams(); // 서버와 통신 시, 파라미터에 따라 데이터 가져오기
    const [boardData, setBoardData] = useState({
        board_title: "Tips for living in Korea",
        post: [
            {
                title: 'Title',
                content: 'content',
                like: 10,
                comment: 10,
                time: '1 day ago',
                image: null,
                board_type: 'Tips for living in Korea'
            },
            {
                title: 'Title',
                content: 'content',
                like: 10,
                comment: 10,
                time: '1 day ago',
                image: null,
                board_type: 'Information'
            }
        ]
    })
    const [openPinModal, setOpenPinModal] = useState(false);
    const [pinAni, setPinAni] = useState(false);
    const pinAnimate = () => {
        setOpenPinModal(false);
        setPinAni(true);
        setTimeout(() => {
            setPinAni(false);
        }, 1500);
        // 이 때 백엔드와 사용자의 보드 핀 상태 업데이트 해야 함 
    }
    // 필터를 사용하는 2개 보드 여부 확인하여 아니라면 렌더링을 하지 않아 불필요한 상태관리 비활성화
    const isActiveCategory_Sort = boardTitle === 'question' || boardTitle === 'information';

    return (
        <div className="w-full h-full flex flex-col">
            {pinAni && <PinAnimate state={!pinAni} />}  {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
            <div className="w-full py-4 bg-white px-4 flex justify-between items-center border-b-[0.5px] border-[#D8D8D8]">
                <Prev className="w-5 h-5 cursor-pointer" onClick={() => navigate('../')} />
                <p className="text-subTitle text-neutral-title font-medium">{boardTitle}</p>
                <div className="flex gap-6 items-center">
                    <Search className="text-neutral-title w-6 h-6 cursor-pointer" />
                    <div className="text-neutral-title w-1 h-5 cursor-pointer">
                        <Menubar className="w-1 h-5" onClick={() => setOpenPinModal(!openPinModal)} />
                        {openPinModal && (
                            <div className="absolute rounded-[0.625rem] top-12 right-4 flex px-3 py-2 justify-center items-center gap-2 border-[0.5px] border-[#D8D8D8] bg-white shadow-md"
                                onClick={pinAnimate}>
                                <p className="text-base">{!pinAni ? 'Add to Pin' : 'Remove the Pin'}</p> {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
                                <Pin className="w-[1.125rem] h-[1.125rem]" />
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="flex flex-col px-4 py-5 w-full bg-white gap-[0.875rem]">
                <div className="flex w-full justify-center items-center bg-neutral-bg-10 rounded-[0.625rem]
                text-subTitle font-normal py-3 text-[#6A6A6A] cursor-pointer">
                    Notice
                </div>
                {isActiveCategory_Sort &&
                    <FilterBox />}  {/** 추후, 백엔드와 필터 작업 시 props 넘겨줘야 함 */}
            </div>
            <div className="flex flex-col flex-1 w-full bg-white px-4 divide-y">
                <PostList data={boardData.post[0]} />
                <PostList data={boardData.post[1]} />
            </div>
        </div>
    )
}
