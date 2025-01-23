import { useState } from "react";
import X from "@/assets/imgs/x.svg";
import { JoinInButton } from "../common/JoinInButton";

export const TermsModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleClickAgree = () => {
        closeModal();
        if(!props.isChecked) {
            props.onClick();
        }
    }

    return (
        <>
            <button type='button' onClick={openModal} className="items-center justify-center cursor-pointer text-small">
                view
            </button>

            {isOpen && (
            <div className="absolute inset-0 z-10 w-full h-screen" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="absolute inset-0 h-screen transition-opacity bg-white" aria-hidden="true"></div>
                    <div className="relative flex items-center justify-center w-full h-screen px-4 pt-6 pb-5">
                        <div className="relative text-left px-[22px] py-[36px] rounded-[10px] bg-neutral-bg-10 justify-center flex flex-col max-h-full">
                            <img src={X} onClick={closeModal} className='absolute right-[14px] top-[14px] cursor-pointer' />
                            <span className="text-center text-subTitle text-neutral-title px-[17px]">
                                <span>{props.detailedTerm.required ? "[Required] " : "[Optional] "}</span>
                                <span>{props.detailedTerm.title}</span>
                            </span>
                            <div className="flex flex-col mb-5 overflow-y-auto scrollbar-hide mt-7">
                                <div className="flex w-full h-full text-base text-left whitespace-pre-line text-neutral-60">
                                    {props.detailedTerm.content}
                                </div>
                            </div>
                            <div className="flex">
                                <JoinInButton onClick={handleClickAgree} disabled={false}>I Agree</JoinInButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}