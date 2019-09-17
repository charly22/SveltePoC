<script>
  import Asset from './Asset.svelte'
	export let images

  const img = images.pop()
</script>

<styles>
  .page {
    width: 200px;
    height: 200px;
    display: flex;
  }
</styles>

<div class="page">
  <Asset {img}>
</div>
