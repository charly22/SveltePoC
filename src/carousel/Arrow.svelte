<script>

  export let direction
  export let images
  export let toggleAnimate

  function handleClick(e) {

    const c = e.target.parentElement.getElementsByClassName('viewport')[0]
    if (direction === 'R') {
      const child = c.children[0];
      c.append(child);
    } else {
      const child = c.children[c.children.length - 1];
      c.insertBefore(child, c.children[0]);
    }
  }

</script>

<style>
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

</style>

<div class="arrow" on:click={handleClick}>
  <slot></slot>
</div>
