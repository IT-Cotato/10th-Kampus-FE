import { useEffect, useRef } from "react";

export const MenuBar = ({ menuOptions, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [onClose]);


  return (
    <div ref={menuRef} className="absolute z-10 flex flex-col justify-center text-base bg-white border shadow-md top-6 right-1 w-fit min-w-24 border-neutral-disabled y-2 text-neutral-title">
      {menuOptions.map((menu, index) => (
        <button
          key={index}
          className="flex items-center justify-center w-full px-8 py-[.375rem] hover:bg-neutral-bg-10"
          onClick={menu.onClick}
        >
          <p>{menu.menu}</p>
        </button>
      ))}
    </div>
  );
};
