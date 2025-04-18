// .eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'eslint:recommended'
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    }
  };
  