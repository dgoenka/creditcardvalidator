module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: 'airbnb',
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'brace-style': [2, 'stroustrup'],
    'function-paren-newline': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'no-cond-assign': [2, 'except-parens'],
    'no-console': 0,
    'no-multi-assign': 0,
    'no-multiple-empty-lines': [2, { max: 2, maxBOF: 0, maxEOF: 0 }],
    'no-nested-ternary': 0,
    'object-curly-newline': [2, { multiline: true, consistent: true }],
    radix: [2, 'as-needed'],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    strict: [2, 'global'],
  },
};
