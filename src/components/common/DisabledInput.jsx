export const DisabledInput = ({ name, defaultValue }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-neutral-base">
        {name}
      </label>
      <div className="relative flex flex-col mt-1">
        <input
          id={name}
          type="text"
          className="flex w-full py-1 align-middle bg-transparent border-b border-neutral-base text-neutral-base"
          defaultValue={defaultValue}
          disabled
        />
      </div>
    </div>
  );
};
