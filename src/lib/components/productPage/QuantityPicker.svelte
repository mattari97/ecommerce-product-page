<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let cartQuantity: number;

  const dispatch = createEventDispatcher();
  const onDecrement = () => dispatch("decrement");
  const onIncrement = () => dispatch("increment");
</script>

<div class="flex justify-between bg-neutral-100 rounded-lg xs:min-w-[160px]">
  <button
    aria-label="Decrement quantity"
    disabled={cartQuantity === 0}
    on:click={onDecrement}
    class="bg-neutral-100 text-primary hover:enabled:text-primary/75 transition-colors duration-300 p-4 disabled:text-neutral-200 rounded-lg"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 aspect-auto" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
    </svg>
  </button>
  <span class="self-center font-bold">{cartQuantity}</span>
  <button
    aria-label="Increment quantity"
    on:click={onIncrement}
    class="bg-neutral-100 text-primary hover:text-primary/75 transition-colors duration-300 p-4 rounded-lg"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 aspect-auto" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</div>
