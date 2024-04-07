<script>
  import { page } from "$app/stores";
  import Msg from "./msg.svelte";
  let disabled = $state(true);
  let content = $state("");
  $effect(() => {
    if (content) disabled = false;
    else disabled = true;
  });

  function send() {
    if (disabled) return;
    content = "";
  }

  let items = [...new Array(30).keys()].map(i => ({id: i}));
</script>

<article w-screen h-screen bg-gray-100>
  <div w-full h-72px px-5 flex-bc>
    <a href="/" flex-cc>
      <span i-carbon-chevron-left text-2xl />
      返回
    </a>
    <div>toId: {$page.params.toId}</div>
    <div>更多</div>
  </div>

  <article class="h-[calc(100%-144px)]" bg-white p-2 flex flex-col gap-y-4 scroll-y>
    {#each items as msg}
      <Msg {msg} />
    {/each}
  </article>

  <div w-full h-72px px-5 flex-bc space-x-3 bg-gray100>
    <textarea rows="1" rounded-md flex-1 p-2 bind:value={content} />
    {#if disabled}
      <span i-carbon-add-alt w-7 h-7 />
    {:else}
      <button onclick={send} flex-0 flex-shrink-0 btn-primary>发送</button>
    {/if}
  </div>
</article>
