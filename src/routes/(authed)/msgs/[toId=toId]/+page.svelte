<script>
  import { page } from "$app/stores";
  import Msg from "./msg.svelte";
  let disabled = $state(true);
  let content = $state("");
  let rows = $state(1);
  $effect(() => {
    if (content) disabled = false;
    else disabled = true;

    const newlineCount = (content.match(/\n/g) || []).length + 1;
    // 将行数限制在1到5之间
    rows = Math.min(Math.max(newlineCount, 1), 5);
  });

  let msgs = $state([]);

  let msgsDom;
  $effect(async () => {
    // reference `messages` so that this code re-runs whenever it changes
    msgs.length;

    // autoscroll when new messages are added
    if (msgsDom.offsetHeight + msgsDom.scrollTop < msgsDom.scrollHeight - 5) {
      msgsDom.scrollTo(0, msgsDom.scrollHeight);
    }
  });

  function onkeydown(event) {
    if (event.key === "Enter" && event.metaKey) {
      onclick();
    }
  }

  function onclick() {
    if (disabled) return;
    let ary = content.split("\n") || [];
    let lastIndexOf = ary.length - 1;
    while (lastIndexOf > 0 && ary[lastIndexOf].trim() === "") {
      lastIndexOf--;
    }
    ary = ary.slice(0, lastIndexOf + 1);
    msgs.push({ id: msgs.length, content: ary.join("\n") });
    content = "";
  }

  const { data } = $props();
</script>

<article w-screen h-screen bg-gray-100 flex flex-col>
  <div w-full h-72px px-5 flex-bc>
    <a href="/" flex-cc>
      <span i-carbon-chevron-left text-2xl></span>
      返回
    </a>
    <div>toId: {$page.params.toId}</div>
    <a href="/test">更多</a>
  </div>

  <article
    bind:this={msgsDom}
    flex-1
    bg-gray-200
    p-2
    flex
    flex-col
    gap-y-4
    scroll-smooth
    scroll-y
  >
    {#each msgs as msg}
      <Msg {msg} {data} />
    {/each}
  </article>

  <div w-full p-5 flex-bc items-end space-x-3 bg-gray100>
    <textarea {rows} rounded-md flex-1 p-2 bind:value={content} {onkeydown}
    ></textarea>
    {#if disabled}
      <span i-carbon-add-alt w-7 h-7></span>
    {:else}
      <button {onclick} flex-0 flex-shrink-0 btn-primary>发送</button>
    {/if}
  </div>
</article>
