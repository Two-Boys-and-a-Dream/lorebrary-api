# ESLint Configuration

This project uses **ESLint 9.x** with the modern flat config format (`eslint.config.js`) and a comprehensive ruleset designed for Node.js Express servers with Jest testing.

## Configuration Overview

### Installed Packages

- **`eslint@^9.15.0`** - Core ESLint package
- **`@eslint/js@^9.15.0`** - Official ESLint recommended rules
- **`eslint-plugin-n@^17.13.2`** - Node.js specific rules (successor to eslint-plugin-node)
- **`eslint-plugin-promise@^7.1.0`** - Best practices for promises
- **`eslint-plugin-security@^3.0.1`** - Security-focused rules
- **`eslint-plugin-jest@^28.9.0`** - Jest-specific rules and globals
- **`eslint-config-prettier@^9.1.0`** - Disables conflicting Prettier rules
- **`globals@^15.12.0`** - Global variable definitions

### Rule Categories

#### 1. **Code Quality & Best Practices**

- Enforces `const` over `let` when variables aren't reassigned
- Requires strict equality (`===`) over loose equality
- Prevents variable shadowing
- Disallows unused variables (with underscore prefix exception)

#### 2. **Node.js Specific**

- Detects usage of deprecated Node.js APIs
- Validates `require()` statements
- Prevents process.exit() usage
- Enforces proper callback error handling

#### 3. **Promise Best Practices**

- Ensures promises are properly returned
- Validates promise parameter names
- Encourages proper error handling with catch
- Warns against promise nesting

#### 4. **Security Rules**

- Detects unsafe buffer operations
- Warns about child process usage
- Identifies eval() and similar dangerous patterns
- Detects potential timing attacks
- Prevents unsafe regex patterns
- Flags pseudo-random number generation

#### 5. **Code Style** (Compatible with Prettier)

- Enforces semicolons
- Single quotes for strings
- 2-space indentation
- Consistent brace style
- Trailing commas in multiline structures

#### 6. **Jest Testing**

- Enforces `test()` naming convention
- Validates expect() assertions
- Prevents focused/disabled tests in production
- Ensures proper test structure

## Usage

### Lint the entire codebase:

```bash
npm run lint
```

### Auto-fix issues:

```bash
npx eslint . --fix
```

### Lint specific files:

```bash
npx eslint Routes/LoreRoute.js
```

### Check a file without fixing:

```bash
npx eslint Routes/LoreRoute.js
```

## Configuration Structure

The `eslint.config.js` file uses the flat config format with multiple configuration objects:

1. **Ignore patterns** - Excludes node_modules, coverage, build artifacts
2. **Base config** - Core rules for all JavaScript files
3. **Test files** - Special Jest configuration for `.test.js` and `.spec.js` files
4. **Mock files** - Relaxed rules for `__mocks__` directory

## Integration with Git Hooks

This project uses `simple-git-hooks` to automatically:

- Run Prettier on pre-commit
- Run ESLint on pre-push

This ensures all committed code meets quality standards.

## VS Code Integration

For the best development experience, install the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Add to your workspace settings (`.vscode/settings.json`):

```json
{
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Customization

To modify rules, edit `eslint.config.js` and adjust the `rules` object in the relevant configuration section.

### Disable a rule:

```javascript
rules: {
  'no-console': 'off',
}
```

### Change severity:

```javascript
rules: {
  'no-unused-vars': 'warn', // Change from 'error' to 'warn'
}
```

### Add exceptions:

```javascript
rules: {
  'no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }],
}
```

## Migration from Old Config

This project has been migrated from:

- ❌ `.eslintrc.json` (deprecated legacy format)
- ❌ `.eslintignore` (deprecated)

To:

- ✅ `eslint.config.js` (modern flat config)
- ✅ Ignore patterns defined in config file

## Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [ESLint Flat Config Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)
- [eslint-plugin-security](https://github.com/eslint-community/eslint-plugin-security)
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
