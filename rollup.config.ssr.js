import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import svelte from 'rollup-plugin-svelte';

export default {
	input: 'src/carousel/Carousel.svelte',
	output: {
		file: 'build/Carousel-ssr.js',
		format: 'cjs'
	},
	plugins: [
		resolve(),
		json(),
		svelte({
			generate: 'ssr',
		})
	]
};
