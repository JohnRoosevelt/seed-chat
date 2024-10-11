<script>
  import Avatar from "$lib/avatar.svelte";
  import Msg from "./msg.svelte";
  import { v4 as uuidV4 } from "uuid";
  import { setChannel, initData, initChannelHistory } from "$lib/data.svelte";

  let disabled = $state(true);
  let content = $state("");
  let rows = $state(1);

  const { data } = $props();

  const toUser = $derived(
    initData.channels.find((i) => i.id === data.params.toId),
  );
  $effect.pre(() => {
    initChannelHistory(data.params.toId);
  });
  const messages = $derived(
    initData.channelMap[data.params.toId]?.messages || [],
  );

  $effect(() => {
    if (content) disabled = false;
    else disabled = true;

    const newlineCount = (content.match(/\n/g) || []).length + 1;
    // 将行数限制在1到5之间
    rows = Math.min(Math.max(newlineCount, 1), 5);
  });

  let msgsDom;
  $effect(async () => {
    // reference `messages` so that this code re-runs whenever it changes
    messages.length;

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

  async function onclick() {
    if (disabled) return;
    let ary = content.split("\n") || [];
    let lastIndexOf = ary.length - 1;
    while (lastIndexOf > 0 && ary[lastIndexOf].trim() === "") {
      lastIndexOf--;
    }
    ary = ary.slice(0, lastIndexOf + 1);
    const msg = {
      id: uuidV4(),
      content: ary.join("\n"),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await Promise.all([
      initData.channelMap[data.params.toId].sendMessage(msg),
      setChannel(toUser.id, {
        ...toUser,
        msg: msg.content,
        updatedAt: Date.now(),
        hidden: false,
      }),
    ]);
    content = "";
  }

  async function clearHistory() {
    await Promise.all([
      initData.channelMap[data.params.toId].clear(),
      setChannel(toUser.id, {
        ...toUser,
        msg: "",
        hidden: true,
      }),
    ]);
    history.back();
  }
</script>

<article w-screen h-screen bg-gray-100 flex flex-col>
  <div w-full h-72px px-5 flex-bc>
    <button flex-cc onclick="{() => history.back()}">
      <span i-carbon-chevron-left text-2xl></span>
      返回
    </button>
    <div flex-cc gap-3>
      <Avatar user={toUser} />
      {toUser.name}
    </div>
    <button text-xs text-blue onclick={() => clearHistory()}>清除记录</button>
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
    {#each messages as msg, index}
      <Msg {msg} {data} {toUser} {index} />
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
