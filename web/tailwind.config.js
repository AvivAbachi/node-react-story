const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
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
			yellow: colors.yellow,
		},
	},
	variants: {
		extend: {
			margin: ['responsive', 'last'],
		},
	},
	plugins: [],
};
