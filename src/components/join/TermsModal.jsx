import { useState } from 'react';
import X from '@/assets/imgs/icon/x.svg';
import { MainButton } from '../common/MainButton';

export const TermsModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickAgree = () => {
    closeModal();
    if (!props.isChecked) {
      props.onClick();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="cursor-pointer items-center justify-center text-small"
      >
        view
      </button>

      {isOpen && (
        <div
          className="absolute inset-0 z-10 h-screen w-full"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 h-screen bg-white transition-opacity"
            aria-hidden="true"
          ></div>
          <div className="relative flex h-screen w-full items-center justify-center px-4 pb-5 pt-6">
            <div className="relative flex max-h-full flex-col justify-center rounded-[.625rem] bg-neutral-bg-10 px-5 py-5 text-left">
              <img
                src={X}
                alt="close"
                onClick={closeModal}
                className="absolute right-5 top-5 h-[1.125rem] w-[1.125rem] cursor-pointer text-neutral-title"
              />
              <span className="px-[1.0625rem] pt-[2.125rem] text-start text-subTitle text-neutral-title">
                <span>
                  {props.detailedTerm.required ? '[Required] ' : '[Optional] '}
                </span>
                <span>{props.detailedTerm.title}</span>
              </span>
              <div className="my-6 flex flex-col overflow-y-auto scrollbar-hide">
                <div className="text-neutral-60 flex h-full w-full whitespace-pre-line text-left text-base">
                  {props.detailedTerm.content}
                </div>
              </div>
              <div className="flex">
                <MainButton onClick={handleClickAgree} disabled={false}>
                  I Agree
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
