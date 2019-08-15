<script>
	import Image from './Image.svelte'
	export let segments

</script>

{#each segments.images as {caption, href}}
	<Image alt={caption} src={href} />
{/each}
