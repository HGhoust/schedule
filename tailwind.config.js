/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		borderWidth: {
			DEFAULT: '1px',
			0: '0px',
			2: '2px',
			3: '3px',
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '15px',
				sm: '20px',
				md: '20px',
				lg: '20px',
				xl: '20px',
			},
		},
		extend: {
			colors: {},
			fontFamily: {
				sans: ['Noto Sans', 'sans-serif'],
			},
			minWidth: {
				'fit-content': '-webkit-fit-content',
			},
			minHeight: {
				'fit-content': '-webkit-fit-content',
			},
		},
	},
}
