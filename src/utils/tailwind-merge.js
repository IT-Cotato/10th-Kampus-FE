import { extendTailwindMerge } from 'tailwind-merge';

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['title', 'pageTitle', 'subtitle', 'base', 'small'],
        },
      ],
      'bg-color': [
        {
          background: ['primary', 'neutral'],
        },
      ],
      'text-color': [
        {
          text: ['primary', 'neutral'],
        },
      ],
      'border-color': [
        {
          border: ['primary', 'neutral'],
        },
      ],
      fill: [
        {
          fill: ['primary', 'neutral'],
        },
      ],
      shadow: [
        {
          shadow: ['base'],
        },
      ],
      animate: [
        {
          animate: ['bottom-sheet-up', 'bottom-sheet-down'],
        },
      ],
    },
  },
});
