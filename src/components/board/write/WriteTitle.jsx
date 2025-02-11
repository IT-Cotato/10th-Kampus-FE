import { TranslateButton } from '@/components/common/TranslateButton';

export const WriteTitle = ({ title, setTitle, placeholder, ...props }) => {
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="writeTitle" className="text-subTitle">
        Title
      </label>
      <div className="box-border flex w-full flex-row gap-[.625rem] rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem]">
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
        {props.translate && (
          <TranslateButton
            translateType="text"
            value={title}
            setValue={setTitle}
          />
        )}
      </div>
    </div>
  );
};
