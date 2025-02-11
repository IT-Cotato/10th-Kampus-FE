import { TranslateButton } from '@/components/common/TranslateButton';

export const WriteContent = ({
  content,
  setContent,
  placeholder,
  ...props
}) => {
  const handleOnChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex flex-col gap-3">
        <label htmlFor="contentInput" className="text-subTitle">
          Content
        </label>
        <div className="box-border flex w-full flex-row items-start gap-[.625rem] rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem]">
          <textarea
            id="contentInput"
            rows={16}
            placeholder={placeholder}
            value={content}
            onChange={handleOnChange}
            className="w-full resize-none leading-none placeholder-neutral-border-50 scrollbar-hide"
            required
          />
          {props.translate && (
            <TranslateButton
              translateType="content"
              value={content}
              setValue={props.setTranslatedContent}
            />
          )}
        </div>
      </div>
      {props.translatedContent && (
        <div className="flex flex-col gap-3">
          <label htmlFor="translatedContent" className="text-subTitle">
            Translation of Content
          </label>
          <div className="box-border flex w-full flex-row items-start gap-[.625rem] rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem]">
            <textarea
              id="translatedContent"
              rows={16}
              value={props.translatedContent}
              className="w-full resize-none bg-transparent leading-none placeholder-neutral-border-50 scrollbar-hide"
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
};
