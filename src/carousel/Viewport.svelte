<style>
  .viewport {
    width: 480px;
    display: flex;
    flex-direction: row;

    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none;
    /* scroll-behavior: smooth; */
  }
  .viewport::-webkit-scrollbar {
      display: none;
  }
</style>

<div class='viewport' class:animate={animate} on:scroll={onViewportScroll}>
  {#each {length: 25} as _, i}
    {#if imagesStack.length}
      {#if getRandPageType() === 1}
        <Page {imagesStack} />
      {:else}
        <WidePage {imagesStack} />
      {/if}
    {/if}
  {/each}
</div>

<script>
  import Page from './Page.svelte'
  import WidePage from './WidePage.svelte'
  import { onMount } from 'svelte'

  export let images
  // export let toggleAnimate
  let animate = false
  // toggleAnimate.subscribe(value => {
  // 	animate = value
  // });
  //
  const imagesStack = [...images]

  const pageTypes = ['Page', 'WidePage']
  const getRandPageType = () => {
    return Math.floor((Math.random() * 2))
  }

  const thumbSize = 160
  let prevScrollPosition = 0;
  let programaticScrollStopped = false;
  let programaticScrollInfinite = false;
  let animationRequested = false;
  const onViewportScroll = e => {

    const proximityThreshold = 160 * 1.9
    const scrollingToLeft = e.target.scrollLeft < prevScrollPosition
    const closeToLeftSide = e.target.scrollLeft < proximityThreshold
    const closeToRightSide = e.target.scrollLeft > (e.target.scrollWidth - e.target.offsetWidth - proximityThreshold)

    throttle(() => {
      if (programaticScrollInfinite) {
        programaticScrollInfinite = false;
        return;
      }

      if (closeToLeftSide && scrollingToLeft) {
        e.target.insertBefore(e.target.children[e.target.children.length - 1], e.target.children[0]);
        e.target.scrollLeft = e.target.scrollLeft + thumbSize
        programaticScrollInfinite = true;
        console.log('close to the LEFT')
      }

      if (closeToRightSide && !scrollingToLeft) {
        e.target.append(e.target.children[0]);
        e.target.scrollLeft = e.target.scrollLeft - thumbSize
        programaticScrollInfinite = true;
        console.log('close to the RIGHT')
      }
      console.log(scrollingToLeft, closeToLeftSide, closeToRightSide, prevScrollPosition, e.target.scrollLeft)

      prevScrollPosition = e.target.scrollLeft;
    }, 116)

    debounce(() => {
      if (programaticScrollStopped) {
        programaticScrollStopped = false;
        return;
      }

      console.log('Scroll stopped');
      let discrete;
      if (!scrollingToLeft) {
        console.log('R because last:', prevScrollPosition, '& now:', e.target.scrollLeft)
        discrete = Math.ceil(e.target.scrollLeft / thumbSize - .25) * thumbSize;
      } else {
        console.log('L because last:', prevScrollPosition, '& now:', e.target.scrollLeft)
        discrete = Math.floor(e.target.scrollLeft / thumbSize + .25) * thumbSize;
      }
      console.log('Recalculation from:', e.target.scrollLeft, ' to:', discrete);
      e.target.scrollLeft = discrete
      prevScrollPosition = discrete
      programaticScrollStopped = true;

    }, 50)
  }

  let isRunning;
  function debounce(callback, limit) {
    window.clearTimeout(isRunning);
    isRunning = setTimeout(callback, limit);
  }

  let wait = false;
  function throttle (callback, limit) {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  }

  onMount(() => {
    const target = document.getElementsByClassName('viewport')[0]
    target.insertBefore(target.children[target.children.length - 1], target.children[0]);
    target.scrollLeft = thumbSize
    programaticScrollInfinite = true;
    console.log('close to the LEFT')
  });


</script>
