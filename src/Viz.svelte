<script>
	import LoadMoreButton from './LoadMoreButton.svelte'
	import Slider from './Slider.svelte'
	export let segments
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

	<div id="sliderwrapper" class="wrapper">
		<Slider segments={segments}/>
		<span></span>
	</div>

	<div id="loadmorewrapper" class="wrapper">
		<LoadMoreButton segments={segments}/>
	</div>

</div>
