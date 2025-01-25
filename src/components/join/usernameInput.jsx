import { useRef } from 'react';

export const UserNameInput = ({ userName, onChange, invalid, duplicated }) => {
    const userNameRef = useRef(null);
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        onChange(value);
    }

    return (
        <div className='flex flex-col w-full'>
            <label htmlFor="username" className='text-base text-neutral-base'>User Name<span className='text-primary-red'>*</span></label>
            <input
                id="username"
                type='text'
                className={`flex w-full py-1 mt-1 mb-1 text-base border-b ${userName ? (invalid || duplicated) ? 'border-primary-red' : 'border-primary-blue' : 'border-neutral-base'} placeholder-neutral-border-50`}
                placeholder='Enter your username'
                autoComplete='off'
                onChange={handleInputChange}
                value={userName}
                ref={userNameRef}
            />
            { userName && invalid && <div className='text-small text-primary-red'>This user name is not available!</div> }
            { userName && !invalid && (
                    duplicated ?
                    <div className='text-small text-primary-red'>This user name is already taken!</div> :
                    <div className='text-small text-primary-blue'>This user name is available!</div>
            )}
            <div className='text-neutral-border-50 text-small'>User name: 5~20 characters consisting of lowercase letters(a-z), numbers, or special characters(%, ^,&,*,_)</div>
        </div>
    );
};