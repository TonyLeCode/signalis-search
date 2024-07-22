/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'primary-orange': '#ff3e03',
				'primary-red': '#ff0b03',
				'off-white': '#d6d6d6',
				'primary-blue': '#00a2e8',
				'primary-blue-hover': '#15b9ff',
			},
			fontWeight: {
				extralight: '200',
			},
			fontSize: {
				norm: '1.2rem'
			}
		},
	},
	plugins: [],
};
