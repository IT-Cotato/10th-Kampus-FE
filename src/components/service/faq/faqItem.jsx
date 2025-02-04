import { useState } from 'react';
import arrow from '@/assets/imgs/arrowLine.svg';
import { cn } from '@/utils/cn';

export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-[1.875rem] border-primary-base border-b">
      <div
        className="flex items-center justify-between w-full cursor-pointer "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="text-neutral-title ">{question}</h3>
        <img
          src={arrow}
          alt="arrow"
          className={cn('transition-transform', { 'rotate-180': isOpen })}
        />
      </div>
      {isOpen && (
        <p className="mt-5 text-neutral-base animate-bottomSheetDown">
          {answer}
        </p>
      )}
    </div>
  );
};
