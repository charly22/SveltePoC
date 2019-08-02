import Viz from './Viz.svelte';

new Viz({
	target: document.body,
	hydrate: true,
	props: JSON.parse(atob(window.__OLAPIC_PRELOADED_STATE__))
});
