module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  plugins: ['jest', 'prettier', 'import'],
  env: {
    es6: true,
    'jest/globals': true,
    node: true,
  },
  globals: {
    fail: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    'import/order': ['error', {alphabetize: {order: 'asc'}}], // group and then alphabetize lines - https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'no-duplicate-imports': 'error',
    'prettier/prettier': 'error',
    'sort-imports': [
      'error',
      {ignoreDeclarationSort: true, ignoreMemberSort: false},
    ], // alphabetize named imports - https://eslint.org/docs/rules/sort-imports
  },
};
