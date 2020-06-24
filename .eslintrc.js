module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*'],
      },
    ],
  },
}
