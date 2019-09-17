<script>
  export let direction;

  function handleClick(e) {
    console.log(direction, e);
  }

</script>

<styles>

	.arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		background-color: rgba(33, 33, 33, .3);
		align-items: center;
		width: 20px;
		cursor: pointer;
		user-select: none;
		flex-grow: 0;
		flex-shrink: 0;
	}

</styles>

<div class="arrow" on:click={handleClick}>
  <slot></slot>
</div>
