// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//     'prettier'
//   ],
//   root: true,
//   env: {
//     node: true,
//     jest: true,
//   },
//   ignorePatterns: ['.eslintrc.js'],
//   rules: {
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//     'prettier/prettier': ['error', {endOfLine: 'auto'}],
//   },
// };

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Use recommended eslint-config-prettier configuration
    'prettier/@typescript-eslint', // Use Prettier-specific rules for TypeScript
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error', // Set Prettier rule to error
  },
};
