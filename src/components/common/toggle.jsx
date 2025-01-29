const Toggle = ({ id, checked, onChange }) => {
  return (
    <div className="relative inline-block w-[3.375rem] h-[1.625rem]">
      <input
        id={id}
        type="checkbox"
        className="h-[1.625rem] transition-colors duration-300 rounded-full appearance-none cursor-pointer peer w-[3.375rem] bg-neutral-icon checked:bg-primary-30"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute top-0.5 left-0.5 w-[1.375rem] h-[1.375rem] transition-transform duration-300 bg-white rounded-full shadow-sm cursor-pointer bg-neutral-bg-5 peer-checked:translate-x-[1.75rem]"
      ></label>
    </div>
  );
};

export default Toggle;
