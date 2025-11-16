import js from '@eslint/js'
import globals from 'globals'
import vitestPlugin from 'eslint-plugin-vitest'
import nodePlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import securityPlugin from 'eslint-plugin-security'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  // Base configuration - ignore patterns
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'build/**',
      '*.min.js',
    ],
  },

  // Base recommended rules
  js.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended,

  // Main configuration for all JS/TS files
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      n: nodePlugin,
      promise: promisePlugin,
      security: securityPlugin,
    },
    rules: {
      // Possible Errors & Best Practices
      'no-console': 'off', // Allow console for server logging
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-use-before-define': ['error', { functions: false, classes: true }],
      'no-shadow': 'error',
      'no-param-reassign': ['error', { props: false }],
      'prefer-const': 'error',
      'no-var': 'error',

      // Node.js specific rules
      'n/no-unsupported-features/es-syntax': [
        'error',
        { ignores: ['modules'] },
      ],
      'n/no-missing-import': 'error',
      'n/no-unpublished-import': 'off',
      'n/no-extraneous-import': 'error',
      'n/no-deprecated-api': 'error',
      'n/no-process-exit': 'error',
      'n/handle-callback-err': 'error',
      'n/no-callback-literal': 'error',

      // Promise rules
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'off',
      'promise/no-return-in-finally': 'error',

      // Security rules
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'warn',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-require': 'off', // Not applicable to ES modules
      'security/detect-object-injection': 'off', // Too many false positives
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-unsafe-regex': 'error',

      // Code Quality
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],
      // Formatting rules are handled by Prettier
      // Only non-conflicting style rules are enabled here

      // Express.js specific patterns
      'no-unused-expressions': 'error',
      'consistent-return': 'off', // Express middleware doesn't always return

      // Error handling
      'require-await': 'error',
      'no-async-promise-executor': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },

  // Vitest test files configuration
  {
    files: [
      '**/*.test.js',
      '**/*.spec.js',
      '**/__tests__/**/*.js',
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/__tests__/**/*.ts',
    ],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,

      // Relax some rules for tests
      'n/no-unpublished-import': 'off',
      'n/no-extraneous-import': 'off',
      'security/detect-non-literal-fs-filename': 'off',
      'no-console': 'off',
    },
  },

  // Mock files configuration
  {
    files: ['**/__mocks__/**/*.js', '**/__mocks__/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },

  // Prettier config must be last to override conflicting rules
  prettierConfig,
]
