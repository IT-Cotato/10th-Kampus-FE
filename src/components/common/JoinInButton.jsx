export const JoinInButton = (props) => {
    return (
      <button onClick={props.onClick} className={`w-[100%] h-[59px] ${props.disabled ? "bg-neutral-disabled cursor-default" : "bg-primary-base cursor-pointer"} text-white rounded-[10px]`}>
        {props.children}
      </button>
    );
}