<script>
	import Slider from './Slider.svelte'
	export let segments

	async function handleLoadmore() {
		if (segments.next) {
			const result = await fetch(segments.next)
				.then(res => res.json())

			const newSegments = {
				images: [],
				next: null
			}
			result.data._embedded.media.forEach(
				m => newSegments.images.push({
					href: m.images.mobile,
					caption: m.caption,
				})
			)
			segments.next = 'https:' + result.data._links.next.href;

			const sliderwrapper = document.getElementById('sliderwrapper')

			new Slider({
				target: sliderwrapper,
				anchor: sliderwrapper.querySelector('span:last-of-type'),
				props: {
					segments: newSegments
				}
			});
		}
	}

</script>

<button on:click={handleLoadmore}> Load More </button>
