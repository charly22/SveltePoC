<script>
	import Image from './Image.svelte'
	export let segments

	async function handleLoadmore() {
		if (segments.next) {

			const result = await fetch(segments.next)
				.then(res => res.json())

			result.data._embedded.media.forEach(
				m => segments.images.push({
					href: m.images.mobile,
					caption: m.caption,
				})
			)
			segments.images = segments.images;
			segments.next = 'https:' + result.data._links.next.href;
		}
	}
</script>

<style>
	.wrapper {
		flex: auto;
	}
</style>

<div>

	<div class="wrapper">
		<div>{segments.name}</div>
		Name: <input bind:value={segments.name} />
	</div>

	<div class="wrapper">
		{#each segments.images as {caption, href}}
	  	<Image alt={caption} src={href} />
	  {/each}
	</div>

	<div class="wrapper">
		<button on:click={handleLoadmore}> Load More </button>
	</div>

</div>
