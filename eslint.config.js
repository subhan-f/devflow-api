'use strict';

const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettierRecommended,
];
