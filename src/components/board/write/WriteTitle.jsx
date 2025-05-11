export const WriteTitle = ({ title, setTitle, placeholder, maxLength = 0 }) => {
  const handleOnChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="writeTitle" className="text-title-bold-16">
        Title
      </label>
      <div className="relative h-fit w-full text-neutral-title">
        <input
          className="box-border flex w-full flex-row gap-2 rounded-lg border border-neutral-border-30 py-[1.125rem] pl-[.875rem] pr-16 leading-none placeholder-neutral-border-50"
          id="writeTitle"
          type="text"
          placeholder={placeholder}
          value={title}
          onChange={handleOnChange}
          autoComplete="off"
          required
        />
        {maxLength !== 0 && (
          <span className="text-sm pointer-events-none absolute right-[.875rem] top-[1.125rem] flex w-fit text-neutral-border-50">
            {title.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
