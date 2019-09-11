
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
	  max-width: 360px;
	}

	.carousel-img {
	  display: block;
	  margin: auto;
	  max-height: 160px;
	  overflow-x: scroll;
	  overflow-y: hidden;
	  white-space: nowrap;
	  -ms-overflow-style: none;
	  scrollbar-width: none;
	  scroll-behavior: smooth;
	  flex-grow: 1;
	}
	.carousel-img::-webkit-scrollbar {
	    display: none;
	}

	.carousel > .arrow {
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

<script>
	import CarouselItemImage from './CarouselItemImage.svelte'
	export let images

	let programaticScroll = null;
	let lastScroll = 0;

	function handleClickR(e) {
	  let c = e.target.parentElement.getElementsByClassName('carousel-img')[0]
	  scrollSlider(c, false);
	}

	function handleClickL(e) {
	  let c = e.target.parentElement.getElementsByClassName('carousel-img')[0]
	  scrollSlider(c, true);
	}

	function scrollSlider(c, left = true) {
	  programaticScroll = true;
	  let discrete = Math.ceil(c.scrollLeft / 160) * 160 + 160 * (left ? -1 : 1)
	  c.scrollLeft = discrete

		performance.mark('scrolled');
	}

	let isScrolling;

	function onScroll(e) {

		  console.log( 'Scrolling fired', lastScroll);
	    window.clearTimeout( isScrolling );
	    isScrolling = setTimeout(function() {

	      if (programaticScroll) {
	        programaticScroll = false
	  		  console.log( 'Scrolling has stopped because is programaticScroll' );
	        return;
	      }

	      let c = e.target
	      let discrete;
	      programaticScroll = true;
	      if (lastScroll < c.scrollLeft) {
	        console.log('R because last:', lastScroll, '& now:', c.scrollLeft)
	        discrete = Math.ceil(c.scrollLeft / 160) * 160;
	      } else {
	        console.log('L because last:', lastScroll, '& now:', c.scrollLeft)
	        discrete = Math.floor(c.scrollLeft / 160) * 160;
	      }
	  		console.log('Recalculation from:', c.scrollLeft, ' to:', discrete);
	      c.scrollLeft = discrete
	      lastScroll = discrete
	      programaticScroll = true;

				performance.mark('scrolled');

	  	}, 50);
	}
</script>

<div class="carousel">
  <div class="arrow" on:click={handleClickL}>L</div>
  <div class="carousel-img" on:scroll={onScroll}>
		{#each images as {caption, href}}
	  	<CarouselItemImage alt={caption} src={href + '?optimized'} />
	  {/each}
	</div>
  <div class="arrow" on:click={handleClickR}>R</div>
</div>
