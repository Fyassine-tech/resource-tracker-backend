// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  // Base JS rules
  js.configs.recommended,

  // TS rules (non type-checked to keep setup simple)
  ...tseslint.configs.recommended,

  // Project rules
  {
    files: ['**/*.ts'],
    ignores: ['dist/**'],
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Test overrides (relax noisy rules in specs)
  {
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
