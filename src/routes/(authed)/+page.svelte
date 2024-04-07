<script>
  import Msg from "./components/index/index.svelte";
  let { data } = $props();
  let items = [...new Array(20).keys()];
</script>

<article h-full flex-cc flex-col>
  <header bg-gray-50 w-full h-72px flex-bc p-5>
		<span i-icons-logo h-10 w-10 />
    <span i-carbon-add-large rotate-90 text-3xl />
  </header>
  <article class="h-[calc(100%-72px)]" w-full space-y-1px scroll-y>
    {#each items as item}
      <Msg {data} {item} />
    {/each}
  </article>
</article>
