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
    radix: 'off',
    'no-restricted-globals': 'off',
    'react/no-array-index-key': 'off',
    'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'react/prop-types': 0,
    'react/jsx-no-bind': [
      'error',
      {
        allowFunctions: true,
        allowBind: true,
        allowArrowFunctions: true,
      },
    ],
    'no-restricted-syntax': [
      'error',
      'FunctionExpression',
      'WithStatement',
      "BinaryExpression[operator='of']",
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'react/no-unstable-nested-components': [
      'off' | 'warn' | 'error',
      { allowAsProps: true },
    ],
    'react/jsx-no-useless-fragment': 'off',
    'default-param-last': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-param-reassign': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'react/destructuring-assignment': 0,
    'no-nested-ternary': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
