<script>
	export let segments;

	let name = segments.name;
	let images = [null, null];

	setTimeout(() => {
		 images = segments.images;
	}, 2000);

</script>

<style>
</style>

<div>

	<div>{name}</div>

	Name: <input bind:value={name} />

	{#each images as href, index}
  	<img alt="" src={href}/>
  {/each}

</div>
