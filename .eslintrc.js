module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [{
    files: ['*.ts', '*.tsx'],
    plugins: ['react'],
    extends: [
      'plugin:react/recommended',
      'standard-with-typescript',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
};
