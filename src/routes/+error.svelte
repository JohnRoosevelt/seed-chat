<script>
  import Main from "$com/main.svelte";
  import { page } from "$app/stores";
</script>

<Main>
  <article w-screen h-screen flex-cc flex-col space-y-8>
    <p> {$page.error.message} </p>

    <a href="/" data-sveltekit-replacestate flex-cc flex-col text-blue>
      <span i-carbon-home text-4xl> </span>
      <span text-xs uppercase> 首页 </span>
    </a>
  </article>
</Main>
