import { useState } from "react";
import X from "@/assets/imgs/x.svg";
import MainButton from "../common/MainButton";

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
                        <div className="relative text-left px-[1.375rem] py-[2.25rem] rounded-[.625rem] bg-neutral-bg-10 justify-center flex flex-col max-h-full">
                            <img src={X} alt="close" onClick={closeModal} className='absolute right-[.875rem] top-[.875rem] cursor-pointer w-[1.125rem] h-[1.125rem]' />
                            <span className="text-start text-subTitle text-neutral-title px-[1.0625rem]">
                                <span>{props.detailedTerm.required ? "[Required] " : "[Optional] "}</span>
                                <span>{props.detailedTerm.title}</span>
                            </span>
                            <div className="flex flex-col mb-8 overflow-y-auto scrollbar-hide mt-7">
                                <div className="flex w-full h-full text-base text-left whitespace-pre-line text-neutral-60">
                                    {props.detailedTerm.content}
                                </div>
                            </div>
                            <div className="flex">
                                <MainButton onClick={handleClickAgree} disabled={false}>I Agree</MainButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}