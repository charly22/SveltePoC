<script>
	export let segments = { 
		name: '',
		images: [],
	};

	let name = segments.name;
	let images = segments.images;
</script>

<style>
</style>

<div>

	<div>{name}</div>

	Name: <input bind:value={name} />
	
	{{#each images as href}}
  	<img bind:href={href}/>
  {{/each}}

	
</div>