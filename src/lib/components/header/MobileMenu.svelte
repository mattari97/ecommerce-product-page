<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { appStore, toggleMobileMenu } from "$lib/stores";
  import { trapFocus } from "$lib/helpers";
  import { mainNavigationLinks } from "$lib/json";
  let hamburger: HTMLElement;

  let els: HTMLElement[];
  onMount(() => {
    els = [document.documentElement, document.body];
  });
  const togglePageScroll = (els: HTMLElement[], shouldDisable: boolean) =>
    shouldDisable
      ? els.forEach((el) => el.classList.add("overflow-y-hidden"))
      : els.forEach((el) => el.classList.remove("overflow-y-hidden"));
  $: !!els && togglePageScroll(els, $appStore.mobileMenuOpen);

  const onNavigate = (href: string) => {
    toggleMobileMenu();
    goto(href);
  };
</script>

<nav aria-label="Main" class="md:hidden mr-4">
  <!-- Hamburger -->
  <button
    aria-label="Open main navigation"
    aria-expanded={$appStore.mobileMenuOpen}
    aria-controls="menuItems"
    disabled={$appStore.mobileMenuOpen}
    bind:this={hamburger}
    on:click={toggleMobileMenu}
    class="p-2 -mx-2 text-neutral-300 hover:text-neutral-400 transition-colors duration-300"
  >
    <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="currentColor" fill-rule="evenodd" />
    </svg>
  </button>
  <!-- Overlay -->
  <div
    on:click|stopPropagation={toggleMobileMenu}
    class:opacity-0={!$appStore.mobileMenuOpen}
    class:pointer-events-none={!$appStore.mobileMenuOpen}
    class="bg-black/50 fixed top-0 left-0 w-full h-screen transition-opacity duration-300 z-50 cursor-pointer"
  />
  <!-- Navigation -->
  <div
    use:trapFocus={{ shouldTrap: $appStore.mobileMenuOpen, closeCallback: toggleMobileMenu, toggleElement: hamburger }}
    class:translate-x-56={$appStore.mobileMenuOpen}
    class:opacity-0={!$appStore.mobileMenuOpen}
    class="bg-white fixed top-0 -left-56 h-screen w-56 p-[16.5px] space-y-[16.5px] transition-all duration-300 z-50"
  >
    <!-- Close Btn-->
    <button
      aria-label="Close main navigation"
      disabled={!$appStore.mobileMenuOpen}
      on:click|stopPropagation={toggleMobileMenu}
      class="p-2 text-neutral-300 hover:text-neutral-400 transition-colors duration-300"
    >
      <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>
    </button>
    <!-- Nav Items -->
    <ul id="menuItems" class="leading-none font-bold text-lg">
      {#each mainNavigationLinks as { label, href } (label)}
        <li>
          <button disabled={!$appStore.mobileMenuOpen} on:click={() => onNavigate(href)} class="flex w-full px-2 py-3">
            {label}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</nav>
