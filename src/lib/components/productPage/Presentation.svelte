<script lang="ts">
  import type { Product } from "$lib/types";
  import { addToCart } from "$lib/stores";

  export let product: Product;
  $: price = (product.reduction ? product.price * product.reduction : product.price).toFixed(2);
  let cartQuantity = 0;

  const onIncrement = () => cartQuantity++;
  const onDecrement = () => {
    if (cartQuantity === 0) return;
    cartQuantity--;
  };
  const onAddToCart = () => {
    if (cartQuantity === 0) return;
    addToCart(product, cartQuantity);
    cartQuantity = 0;
  };
</script>

<div class="flex flex-col p-6 sm:px-0 sm:py-12 lg:p-0 gap-4 sm:gap-6 max-w-[480px] w-full mx-auto">
  <span class="text-primary text-sm font-bold tracking-wider leading-none uppercase">Sneaker Company</span>
  <h1 class="font-bold text-3xl sm:text-5xl">{product.name}</h1>
  <p class="text-neutral-300 sm:text-lg sm:leading-snug">{product.description}</p>
  <!-- Price & Reduction -->
  <div class="flex items-center justify-between my-2 sm:my-4 font-bold lg:flex-col lg:items-start lg:gap-2">
    <div class="flex">
      <span class="text-3xl leading-[0.9] pb-0.5">${price}</span>
      {#if product.reduction}
        <span
          class="text-primary pb-0.5 leading-none self-stretch flex items-center bg-primary-pale ml-4 px-2 rounded-md"
        >
          {product.reduction * 100}%
        </span>
      {/if}
    </div>
    {#if product.reduction}
      <span class="text-neutral-200 line-through pb-0.5">${product.price.toFixed(2)}</span>
    {/if}
  </div>
  <div class="flex flex-col gap-4 sm:gap-6 xs:flex-row xs:items-center">
    <!-- Quantity Picker-->
    <div class="flex justify-between bg-neutral-100 rounded-lg overflow-hidden xs:min-w-[160px]">
      <button
        aria-label="Decrement quantity"
        disabled={cartQuantity === 0}
        on:click={onDecrement}
        class="text-primary hover:enabled:text-primary/75 transition-colors duration-300 p-4 disabled:text-neutral-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 aspect-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      <span class="self-center font-bold">{cartQuantity}</span>
      <button
        aria-label="Increment quantity"
        on:click={onIncrement}
        class="text-primary hover:text-primary/75 transition-colors duration-300 p-4"
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
    <!-- CTA -->
    <button
      disabled={cartQuantity === 0}
      on:click={onAddToCart}
      class="bg-primary hover:enabled:bg-primary/75 disabled:bg-primary/50 transition-colors duration-300 text-white rounded-lg flex justify-center items-center gap-4 font-bold p-4 shadow-xl shadow-primary/20 xs:flex-1"
    >
      <svg class="w-5" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </svg>
      <span>Add to cart</span>
    </button>
  </div>
</div>
