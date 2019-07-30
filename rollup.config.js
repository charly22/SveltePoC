import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';

export default {
	input: 'src/main.js',
	output: {
		file: 'build/bundle.js',
		format: 'iife',
	},
	plugins: [
		resolve(),
		babel(),
		json(),
		svelte({ css: false }),
	]
};