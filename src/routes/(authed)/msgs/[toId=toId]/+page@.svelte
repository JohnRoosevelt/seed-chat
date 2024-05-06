<script>

  import { page } from "$app/stores";
  import Msg from "./msg.svelte";
  let disabled = $state(true);
  let content = $state("");
  $effect(() => {
    if (content) disabled = false;
    else disabled = true;
  });

  let msgs = $state(
    []
    // [...new Array(30).keys()].map(i => ({id: i, content: parseInt(Math.random() * 100000000000)}))
  );

  let msgsDom;
  $effect(async() => {
		if (!msgsDom) return; // not yet mounted
		// reference `messages` so that this code re-runs whenever it changes
		msgs.length;

		// autoscroll when new messages are added
		if (msgsDom.offsetHeight + msgsDom.scrollTop < msgsDom.scrollHeight - 5) {
      msgsDom.scrollTo(0, msgsDom.scrollHeight);
		}
	});

  function onkeydown(event) {
    if (event.key === 'Enter' && event.metaKey) {
      onclick();
    }
  }

  function onclick() {
    if (disabled) return;
    msgs.push({id: msgs.length, content});
    content = "";
  }
</script>

<article w-screen h-screen bg-gray-100>
  <div w-full h-72px px-5 flex-bc>
    <a href="/" flex-cc>
      <span i-carbon-chevron-left text-2xl></span>
      返回
    </a>
    <div>toId: {$page.params.toId}</div>
    <div>更多</div>
  </div>

  <article bind:this={msgsDom} class="h-[calc(100%-144px)]" bg-white p-2 flex flex-col gap-y-4 scroll-smooth scroll-y>
    {#each msgs as msg}
      <Msg {msg} />
    {/each}
  </article>

  <div w-full h-72px px-5 flex-bc space-x-3 bg-gray100>
    <textarea rows="1" rounded-md flex-1 p-2 bind:value={content} {onkeydown} ></textarea>
    {#if disabled}
      <span i-carbon-add-alt w-7 h-7></span>
    {:else}
      <button {onclick} flex-0 flex-shrink-0 btn-primary>发送</button>
    {/if}
  </div>
</article>
