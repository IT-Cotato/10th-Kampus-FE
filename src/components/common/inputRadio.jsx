import { useEffect, useRef } from 'react';

export const InputRadio = ({
  item,
  name,
  selected,
  setSelected,
  placeholder,
  setAdditionalText,
}) => {
  const textareaRef = useRef(null);

  const handleOnchange = (e) => {
    setSelected(e.target.id);
  };

  useEffect(() => {
    // textarea 스크롤
    if (
      selected === item.text &&
      item.text === 'Other' &&
      textareaRef.current
    ) {
      textareaRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selected, item.text]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between w-full py-4 border-b border-neutral-border-30">
        <label htmlFor={item.text}>{item.text}</label>
        <input
          type="radio"
          name={name}
          id={item.text}
          onChange={handleOnchange}
          checked={selected === item.text}
          className="border-box h-7 w-7 cursor-pointer appearance-none rounded-full border border-neutral-border-30 checked:border checked:border-neutral-border-30 checked:bg-primary-30 checked:shadow-[inset_0rem_0rem_0rem_.25rem_#FFFFFF]"
        />
      </div>
      {((item.text === 'Other' && selected === 'Other') || (item.text === 'Others' && selected === 'Others')) && (
        <textarea
          ref={textareaRef}
          className="mt-[1.875rem] resize-none rounded-[.625rem] border border-primary-20 p-4 text-base placeholder-neutral-border-50"
          placeholder={placeholder}
          rows={4}
          onChange={(e) => setAdditionalText(e.target.value)}
          autoFocus
        />
      )}
    </div>
  );
};
