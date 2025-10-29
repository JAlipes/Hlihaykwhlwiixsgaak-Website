/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}", // good coverage
	],
	safelist: [
    	'specialFont',
  	],
	theme: {
		extend: {
			colors: {
				brandRed: "#E63551",
			},
			fontFamily: {
				specialFont: ['"Miama"', 'cursive'], // fallback cursive
				titleFont: ['"Overlock SC"', 'sans-serif'],
				subHeadingFont: ['Montserrat', 'sans-serif'],
				bodyFont: ['Quicksand', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
