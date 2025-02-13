export const InputRadio = ({
  item,
  name,
  selected,
  setSelected,
  placeholder,
  setAdditionalText,
}) => {
  const handleOnchange = (e) => {
    setSelected(e.target.id);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-between border-b border-neutral-border-30 py-4">
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
      {item.text === 'Other' && selected === 'Other' && (
        <textarea
          className="mt-[1.875rem] resize-none rounded-[.625rem] border border-primary-20 p-4 text-base placeholder-neutral-border-50"
          placeholder={placeholder}
          rows={4}
          onChange={(e) => setAdditionalText(e.target.value)}
        />
      )}
    </div>
  );
};
