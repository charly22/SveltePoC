<script>
	import Page from './Page.svelte'
	export let images

</script>

<style>
	.viewport {
		width: 400px;
		height: 200px;
		display: flex;
		flex-direction: row;
	}
</style>

<div class='viewport'>
	{#while images.has()}
		<Page {images} />
	{/while}
</div>
