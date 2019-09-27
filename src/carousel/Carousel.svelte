<style>
  :global(html) {
    margin: 0;
  }

  :global(body) {
    margin: 0;
  }

  .carousel {
    display: flex;
    flex-direction: row;
    display: flex;
    width: 540px;
  }

  .viewport {
    width: 480px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none;
    -webkit-overflow-scrolling: auto;
		user-select: none;
  }
  .viewport::-webkit-scrollbar {
    display: none;
  }

  .page {
    width: 160px;
    height: 160px;
    display: flex;
    flex-direction: column;
		user-select: none;
  }

  img {
    width: 160px;
    height: 160px;
    margin: 0;
    display: inline-block;
    flex-shrink: 0;
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background-color: #333;
    align-items: center;
    width: 30px;
    cursor: pointer;
    user-select: none;
    flex-grow: 0;
    flex-shrink: 0;
		user-select: none;
  }

  .arrow > * {
    fill: #FFF;
  }

</style>

<script>
  // import Asset from './Asset.svelte'
  import { onMount } from 'svelte'
  export let images

  let firstImage = 1
  let visibleImages = getVisibleImages(firstImage, images)

  let prevScrollLeft = 0
  let programaticScrollInfinite = false
  let programaticScrollStopped = false
  let isRunning
  let thumbSize = 160
  let req = null
  let _animating = false;
  let _updating = false;

  function handleClickL(e) {
    return handleClick(e, -1)
  }

  function handleClickR(e) {
    return handleClick(e, 1)
  }

  function handleClick(e, direction = 1) {
    const v = document.getElementsByClassName('viewport')[0]
    move(direction)
    v.scrollLeft += thumbSize * direction * -1
    let inc = 0
    const delta = thumbSize / 5
    function anim() {
      inc += delta
      v.scrollLeft += delta * direction
      if (inc < thumbSize) {
        requestAnimationFrame(anim)
      } else {
        const extras = 1
        v.scrollLeft = thumbSize * extras
      }
    }
    requestAnimationFrame(anim)
  }

  function getVisibleImages(ix, images) {
    const visiblePagesCount = 3 // images.length
    const extras = 1;
    const vv = []
    for (let k = extras * -1; k < 0 ; k++) {
      ix = getPrevIndex(images, ix)
    }
    for (let i = 0; i < visiblePagesCount + extras * 2; i++) {
      vv.push(images[ix])
      ix = getNextIndex(images, ix)
    }
    // console.log('Visible', vv)
    return vv;
  }

  function getPrevIndex(array, ix) {
    return (ix === 0 ? array.length : ix) - 1
  }

  function getNextIndex(array, ix) {
    return ix === array.length - 1 ? 0 : ix + 1
  }

  function move(direction) {

    const newFirstImage = (direction === 1) ?
    getNextIndex(images, firstImage) :
    getPrevIndex(images, firstImage)

    firstImage = newFirstImage,
    console.log(firstImage)
    visibleImages = getVisibleImages(newFirstImage, images)
  }

  function handleScroll(e) {
    const _this = this
    const v = e.target;

    // console.log('s', v.scrollLeft)

    cancelAnimationFrame(req);

    req = requestAnimationFrame(() => {

      if (_animating) {
        return
      }

      if (_updating) {
        return
      }

      // console.log('ra', v.scrollLeft)

      const thres = 0;
      const viewportWidth = v.scrollWidth - v.offsetWidth;
      const closeToLeftSide = v.scrollLeft <= thres;
      const closeToRightSide = v.scrollLeft >= viewportWidth - thres

      if (closeToLeftSide || closeToRightSide) {

        _updating = true
        console.log('Close to the edge', {
          closeToLeftSide: closeToLeftSide,
          closeToRightSide: closeToRightSide,
          scrollLeft: v.scrollLeft,
        })

        const direction = closeToRightSide ? 1 : -1
        move(direction)
        v.scrollLeft += thumbSize * direction * -1
        _updating = false
        console.log('Updated', v.scrollLeft)

      }
    })

    debounce(() => {

      const discrete = Math.round(v.scrollLeft / thumbSize) * thumbSize;
      if (v.scrollLeft != discrete) {
        _animating = true;
        const diff = v.scrollLeft - discrete
        // console.log('Discrete scroll', {current: v.scrollLeft, delta: diff});

        let progress = 0;
        const delta = 16 * (diff > 0 ? 1 : -1);
        function anim() {
          progress += delta
          v.scrollLeft -= delta
          if (Math.abs(progress + delta) < Math.abs(diff)) {
            requestAnimationFrame(anim)
          } else {
            _animating = false;
            v.scrollLeft = discrete
          }
        }
        requestAnimationFrame(anim)
      }
    }, 60)

  }

  function debounce(callback, limit) {
    window.clearTimeout(isRunning);
    isRunning = setTimeout(callback, limit);
  }

  onMount(() => {
    const v = document.getElementsByClassName('viewport')[0]
    v.scrollLeft = thumbSize
  })

</script>

<div class="carousel" tabindex="0">

  <div class="arrow" on:click={handleClickL}>
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg>
  </div>

  <div class="viewport" on:scroll={handleScroll} >
    {#each visibleImages as {caption, href}}
      <div class="page">
        <img key={href} src={href.replace('mobile', 'mobile')} alt={caption}/>
      </div>
    {/each}
  </div>

  <div class="arrow" on:click={handleClickR}>
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
  </div>

</div>
