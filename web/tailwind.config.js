const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{scss,js,jsx}'],
	theme: {
		extend: {
			strokeWidth: { 3: '3' },
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			gray: colors.slate,
			rose: colors.rose,
		},
	},
	variants: {
		extend: {
			margin: ['responsive', 'last'],
		},
	},
};
