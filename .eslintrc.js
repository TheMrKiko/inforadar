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
		semi: ['error', 'never'],
		'react/jsx-filename-extension': ['off'],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-props-no-spreading': ['off'],
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
	},
}
