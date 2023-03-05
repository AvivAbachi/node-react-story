const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			strokeWidth: { 3: '3' },
		},
		colors: {
			inherit: colors.inherit,
			current: colors.current,
			transparent: colors.transparent,
			black: colors.black,
			white: colors.white,
			gray: colors.slate,
			primary: {
				darkest: 'rgb(var(--primary-darkest) / <alpha-value>)',
				dark: 'rgb(var(--primary-dark) / <alpha-value>)',
				DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
				light: 'rgb(var(--primary-light) / <alpha-value>)',
				lightest: 'rgb(var(--primary-lightest) / <alpha-value>)',
			},
		},
	},
};
