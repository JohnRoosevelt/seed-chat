<script>
  import { initData } from "../../../../lib/data.svelte";
  import Channel from "./channel.svelte";
  const { data } = $props();
</script>

<article h-full flex-cc flex-col>
  <header bg-gray-50 w-full h-72px flex-bc p-5>
    <span i-icons-logo h-10 w-10> </span>
    <span i-carbon-add-large rotate-90 text-3xl> </span>
  </header>
  <article class="h-[calc(100%-72px)]" w-full space-y-1px scroll-y>
    {#each initData.channels as channel}
      <Channel {data} {channel} />
    {/each}
  </article>
</article>
