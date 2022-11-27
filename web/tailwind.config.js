const colors = require('tailwindcss/colors');

function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`;
		}
		return `rgb(var(${variable}) / ${opacityValue})`;
	};
}

module.exports = {
	// content: ['./index.html', './src/**/*.{scss,js,jsx}'],
	content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			strokeWidth: { 3: '3' },
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.slate,
			primary: {
				darkest: withOpacityValue('--primary-darkest'),
				dark: withOpacityValue('--primary-dark'),
				DEFAULT: withOpacityValue('--primary'),
				light: withOpacityValue('--primary-light'),
				lightest: withOpacityValue('--primary-lightest'),
			},
		},
	},
};
