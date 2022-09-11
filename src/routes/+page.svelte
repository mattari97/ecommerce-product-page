<script lang="ts">
  import { products } from "$lib/json";
  import Slider from "$lib/components/productPage/Slider.svelte";
  import Presentation from "$lib/components/productPage/Presentation.svelte";
</script>

<svelte:head>
  <title>Frontend Mentor | E-commerce product page</title>
</svelte:head>

<main
  class="lg:grid lg:grid-cols-2 lg:place-items-center lg:my-auto lg:py-12 lg:px-6 lg:gap-12 max-w-6xl mx-auto w-full"
>
  <Slider productId={products[0].id} />
  <Presentation product={products[0]} />
</main>
