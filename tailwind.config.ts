import type {Config} from 'tailwindcss';
const {nextui} = require('@nextui-org/react');
const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
	},
	plugins: [nextui()],
};
export default config;
