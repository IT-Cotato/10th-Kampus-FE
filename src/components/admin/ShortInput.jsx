export const ShortInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="px-2 py-1 border rounded-md border-neutral-border-40"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
