<script>
	import Arrow from './Arrow.svelte'
	import Viewport from './Viewport.svelte'

	export let images;

</script>

<style>
	.carousel {
		display: flex;
	}
</style>

<div class='carousel'>
	<Arrow direction='L'> L </Arrow>
	<Viewport {images} />
	<Arrow direction='R'> R </Arrow>
</div>

