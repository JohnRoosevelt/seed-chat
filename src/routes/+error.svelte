<script>
  import Home from "$com/home.svelte";
  import { page } from "$app/stores";
</script>

<Home>
  <article w-screen h-screen flex-cc flex-col space-y-8>
    <p> {$page.error.message} </p>

    <a href="/" data-sveltekit-replacestate flex-cc flex-col text-blue>
      <span i-carbon-home text-4xl> </span>
      <span text-xs uppercase> 首页 </span>
    </a>
  </article>
</Home>
