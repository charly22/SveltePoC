<script>
  import Asset from './Asset.svelte'
  export let image

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
  {#if image}
    <Asset {image} />
  {/if}
</div>
