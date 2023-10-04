module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',

  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'linebreak-style': ['error', 'unix'],
    'max-classes-per-file': ['error', 6],
  },
};
