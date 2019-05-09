module.exports = {
  env: {
    'cypress/globals': true,
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:cypress/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
  plugins: ['cypress'],
};
