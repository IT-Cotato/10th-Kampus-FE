export const ProductState = ({ children }) => {
  // Active, Reserved, Sold Out
  if (children === 'ACTIVE') {
    return;
  }

  const formatProductState = (state) => {
    switch (state) {
      case 'RESERVED':
        return 'Reserved';
      case 'SOLD':
        return 'Sold Out';
      default:
        return state;
    }
  };

  return (
    <div className="w-fit rounded-[.3125rem] bg-primary-10 px-2 py-1 text-small text-neutral-80">
      {formatProductState(children)}
    </div>
  );
};
