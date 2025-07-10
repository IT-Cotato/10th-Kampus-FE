export const ShortInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="rounded-md border border-neutral-border-40 px-2 py-1"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
