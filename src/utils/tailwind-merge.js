import { extendTailwindMerge } from 'tailwind-merge';

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      animate: [
        {
          animate: ['bottom-sheet-up', 'bottom-sheet-down'],
        },
      ],
    },
  },
});
