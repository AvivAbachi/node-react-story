const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			strokeWidth: { 3: '3' },
		},
		colors: {
			transparent: 'transparent',
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
