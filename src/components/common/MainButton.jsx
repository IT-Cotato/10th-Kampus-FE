export const MainButton = (props) => {
    return (
      <button onClick={props.onClick} disabled={props.disabled} className={`w-full h-[3.6875rem] ${props.disabled ? "bg-neutral-disabled cursor-default" : "bg-primary-base cursor-pointer"} text-white rounded-[.625rem]`}>
        {props.children}
      </button>
    );
}
