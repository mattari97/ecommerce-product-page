<script lang="ts">
  import { goto } from "$app/navigation";
  import { appStore, removeFromCart, toggleCart } from "$lib/stores";
  import { trapFocus, clickOutside } from "$lib/helpers";
  let cartIcon: HTMLElement;

  const onCheckout = () => {
    toggleCart();
    goto("/");
  };
</script>

<div
  use:trapFocus={{ toggleElement: cartIcon, shouldTrap: $appStore.cartOpen, closeCallback: toggleCart }}
  use:clickOutside={{ toggleElement: cartIcon, callback: toggleCart, shouldListen: $appStore.cartOpen }}
  class="ml-auto mr-4 sm:mr-6 md:mr-8 2xl:relative"
>
  <button
    data-cart-quantity={$appStore.cart.totalQuantity}
    aria-label="{$appStore.cartOpen ? 'Close' : 'Open'} cart"
    aria-expanded={$appStore.cartOpen}
    aria-controls="cartItems"
    bind:this={cartIcon}
    on:click={toggleCart}
    class="p-2 -mx-2 cart-badge text-neutral-300 hover:text-neutral-400 transition-colors duration-300"
  >
    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
        fill="currentColor"
        fill-rule="nonzero"
      />
    </svg>
  </button>
  <div
    class:opacity-0={!$appStore.cartOpen}
    class:pointer-events-none={!$appStore.cartOpen}
    class="bg-white absolute top-16 md:top-20 right-0 m-2 md:mx-0 min-h-[250px] rounded-lg shadow-lg leading-none flex flex-col transition-opacity duration-300 w-[min(calc(100vw-16px),380px)] 2xl:translate-x-1/2 2xl:right-1/2 2xl:top-[50px]"
  >
    <div class="p-6 font-bold border-b border-divider">
      <span>Cart</span>
    </div>
    <div id="cartItems" class="flex-1 flex flex-col p-6 gap-6">
      {#if $appStore.cart.totalQuantity === 0}
        <span class="m-auto text-neutral-300 font-bold">Your cart is empty.</span>
      {:else}
        {#each $appStore.cart.products as product (product.id)}
          {@const total = product.price * product.quantity}
          <div class="grid grid-cols-[auto_1fr_auto] grid-rows-2 items-center gap-x-4">
            <div class="w-14 rounded overflow-hidden col-span-1 col-start-1 row-span-2">
              <img src="/images/{product.thumbnail}" alt="" />
            </div>
            <span class="text-neutral-300 tracking-wide col-span-1 col-start-2 row-span-1 truncate">{product.name}</span
            >
            <span class="text-neutral-300 tracking-wide col-span-1 col-start-2 row-span-1">
              ${product.price.toFixed(2)} x {product.quantity}
              <span class="font-bold"> ${total.toFixed(2)}</span>
            </span>
            <button
              aria-label="Remove all {product.name} from cart"
              disabled={!$appStore.cartOpen}
              on:click={() => removeFromCart(product.id)}
              class="p-2 -m-2 col-span-1 col-start-3 row-span-2 row-start-1"
            >
              <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path
                    d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                    id="a"
                  />
                </defs>
                <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
              </svg>
            </button>
          </div>
        {/each}
        <button
          disabled={!$appStore.cartOpen}
          on:click={onCheckout}
          class="mt-auto bg-primary rounded-lg py-5 text-neutral-100 font-bold"
        >
          Checkout
        </button>
      {/if}
    </div>
  </div>
</div>
