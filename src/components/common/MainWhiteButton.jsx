export const MainWhiteButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className='w-full h-[3.6875rem] bg-white cursor-pointer text-primary-base rounded-[.625rem] border border-primary-base'
    >
      {props.children}
    </button>
  );
};
