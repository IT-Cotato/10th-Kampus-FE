import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['var(--font-pretendard)', 'sans-serif'],
    },
    fontSize: {
      title: [
        '2.25rem', // 36px
        {
          letterSpacing: '2.5%',
          fontWeight: '600',
        },
      ],
      pageTitle: [
        '1.5rem', // 24px
        {
          letterSpacing: '2.5%',
          fontWeight: '600',
        },
      ],
      subTitle: [
        '1.25rem', // 20px
        {
          letterSpacing: '2.5%',
          fontWeight: '500',
        },
      ],
      base: [
        '1rem', // 16px
        {
          letterSpacing: '2.5%',
          fontWeight: '400',
        },
      ],
      small: [
        '0.875rem', // 14px
        {
          letterSpacing: '2.5%',
          fontWeight: '400',
        },
      ],
    },
    extend: {
      colors: {
        primary: {
          5: 'var(--purple-5)',
          10: 'var(--purple-10)',
          20: 'var(--purple-20)',
          30: 'var(--purple-30)',
          40: 'var(--purple-40)',
          base: 'var(--purple-50)',
          60: 'var(--purple-60)',
          70: 'var(--purple-70)',
          80: 'var(--purple-80)',
          90: 'var(--purple-90)',
          red: 'var(--primary-red)',
          yellow: 'var(--primary-yellow)',
          green: 'var(--primary-green)',
          blue: 'var(--primary-blue)',
        },
        neutral: {
          bg: {
            5: 'var(--neutral-5)',
            10: 'var(--neutral-10)',
          },
          disabled: 'var(--neutral-20)',
          icon: 'var(--neutral-25)',
          border: {
            30: 'var(--neutral-30)',
            40: 'var(--neutral-40)',
            50: 'var(--neutral-50)',
          },
          base: 'var(--neutral-60)',
          70: 'var(--neutral-70)',
          80: 'var(--neutral-80)',
          title: 'var(--neutral-90)',
        },
      },
      boxShadow: {
        base: '1px 4px 10px rgba(0, 0, 0, 0.2)',
        navbar: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        bottomSheetUp: {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        bottomSheetDown: {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        bottomSheetUp: 'bottomSheetUp 0.5s ease-in-out',
        bottomSheetDown: 'bottomSheetDown 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) =>
      addUtilities({
        '.layout': {
          '@apply mx-auto max-w-lg lg:max-w-5xl lg:flex lg:gap-x-10': '',
        },
        '.container': {
          '@apply max-w-lg mx-auto h-dvh overflow-hidden bg-neutral-50': '',
        },
      }),
    ),
  ],
};
