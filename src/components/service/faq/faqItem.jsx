import { useState } from 'react';
import arrow from '@/assets/imgs/arrowLine.svg';
import { cn } from '@/utils/cn';

export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col border-b border-primary-base pb-[1.875rem]">
      <div
        className="flex w-full cursor-pointer items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="text-neutral-title">{question}</h3>
        <img
          src={arrow}
          alt="arrow"
          className={cn('transition-transform', { 'rotate-180': isOpen })}
        />
      </div>
      {isOpen && (
        <p className="mt-5 animate-bottomSheetDown text-neutral-base">
          {answer}
        </p>
      )}
    </div>
  );
};
