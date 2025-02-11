import { useRef } from 'react';

export const UserNameInput = ({ userName, onChange, invalid, duplicated }) => {
  const userNameRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor="username" className="text-base text-neutral-base">
        User Name<span className="text-primary-red">*</span>
      </label>
      <input
        id="username"
        type="text"
        className={`mb-1 mt-1 flex w-full border-b py-1 text-base ${userName ? (invalid || duplicated ? 'border-primary-red' : 'border-primary-base') : 'border-neutral-base'} placeholder-neutral-border-50`}
        placeholder="Enter your username"
        autoComplete="off"
        onChange={handleInputChange}
        value={userName}
        ref={userNameRef}
      />
      {userName && !invalid && duplicated && (
        <div className="text-small text-primary-red">
          The user name is already taken!
        </div>
      )}
      <div
        className={`text-small ${userName && invalid ? 'text-primary-red' : 'text-neutral-border-50'}`}
      >
        * User name: 5~20 characters consisting of lowercase letters(a-z) and
        numbers
      </div>
    </div>
  );
};
