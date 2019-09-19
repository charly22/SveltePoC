<script>
  import Asset from './Asset.svelte'
	export let imagesStack

  const images = [];
  if (imagesStack.length) {
    images.push(imagesStack.pop())
  }
  if (imagesStack.length) {
    images.push(imagesStack.pop())
  }

</script>

<style>
  .page {
    width: 160px;
    height: 160px;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="page">
  {#each images as image}
    <Asset {image} />
  {/each}
</div>
