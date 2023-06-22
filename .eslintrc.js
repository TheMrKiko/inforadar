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
			'plugin:@typescript-eslint/recommended',
			'plugin:react/recommended',
			'airbnb-typescript',
			'airbnb',
		],
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			project: './tsconfig.json',
		},
		rules: {
			'@typescript-eslint/indent': ['error', 'tab'],
			'no-tabs': ['off'],
		},
	}],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'no-tabs': ['off'],
		indent: ['error', 'tab'],
	},
};
