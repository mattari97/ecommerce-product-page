<script lang="ts">
  import { blur } from "svelte/transition";
  import { getProductById, slider, trapFocus } from "$lib/helpers";
  export let productId: string; // Props
  $: slides = getProductById(productId).images;

  let isOpen: boolean;
  let toggleElement: HTMLElement;
  const toggleLightbox = () => (isOpen = !isOpen);
</script>

<button
  bind:this={toggleElement}
  on:click={toggleLightbox}
  aria-label="Open lightbox"
  class="bg-neutral-100 p-2 rounded-full hover:text-primary transition-colors duration-300"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
      clip-rule="evenodd"
    />
  </svg>
</button>

{#if isOpen}
  <div
    transition:blur={{ duration: 300 }}
    use:trapFocus={{ shouldTrap: isOpen, closeCallback: toggleLightbox, toggleElement }}
    on:click|stopPropagation|self={toggleLightbox}
    class="flex fixed inset-0 justify-center items-center bg-neutral-400/90 z-50 transition-opacity duration-300 cursor-pointer"
  >
    <div use:slider class="max-w-[32rem]">
      <div class="relative">
        <!-- Close -->
        <button
          aria-label="Close lightbox"
          on:click={toggleLightbox}
          class="mb-1 absolute bottom-full -right-2 z-50 text-neutral-100 hover:text-primary transition-colors duration-300 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 aspect-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Previous -->
        <button
          aria-label="Previous slide"
          disabled
          data-slider-prev
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-50 disabled:bg-neutral-100/25 transition-colors duration-300"
        >
          <svg class="w-3 pr-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1 3 9l8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
          </svg>
        </button>
        <!-- Next -->
        <button
          aria-label="Next slide"
          data-slider-next
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 px-4 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-50 disabled:bg-neutral-100/25 transition-colors duration-300"
        >
          <svg class="w-3 pl-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
            <path d="m2 1 8 8-8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
          </svg>
        </button>
        <div data-slider-wrapper class="rounded-xl overflow-hidden">
          <!-- Inner slider-->
          <ul data-slider-inner class="flex transition-transform duration-300">
            <!-- Slides -->
            {#each slides as { full, alt }, index (index)}
              <li class="basis-full shrink-0">
                <img src="/images/{full}" {alt} class="w-full object-cover object-center" />
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <!-- Pagination -->
      <ul class="flex justify-center gap-6 mt-6 px-6">
        {#each slides as { thumbnail, alt }, index (`thumbnail ${index}`)}
          <li
            data-slider-pagination={index}
            class:pagination-disabled={index === 0}
            tabindex={isOpen ? 0 : -1}
            class="rounded-xl overflow-hidden cursor-pointer transition-all"
          >
            <img src="/images/{thumbnail}" {alt} class="w-full aspect-square" />
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}
