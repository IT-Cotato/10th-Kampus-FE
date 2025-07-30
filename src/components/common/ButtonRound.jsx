import { cn } from '@/utils/cn';

export const BUTTON_THEMES = {
  PRIMARY: 'primary',
  BASE: 'base',
  DISABLED: 'disabled',
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  BORDER: 'border',
  SHADOW_BORDER: 'shadowBorder',
  SELECTED: 'selected',
};

export const BUTTON_SIZES = {
  LONG: 'long',
  MODAL: 'modal',
  BASE: 'base',
  SHORT: 'short',
};

export const ButtonRound = ({
  theme = BUTTON_THEMES.PRIMARY,
  text,
  size = BUTTON_SIZES.BASE,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center rounded-[1.25rem] text-base text-white',
        {
          'bg-primary-base': theme === BUTTON_THEMES.PRIMARY,
          'bg-neutral-base': theme === BUTTON_THEMES.BASE,
          'bg-neutral-disabled': theme === BUTTON_THEMES.DISABLED,
          'bg-[#D3F2D3] text-primary-green': theme === BUTTON_THEMES.APPROVED,
          'bg-[#D1E6FF] text-primary-blue': theme === BUTTON_THEMES.PENDING,
          'bg-primary-red text-white': theme === BUTTON_THEMES.REJECTED,
          'border border-neutral-border-40 bg-white text-neutral-title':
            theme === BUTTON_THEMES.BORDER,
          'bg-white text-neutral-border-50 shadow-navbar':
            theme === BUTTON_THEMES.SHADOW_BORDER,
          'border border-primary-20 bg-primary-5 text-black':
            theme === BUTTON_THEMES.SELECTED,
          'w-full py-1': size === BUTTON_SIZES.LONG,
          'w-fit min-w-[7.625rem] rounded-full px-5 py-3':
            size === BUTTON_SIZES.MODAL,
          'w-fit px-7 py-2': size === BUTTON_SIZES.BASE,
          'w-fit px-4 py-1': size === BUTTON_SIZES.SHORT,
        },
      )}
      {...props}
    >
      {text}
    </button>
  );
};
