import LoadMoreButton from './LoadMoreButton.svelte'

new LoadMoreButton({
	target: document.getElementById('loadmorewrapper'),
		hydrate: true,
		props: JSON.parse(atob(window.__OLAPIC_PRELOADED_STATE__))
});
