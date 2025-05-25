import { InputWarningText } from '@/components/common/InputWarningText';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export const WriteContent = ({
  content,
  setContent,
  placeholder,
  maxLength = 0,
  contentRef,
  invalid = false,
  setInvalid = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setContent(e.target.value);
    setInvalid(false);
  };

  return (
    <div
      className={cn('flex flex-col gap-4', {
        'gap-2': invalid,
      })}
    >
      <label htmlFor="contentInput" className="text-title-bold-16 text-black">
        Content
      </label>
      {invalid && <InputWarningText />}
      <div
        className={cn(
          'box-border flex w-full cursor-text flex-col items-start rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem]',
          {
            'border-primary-red': invalid,
            'border-primary-base': !invalid && isFocused,
          },
        )}
        onClick={() => {
          contentRef.current?.focus();
        }}
      >
        <textarea
          id="contentInput"
          rows={16}
          placeholder={placeholder}
          value={content}
          onChange={handleOnChange}
          ref={contentRef}
          className="w-full resize-none leading-none placeholder-neutral-border-50 scrollbar-hide"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
        />
        {maxLength !== 0 && (
          <span className="text-sm flex w-full justify-end text-neutral-border-50">
            {content.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
