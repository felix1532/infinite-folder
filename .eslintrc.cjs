/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },


  rules: {
    'vue/attributes-order': ['error', {
      'order': [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT',
      ],
      'alphabetical': false,
    }],
    'vue/require-explicit-emits': ['error', {
      'allowProps': false,
    }],
    'vue/require-prop-types': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/no-ref-as-operand': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/v-on-event-hyphenation': ['error', 'never'],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/v-bind-style': 'error',
    'vue/v-slot-style': ['error', 'shorthand'],
    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
        ignorePublicMembers: true,
      },
    ],
    'vue/multi-word-component-names': 'off',


    // Typescript
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': true }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
};
