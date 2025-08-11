import { useEffect, useState } from 'react';
import BackButton from './BackButton';

export const TitleHeader = ({ text, onClick = null }) => {
  const [_isLong, setIsLong] = useState(false);
  useEffect(() => {
    if (text.length > 20) {
      setIsLong(true);
    }
  }, [text]);
  const longText = text.length > 20;

  return (
    <div className="flex h-16 flex-row items-center justify-between border-b-[.0313rem] border-neutral-border-30 p-4">
      <BackButton onClick={onClick} />
      <span
        className={`text-neutral-title ${longText ? 'text-base font-semibold' : 'text-pageTitle'}`}
      >
        {text}
      </span>
      <div className="h-[1.25rem] w-[1.25rem]" />
    </div>
  );
};
