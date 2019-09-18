<script>
	export let image;
	const alt = image.caption
	const src = image.href
</script>

<style>
	img {
	  width: 160px;
	  height: 160px;
	  margin: 0;
	  display: inline-block;
		flex-shrink: 0;
	}
</style>

<img {alt} {src} />
