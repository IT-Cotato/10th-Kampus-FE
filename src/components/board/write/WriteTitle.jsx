import { TranslateButton } from '@/components/common/TranslateButton';

export const WriteTitle = ({ title, setTitle }) => {
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="writeTitle" className="text-subTitle">
        Title
      </label>
      <div className="box-border flex flex-row w-full px-[.875rem] py-[1.125rem] border border-neutral-border-30 rounded-lg gap-[.625rem]">
        <input
          id="writeTitle"
          type="text"
          placeholder="Please add a title."
          value={title}
          onChange={handleOnChange}
          autoComplete="off"
          className="w-full leading-none placeholder-neutral-border-50"
          required
        />
        <TranslateButton translateType="text" value={title} setValue={setTitle}/>
      </div>
    </div>
  );
};
