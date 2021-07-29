module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    camelcase: 'off',
    'no-restricted-globals': 'off',
    'react/no-array-index-key': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true  }],
  }
}
