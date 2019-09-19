<script>
  import Asset from './Asset.svelte'
	export let imagesStack

  const images = [];
  for (let i = Math.ceil(Math.random()*3); i > 0; i--) {
    if (imagesStack.length) {
      images.push(imagesStack.pop())
    }
  }

</script>

<style>
  .page {
    width: 160px;
    height: 320px;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="page">
  {#each images as image}
    <Asset {image} />
  {/each}
</div>
