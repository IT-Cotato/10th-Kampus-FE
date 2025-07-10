import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.dist/**',
      'build/**',
      'public/**',
      'src/assets/**',
      'ios/**',
      'android/**',
      '.husky/**',
      '.github/**',
    ],
    files: ['**/*.{js,mjs,cjs,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      js,
      'unused-imports': unusedImports,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      prettier: pluginPrettier,
    },
    extends: [js.configs.recommended, pluginReact.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',

      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': 'warn',
    },
  },
]);
