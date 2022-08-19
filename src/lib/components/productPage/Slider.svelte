<script lang="ts">
  import { getProductById, slider } from "$lib/helpers";
  import Lightbox from "./Lightbox.svelte";
  export let productId: string; // Props

  let lightboxToggleEl: HTMLElement;
  let lightboxOpen: boolean = false;
  const toggleLightboxOpen = () => (lightboxOpen = !lightboxOpen);
  $: slides = getProductById(productId).images;

  let innerWidth = 0;
  $: lighboxActive = innerWidth >= 1024;
</script>

<svelte:window bind:innerWidth />

<section use:slider class="lg:max-w-[30rem]">
  <div
    data-slider-wrapper
    tabindex="0"
    on:click={() => lighboxActive && toggleLightboxOpen()}
    bind:this={lightboxToggleEl}
    on:keydown|preventDefault={(e) => e.key === "Enter" && lighboxActive && toggleLightboxOpen()}
    class="relative w-full max-h-[28rem] lg:max-h-full lg:rounded-xl overflow-hidden cursor-pointer"
  >
    <!-- Previous -->
    <button
      aria-label="Previous slide"
      disabled
      data-slider-prev
      class="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 px-3 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-10 disabled:bg-neutral-100/25 transition-colors duration-300"
    >
      <svg class="w-3 pr-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1 3 9l8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
      </svg>
    </button>
    <!-- Next -->
    <button
      aria-label="Next slide"
      data-slider-next
      class="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 px-3 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-10 disabled:bg-neutral-100/25 transition-colors duration-300"
    >
      <svg class="w-3 pl-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
        <path d="m2 1 8 8-8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
      </svg>
    </button>
    <!-- Inner slider-->
    <ul data-slider-inner class="flex transition-transform duration-300">
      <!-- Slides -->
      {#each slides as { full, alt }, index (index)}
        <li class="basis-full shrink-0">
          <img src="/images/{full}" {alt} class="w-full object-cover" />
        </li>
      {/each}
    </ul>
  </div>
  <!-- Pagination -->
  <ul class="hidden lg:flex lg:justify-center lg:gap-6 lg:mt-6">
    {#each slides as { thumbnail, alt }, index (`thumbnail ${index}`)}
      <li
        data-slider-pagination={index}
        class:pagination-disabled={index === 0}
        tabindex="0"
        class="rounded-xl overflow-hidden cursor-pointer transition-all hover:opacity-50 duration-300"
      >
        <img src="/images/{thumbnail}" {alt} class="w-full aspect-square" />
      </li>
    {/each}
  </ul>
</section>
<Lightbox {productId} isOpen={lightboxOpen} toggleCallBack={toggleLightboxOpen} toggleElement={lightboxToggleEl} />
