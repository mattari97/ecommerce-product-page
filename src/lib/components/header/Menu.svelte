<script lang="ts">
  import { mainNavigationLinks } from "$lib/json";
</script>

<nav aria-label="Main" class="bg-white hidden md:block self-stretch">
  <ul class="font-normal text-base text-neutral-300 flex h-full mx-6 lg:mx-12 gap-4 lg:gap-8">
    {#each mainNavigationLinks as { label, href } (label)}
      <li class="flex">
        <a {href} class="flex items-center passing-underline hover:text-neutral-400 transition-colors duration-300">
          {label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
