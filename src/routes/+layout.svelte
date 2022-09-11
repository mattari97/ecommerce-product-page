<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/header/Header.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";
</script>

<Header />

<slot />

<Footer />
