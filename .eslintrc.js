module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['airbnb', 'prettier', 'prettier/react'],
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
			legacyDecorators: true
		}
	},
	plugins: ['react', 'react-hooks'],
	rules: {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'func-names': 'off',
		'react/jsx-filename-extension': [1, {extensions: ['.js']}],
		'react/require-default-props': 'off',
		'consistent-return': 'off',
		'no-restricted-syntax': 'off',
		'react/no-children-prop': 'off'
	}
};
