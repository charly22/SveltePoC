<script>
	import Page from './Page.svelte'
	export let images
	export let itemsPerPage
	
	itemsPerPage = itemsPerPage || 3
	const pagesCount = Math.ceil(images.length / itemsPerPage)
	
</script>

<style>
	.viewport {
		width: 560px;
		display: flex;
		flex-direction: row;
		overflow-x: scroll;
		overflow-y: hidden;
	}
</style>

<div class='viewport'>
	{#each Array(pagesCount) as _, i}
		<Page images={images.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)} />
	{/each}
</div>



