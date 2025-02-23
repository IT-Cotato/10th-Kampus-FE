export const WriteTitle = ({ title, setTitle, placeholder, maxLength = 0 }) => {

  const handleOnChange = (e) => {
    if(maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="writeTitle" className="text-subTitle">
        Title
      </label>
      <div className="box-border flex w-full flex-row rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem] gap-2">
        <input
          id="writeTitle"
          type="text"
          placeholder={placeholder}
          value={title}
          onChange={handleOnChange}
          autoComplete="off"
          className="w-full leading-none placeholder-neutral-border-50"
          required
        />
        {maxLength !== 0 && <span className="flex justify-end text-sm w-fit text-neutral-border-50">{title.length}/{maxLength}</span>}
      </div>
    </div>
  );
};
