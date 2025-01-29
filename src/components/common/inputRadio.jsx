const InputRadio = ({
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
    <div className="flex flex-col w-full">
      <div className="flex justify-between w-full py-4 border-b border-neutral-border-30">
        <label htmlFor={item.text}>{item.text}</label>
        <input
          type="radio"
          name={name}
          id={item.text}
          onChange={handleOnchange}
          checked={selected === item.text}
          className="border rounded-full appearance-none cursor-pointer w-7 h-7 border-neutral-border-30 border-box checked:bg-primary-30 checked:border checked:border-neutral-border-30 checked:shadow-[inset_0rem_0rem_0rem_.25rem_#FFFFFF]"
        />
      </div>
      {item.text === 'Other' && selected === 'Other' && (
        <textarea
          className="border border-primary-20 rounded-[.625rem] mt-[1.875rem] text-base placeholder-neutral-border-50 p-4 resize-none"
          placeholder={placeholder}
          rows={4}
          onChange={(e) => setAdditionalText(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputRadio;
