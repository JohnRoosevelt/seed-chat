<script>
  import Channel from "./channel.svelte";
  const { data } = $props();

  let channels = $state([...data.channels]);
</script>

<article h-full flex-cc flex-col>
  <header bg-gray-50 w-full h-72px flex-bc p-5>
    <span i-icons-logo h-10 w-10> </span>
    <span i-carbon-add-large rotate-90 text-3xl> </span>
  </header>
  <article class="h-[calc(100%-72px)]" w-full space-y-1px scroll-y>
    {#each channels as user}
      <Channel {data} {user} />
    {/each}
  </article>
</article>
