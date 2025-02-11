export const Toggle = ({ id, checked, onChange }) => {
  return (
    <div className="relative inline-block h-[1.625rem] w-[3.375rem]">
      <input
        id={id}
        type="checkbox"
        className="peer h-[1.625rem] w-[3.375rem] cursor-pointer appearance-none rounded-full bg-neutral-icon transition-colors duration-300 checked:bg-primary-30"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute left-0.5 top-0.5 h-[1.375rem] w-[1.375rem] cursor-pointer rounded-full bg-neutral-bg-5 bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-[1.75rem]"
      ></label>
    </div>
  );
};
