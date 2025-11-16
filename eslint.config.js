const js = require('@eslint/js')
const globals = require('globals')
const jestPlugin = require('eslint-plugin-jest')
const nodePlugin = require('eslint-plugin-n')
const promisePlugin = require('eslint-plugin-promise')
const securityPlugin = require('eslint-plugin-security')
const prettierConfig = require('eslint-config-prettier')

module.exports = [
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

  // Main configuration for all JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
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
      'n/no-missing-require': 'error',
      'n/no-unpublished-require': 'off',
      'n/no-extraneous-require': 'error',
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
      'security/detect-non-literal-require': 'off', // Too strict for dynamic requires
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

  // Jest test files configuration
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...jestPlugin.configs.style.rules,

      // Jest specific rules
      'jest/expect-expect': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'jest/consistent-test-it': ['error', { fn: 'test' }],
      'jest/prefer-expect-assertions': 'off',
      'jest/no-standalone-expect': 'error',
      'jest/no-test-return-statement': 'error',

      // Relax some rules for tests
      'n/no-unpublished-require': 'off',
      'security/detect-non-literal-fs-filename': 'off',
      'no-console': 'off',
    },
  },

  // Mock files configuration
  {
    files: ['**/__mocks__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'n/no-unpublished-require': 'off',
    },
  },

  // Prettier config must be last to override conflicting rules
  prettierConfig,
]
