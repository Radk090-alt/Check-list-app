module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  rules: {
    'react-hooks/exhaustive-deps': 0,
    // 'max-len': ["error", { "ignoreUrls": true }]
  },
};
