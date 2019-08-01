import Viz from './Viz.svelte';
import data from './data.json';

new Viz({
	target: document.body,
	hydrate: true,
	props: data,
});
