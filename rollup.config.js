import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import svelte from 'rollup-plugin-svelte';

export default {
	input: 'src/main.js',
	output: {
		file: 'build/bundle.js',
		format: 'iife',
	},
	plugins: [
		resolve(),
		json(),
		svelte({
			css: false,
			hydratable: true,
			immutable: true,
		}),
	]
};
