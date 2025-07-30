export const DisabledInput = ({ name, defaultValue }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-neutral-base">
        {name}
      </label>
      <div className="relative mt-1 flex flex-col">
        <input
          id={name}
          type="text"
          className="flex w-full border-b border-neutral-base bg-transparent py-1 align-middle text-neutral-base"
          defaultValue={defaultValue}
          disabled
        />
      </div>
    </div>
  );
};
