const colors = require('tailwindcss/colors');

module.exports = {
	theme: {
		content: ['./public/**/*.html', './src/**/*.{js,jsx}'],
		extend: {
			strokeWidth: { 3: '3' },
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			gray: colors.blueGray,
			rose: colors.rose,
		},
	},
	variants: {
		extend: {
			margin: ['responsive', 'last'],
		},
	},
};
