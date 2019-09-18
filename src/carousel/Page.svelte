<script>
  import Asset from './Asset.svelte'
	export let images

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
