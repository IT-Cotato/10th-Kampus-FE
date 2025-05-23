import { useEffect, useRef } from 'react';

export const MenuBar = ({ menuOptions, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="y-2 absolute right-1 top-6 z-10 flex w-fit min-w-24 flex-col justify-center divide-y divide-neutral-disabled border border-neutral-disabled bg-white text-base text-neutral-title shadow-md"
    >
      {menuOptions.map((menu, index) => (
        <button
          key={index}
          className="flex w-full items-center justify-center px-6 py-[.375rem] hover:bg-neutral-bg-10"
          onClick={menu.onClick}
        >
          <p>{menu.menu}</p>
        </button>
      ))}
    </div>
  );
};
