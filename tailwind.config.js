/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			backgroundImage: {
				"grad-1":
					"linear-gradient(135deg, rgba(153, 102, 255, 1) 0%,  rgba(255, 255, 255, 1) 100%)",
			},
		},
	},
	plugins: [],
};
