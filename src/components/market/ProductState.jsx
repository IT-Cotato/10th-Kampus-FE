export const ProductState = ({ children }) => {
  // Active, Reserved, Sold Out,
  return (
    <div className="w-fit rounded-[.3125rem] bg-primary-10 px-2 py-1 text-small text-neutral-80">
      {children}
    </div>
  );
};
