<script lang="ts">
  import Cart from "./Cart.svelte";
  import Logo from "./Logo.svelte";
  import Menu from "./Menu.svelte";
  import MobileMenu from "./MobileMenu.svelte";
</script>

<header
  class="relative max-w-screen-xl mx-auto w-full h-16 md:h-24 px-6 [@media(min-width:1328px)]:px-0 flex items-center border-b border-divider"
>
  <MobileMenu />
  <Logo />
  <Menu />
  <Cart />
  <!-- Avatar -->
  <a href="/" aria-label="Profile" class="p-2 -mx-2 md:p-0 md:m-0 rounded-full md:relative md:hover-outline">
    <img src="/images/image-avatar.png" alt="" class="w-7 sm:w-8 md:w-12 rounded-full" />
  </a>
</header>
