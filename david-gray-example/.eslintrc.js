//@ts-check
const isDev = process.env.IS_DEV === 'true';
console.log('isDev: ', isDev);

module.exports = {
  env: {
    node: true,
    es2020: true,
    browser: true
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },

  extends: ['react-app', 'plugin:@typescript-eslint/recommended'],

  plugins: ['@typescript-eslint'],

  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Best Practices
    eqeqeq: 'error',
    'no-invalid-this': 'error',
    'no-return-assign': 'error',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-useless-concat': 'error',
    'no-useless-return': 'error',

    // Variable
    // 'init-declarations': 'error',
    'no-use-before-define': 'error',
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }],

    // Stylistic Issues
    'array-bracket-newline': ['error', { multiline: true, minItems: null }],
    'array-bracket-spacing': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'block-spacing': 'error',
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'func-call-spacing': 'error',
    'implicit-arrow-linebreak': 'off', // Because of our Prettier config
    // indent: ['error', 4],
    'keyword-spacing': 'error',
    // 'multiline-ternary': ['error', 'never'],
    'multiline-ternary': 'off',
    // 'no-lonely-if': 'error',
    'no-mixed-operators': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-tabs': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'quote-props': ['error', 'as-needed'],
    // quotes: ['error', 'prefer-single'],
    semi: ['error', 'always'],
    'semi-spacing': 'error',
    'space-before-blocks': 'error',
    // 'space-before-function-paren': 'error',
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',

    // ES6
    'arrow-spacing': 'error',
    'no-confusing-arrow': 'off', // Because of our Prettier config
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',

    // TS Plugins
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': isDev ? 'off' : 'error',

    // React Plugins
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off'
  },

  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   semi: ['error', 'never'],
  //   'max-len': 'off',
  //   camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }]
  // }

  // ESLint treats (*.d.ts) file like normal files, so some overrides are required.
  overrides: [
    {
      files: ['*.ts'], // This should become ["*.d.ts"] if you are using Typescript to write something more than Types!
      rules: {
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-confusing-arrow': 'off'
      }
    }
  ]
};
