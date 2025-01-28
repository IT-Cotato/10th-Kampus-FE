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
          5: 'var(--purple-5)', // FAF9FF
          10: 'var(--purple-10)', // F2F0FF
          20: 'var(--purple-20)', // DFD6FD
          30: 'var(--purple-30)', // AA93EF
          40: 'var(--purple-40)', //7C63C8
          base: 'var(--purple-50)', // 5E44AC
          60: 'var(--purple-60)', // 543D98
          70: 'var(--purple-70)', // 4F3D87
          80: 'var(--purple-80)', //3C2E67
          90: 'var(--purple-90)', // 221A3B
          red: 'var(--primary-red)',  // EB003B
          yellow: 'var(--primary-yellow)',  // FFB724
          green: 'var(--primary-green)',  // 008A1E
          blue: 'var(--primary-blue)',  // 2768FF
        },
        neutral: {
          bg: {
            5: 'var(--neutral-5)',  // F8F8F8
            10: 'var(--neutral-10)',  //F0F0F0
          },
          disabled: 'var(--neutral-20)',  //E4E4E4
          border: {
            30: 'var(--neutral-30)',  // D8D8D8
            40: 'var(--neutral-40)',  // C6C6C6
            50: 'var(--neutral-50)',  // 8E8E8E
          },
          base: 'var(--neutral-60)',  // 727272
          70: 'var(--neutral-70)',  // 555555
          80: 'var(--neutral-80)',  // 353535
          title: 'var(--neutral-90)', // 0B0B0B
        },
      },
      boxShadow: {
        base: '1px 4px 10px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fadeInOutText': 'fadeInOutText 1.6s ease',
        'fadeInOutModal': 'fadeInOutModal 1.6s ease'
      },
      keyframes: {
        'bottom-sheet-up': {
          '0%': { transform: 'translateY(100dvh)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bottom-sheet-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100dvh)', opacity: '0' },
        },
        'fadeInOutText': {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'fadeInOutModal': {
          '0%': { opacity: 0 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0 },
        },
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
          '@apply max-w-lg mx-auto h-dvh overflow-x-hidden overflow-y-auto bg-neutral-50': '',
        },
        '.animate-bottom-sheet-up': {
          animation: 'bottom-sheet-up 0.2s ease-in-out',
        },
        '.animate-bottom-sheet-down': {
          animation: 'bottom-sheet-down 0.2s ease-in-out',
        }
      }),
    ),
    require("tailwind-scrollbar-hide"),
  ],
};
