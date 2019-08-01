<script>
	export let segments;

	let name = segments.name;
	let images = [];
	
	if (segments.delayed) {
		setTimeout(() => {
			 images = segments.images;
		}, 2000);
	} else {
		images = segments.images;
	}

</script>

<style>
	img {
		height: 50px;
	  width: 50px;
	}
</style>

<div>

	<div>{name}</div>

	Name: <input bind:value={name} />

	{#each images as href, index}
  	<img alt="" src={href} />
  {/each}

</div>
