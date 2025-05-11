export const WriteContent = ({
  content,
  setContent,
  placeholder,
  maxLength = 0,
}) => {
  const handleOnChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex flex-col gap-3">
        <label htmlFor="contentInput" className="text-title-bold-16">
          Content
        </label>
        <div className="box-border flex w-full flex-col items-start rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem]">
          <textarea
            id="contentInput"
            rows={16}
            placeholder={placeholder}
            value={content}
            onChange={handleOnChange}
            className="w-full resize-none leading-none placeholder-neutral-border-50"
            required
          />
          {maxLength !== 0 && (
            <span className="text-sm flex w-full justify-end text-neutral-border-50">
              {content.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
