module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  plugins: ['vue', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'vue/multi-word-component-names': 'off',
  },
}
