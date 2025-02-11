export const MainButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`h-[3.6875rem] w-full ${props.disabled ? 'cursor-default bg-neutral-disabled' : 'cursor-pointer bg-primary-base'} rounded-[.625rem] text-white`}
    >
      {props.children}
    </button>
  );
};
