import menubar from "@/assets/imgs/menubar.svg"
import pin from "@/assets/imgs/pin.svg"
import chat from "@/assets/imgs/startChat.svg"
import block from "@/assets/imgs/postBlock.svg"
import report from "@/assets/imgs/reportIcon.svg"
import link from "@/assets/imgs/exportLink.svg"
import postDelete from "@/assets/imgs/delete.svg"
import { useState } from "react"
import { StateChangeAnimate, startAnimation } from "./StateChangeAnimate"
import { useParams } from "react-router-dom"

export const BoardMenuBar = ({ type }) => {
    const { postId } = useParams();
    const [openPinModal, setOpenPinModal] = useState(false); // 핀 선택 창
    const [pinAni, setPinAni] = useState(false); // 핀 애니메이션 상태
    const [myPost, setMyPost] = useState(false); // 자신의 게시글인지 아닌지 판별 확인용
    const startPinAni = () => {
        // 핀 애니메이션
        setOpenPinModal(false);
        startAnimation(setPinAni);
        // 이 때 백엔드와 사용자의 보드 핀 또는 스크랩 상태 업데이트 해야 함
    };
    return (
        <div className="h-5 w-5 cursor-pointer text-neutral-title">
            <button
                onClick={() => setOpenPinModal(!openPinModal)}
            >
                <img src={menubar} alt="Menu Bar" className="w-5 h-5" />
            </button>
            {openPinModal && !postId && (   // 게시글 리스트 부분 
                <div
                    className="absolute right-4 top-12 flex items-center justify-center gap-3 rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-4 py-3 shadow-md"
                    onClick={() => startPinAni()}
                >
                    <p className="text-base">
                        {!pinAni ? 'Add to Bookmark' : 'Remove the Bookmark'}
                    </p>{' '}
                    {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
                    <img src={pin} className="w-5 h-5 -rotate-90" />
                </div>
            )}
            {openPinModal && postId && !myPost && (  // 상세 게시글 중 다른 사람 게시글 
                <div className="absolute min-w-48 right-4 top-12 flex flex-col px-4 py-2
                text-base text-neutral-title rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white shadow-md">
                    <div className="flex justify-between items-center pb-1"
                        onClick={() => console.log("Chat")}>
                        <p>Send a message</p>
                        <img src={chat} alt="Start a Chat" className="w-4 h-4" />
                    </div>
                    <div className="flex justify-between items-center py-1"
                        onClick={() => console.log("Copy")}>
                        <p>Copy URL</p>
                        <img src={link} alt="Copy URL" className="w-4 h-4" />
                    </div>
                    <div className="flex justify-between items-center py-1"
                        onClick={() => console.log("Report")}>
                        <p>Report</p>
                        <img src={report} alt="Report" className="w-4 h-4" />
                    </div>
                    <div className="flex justify-between items-center pt-1"
                        onClick={() => console.log("Block")}>
                        <p>Block</p>
                        <img src={block} alt="Block" className="w-4 h-4" />
                    </div>
                </div>
            )}
            {openPinModal && postId && myPost && ( // 상세 게시글 중 내가 작성한 게시글 
                <div className="absolute min-w-48 right-4 top-12 flex flex-col px-4 py-2
               text-base rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white shadow-md">
                    <div className="flex justify-between items-center pb-1"
                        onClick={() => console.log("Copy")}>
                        <p className="text-neutral-title ">Copy URL</p>
                        <img src={link} alt="Copy URL" className="w-4 h-4" />
                    </div>
                    <div className="flex justify-between items-center pt-1"
                        onClick={() => console.log("Delete")}>
                        <p className="text-primary-red">Delete</p>
                        <img src={postDelete} alt="Delete a Post" className="w-[1.125rem] h-[1.125rem]" />
                    </div>
                </div>
            )}
            {pinAni && (
                <StateChangeAnimate
                    state={!pinAni}
                    changeToTrueText="Pinned to the board"
                    changeToFalseText="Unpinned from the board"
                />
            )}{' '}
            {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
        </div>
    )
}