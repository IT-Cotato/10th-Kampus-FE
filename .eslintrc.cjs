module.exports = {
  root: true,
  ignorePatterns: ['dist/', 'node_modules/'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    'prettier',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    // react
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // react-refresh
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // prettier
    'prettier/prettier': 'warn',

    // unused imports
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
  },
};
